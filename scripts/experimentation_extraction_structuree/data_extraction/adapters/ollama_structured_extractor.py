from pydantic import BaseModel

from ollama import chat

from data_extraction.core.structured_extractor import StructuredExtractor
from data_extraction.core.structured_output import StructuredOutput



class OllamaStructuredOutput(StructuredOutput):

  def __init__(self, raw_response: BaseModel) -> BaseModel:
    super().__init__(raw_response)
  
  def get_json(self) -> dict:
    return self.raw_response.model_dump()



class OllamaStructuredExtractor(StructuredExtractor):

  def __init__(self, pydantic_schema: BaseModel):
    super().__init__(pydantic_schema)

  
  def get_structured_output(self, model_name, user_message, **kwargs):
    response = chat(
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
      model='gemma3:4b',
      format=self.pydantic_schema.model_json_schema(),
    )

    response = self.pydantic_schema.model_validate_json(response.message.content)
    return OllamaStructuredOutput(response)