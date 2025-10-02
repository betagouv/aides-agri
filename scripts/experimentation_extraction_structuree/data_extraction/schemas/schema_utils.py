from typing import Type
from pydantic import BaseModel

def pydantic_to_json_schema(model: Type[BaseModel], schema_name: str = "schema", strict: bool = True) -> dict:
  json_schema = model.model_json_schema()
  no_ref_json_schema = resolve_refs(json_schema)
  formatted_json_schema = {
    "name": schema_name, 
    "strict": strict, 
    "schema": {
      "type": "object", 
      "properties": no_ref_json_schema['properties'],
      "required": no_ref_json_schema.get("required", [])
    }
  }
  
  return formatted_json_schema


def resolve_refs(schema: dict) -> dict:
  """
  By default, pydantic creates $refs and $defs as constants outside of the main schema.
  Those $ attributes serve as reference in the main schema : write {'properties': {$def: $ref}}.

  This format is supported for json validation, but not for structured output APIs.
  This function replaces the $ref by the schema defined by $def outside the main schema.
  """
  defs = schema.pop("$defs", {})
  def resolve(obj: dict) -> dict:
      if isinstance(obj, dict):
          if "$ref" in obj:
              ref = obj["$ref"].split("/")[-1]
              return resolve(defs[ref])
          return {k: resolve(v) for k, v in obj.items()}
      elif isinstance(obj, list):
          return [resolve(v) for v in obj]
      else:
          return obj
  return resolve(schema)