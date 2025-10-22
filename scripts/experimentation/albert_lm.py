from typing import Type, Dict, Any
import os
from dotenv import load_dotenv

class ChatAlbert():

  def __init__(self) -> None:
    load_dotenv()
    self.api_key = os.getenv("ALBERT_API_KEY")
    self.endpoint = "https://albert.api.etalab.gouv.fr/v1/chat/completions"

  def get_header(self):
      headers = {
          "accept": "application/json",
          "Authorization": f"Bearer {self.api_key}",
          "Content-Type": "application/json",
      }
      return headers

  def get_body(self, model_name, system_prompt, user_message, temperature: float, **kwargs) -> dict:
      payload = {
          "model": model_name,
          "messages": [
              {
                  "role": "system",
                  "content": system_prompt
              },
              {
                  "role": "user",
                  "content": user_message
              }
          ],
          "temperature": temperature,
          **kwargs
      }

      return payload

  def completions(self, model_name: str, system_prompt: str, user_message: str, temperature: float = 0.2, **kwargs) -> Dict[str, Any]:
      import requests
      headers = self.get_header()
      body = self.get_body(model_name, system_prompt, user_message, temperature, **kwargs)

      response = requests.post(self.endpoint, headers=headers, json=body)
      response.raise_for_status()
      return response.json()