from abc import ABC, abstractmethod
import json

class StructuredOutput(ABC):

  def __init__(self, raw_response, carbon) -> None:
    self.raw_response = raw_response
    self.carbon = carbon # in kgCO2eq

  def get_raw_response(self):
    return self.raw_response
  
  @abstractmethod
  def get_json(self) -> dict:
    pass

  def __str__(self) -> str:
        """Représentation textuelle lisible de l'objet."""
        try:
            # On suppose que get_json() renvoie un dictionnaire
            formatted = json.dumps(self.get_json(), ensure_ascii=False, indent=4)
            return f"{self.__class__.__name__}(\n{formatted}\n)"
        except Exception as e:
            return f"{self.__class__.__name__}(raw_response={self.raw_response!r}, carbon={self.carbon!r}, erreur={e})"