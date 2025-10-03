from typing import Type
from pydantic import BaseModel

from ollama import chat, ChatResponse
from codecarbon import EmissionsTracker

from data_extraction.core.structured_extractor import StructuredExtractor
from data_extraction.core.structured_output import StructuredOutput



class OllamaStructuredOutput(StructuredOutput):

  def __init__(self, raw_response: ChatResponse, carbon: float | None, pydantic_schema: Type[BaseModel]) -> None:
    super().__init__(raw_response, carbon)
    self.pydantic_schema = pydantic_schema
    self.formatted_response = self.pydantic_schema.model_validate_json(self.raw_response.message.content)

  def get_json(self) -> dict:
    return self.formatted_response.model_dump()



class OllamaStructuredExtractor(StructuredExtractor):

  def __init__(self, pydantic_schema: Type[BaseModel]):
    super().__init__(pydantic_schema)
    self.tracker = EmissionsTracker(
        measure_power_secs=1,  # How often to sample power (seconds)
        save_to_file=False,      # Don't create CSV file
        save_to_api=False,       # Don't save to CodeCarbon API
    )

  def generate(self, model_name, user_message, **kwargs) -> ChatResponse:
    raw_response = chat(
      messages=[
        {
          'role': 'system',
          'content': self.instruction_prompt,
        },
        {
          'role': 'user',
          'content': user_message,
        }
      ],
      model=model_name,
      format=self.pydantic_schema.model_json_schema(),
      options=kwargs
    )
    return raw_response
  
  def get_structured_output(self, model_name, user_message, temperature: float, **kwargs) -> OllamaStructuredOutput:

    # Parse, validate and harmonize kwargs
    
    # Merge with default options
    default_options = {
      "num_ctx": 100000,
      "num_predict": 10000,
      "temperature": temperature
    }
    
    merged_options = {**default_options, **kwargs}

    self.tracker.start()
    raw_response = self.generate(model_name, user_message, **merged_options)

    carbon: float | None = self.tracker.stop()

    return OllamaStructuredOutput(raw_response, carbon, self.pydantic_schema)