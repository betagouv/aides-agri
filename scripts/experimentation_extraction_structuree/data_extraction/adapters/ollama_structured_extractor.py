from pydantic import BaseModel

from ollama import chat

from data_extraction.core.structured_extractor import StructuredExtractor
from data_extraction.core.structured_output import StructuredOutput



class OllamaStructuredOutput(StructuredOutput):

  def __init__(self, raw_response: dict, pydantic_schema: BaseModel) -> None:
    super().__init__(raw_response)
    self.pydantic_schema = pydantic_schema
    self.formatted_response = self.pydantic_schema.model_validate_json(self.raw_response.message.content)

  def get_json(self) -> dict:
    return self.formatted_response.model_dump()



class OllamaStructuredExtractor(StructuredExtractor):

  def __init__(self, pydantic_schema: BaseModel):
    super().__init__(pydantic_schema)

  
  def get_structured_output(self, model_name, user_message, **kwargs):
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
    )

    return OllamaStructuredOutput(raw_response, self.pydantic_schema)