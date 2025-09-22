import requests
import os

from dotenv import load_dotenv
from pydantic import BaseModel

from data_extraction.schemas.schema_utils import pydantic_to_json_schema
from data_extraction.core.structured_extractor import StructuredExtractor
from data_extraction.core.structured_output import StructuredOutput




class AlbertStructuredOutput(StructuredOutput):

  def __init__(self, raw_response) -> None:
     super().__init__(raw_response)
  
  def get_json(self):
     return self.raw_response["choices"][0]["message"]["content"]



class AlbertStructuredExtractor(StructuredExtractor):

  def __init__(self, pydantic_schema: BaseModel):
    super().__init__(pydantic_schema)
    load_dotenv()
    self.api_key = os.getenv("ALBERT_API_KEY")
    self.endpoint = "https://albert.api.etalab.gouv.fr/v1/chat/completions"
    self.json_schema = pydantic_to_json_schema(self.pydantic_schema)

  def get_header(self):
      headers = {
          "accept": "application/json",
          "Authorization": f"Bearer {self.api_key}",
          "Content-Type": "application/json",
      }
      return headers

  def get_body(self, model_name, user_message, **kwargs):
      payload = {
          "model": model_name,
          "messages": [
              {
                  "role": "system",
                  "content": self.instruction_prompt
              },
              {
                  "role": "user",
                  "content": user_message
              }
          ],
          "response_format": {
              "type": "json_schema",
              "json_schema": self.json_schema
          },
          **kwargs
      }

      return payload
  
  def get_structured_output(self, model_name, user_message, **kwargs):
    headers = self.get_header()
    body = self.get_body(model_name, user_message, **kwargs)

    response = requests.post(self.endpoint, headers=headers, json=body)

    # Vérification du statut et affichage
    if response.status_code == 200:
        return AlbertStructuredOutput(response.json())
    else:
        print(f"Erreur {response.status_code}: {response.text}")