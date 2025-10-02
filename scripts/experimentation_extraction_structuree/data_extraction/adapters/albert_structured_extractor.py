import requests
import os
import json
from typing import Type

from dotenv import load_dotenv
from pydantic import BaseModel

from data_extraction.schemas.schema_utils import pydantic_to_json_schema
from data_extraction.core.structured_extractor import StructuredExtractor
from data_extraction.core.structured_output import StructuredOutput




class AlbertStructuredOutput(StructuredOutput):

  def __init__(self, raw_response, carbon) -> None:
     super().__init__(raw_response, carbon)

  def get_json(self) -> dict:
    structured_output = self.raw_response["choices"][0]["message"]["content"]
    return json.loads(structured_output)



class AlbertStructuredExtractor(StructuredExtractor):

  def __init__(self, pydantic_schema: Type[BaseModel]) -> None:
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

  def get_body(self, model_name, user_message, temperature: float, **kwargs) -> dict:
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
          "temperature": temperature,
          **kwargs
      }

      return payload

  def get_structured_output(self, model_name, user_message, temperature: float, **kwargs) -> AlbertStructuredOutput:

    # Parse and harmonize most useful kwargs
    
    headers = self.get_header()
    body = self.get_body(model_name, user_message, temperature=temperature, **kwargs)

    response = requests.post(self.endpoint, headers=headers, json=body)
    json_response = response.json()

    # Vérification du statut et affichage
    if response.status_code == 200:
        carbon = (json_response["usage"]["carbon"]["kgCO2eq"]["min"] + json_response["usage"]["carbon"]["kgCO2eq"]["max"]) / 2
        return AlbertStructuredOutput(json_response, carbon)
    else:
        return AlbertStructuredOutput(f"Erreur {response.status_code}: {response.text}", 0)