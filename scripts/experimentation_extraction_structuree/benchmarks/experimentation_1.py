import json
from tqdm.notebook import tqdm

from settings import DOC_PATH, models
from data_extraction.core.engine import Engine
from data_extraction.schemas.v1.schema_dispositif_aide import DispositifAide

def benchmark_v0(output_folder: str = "expe_1", temperature: float = 0.2):
  for filename, path in DOC_PATH.items():
    for model in tqdm(models):
      engine = Engine(schema=DispositifAide, model_name=model)
      result = engine.run(path, temperature=temperature)
      file_name = f"{model}_{filename}"
      with open(f"{output_folder}/{file_name}.json", "w", encoding="utf-8") as f:
        json.dump(result.get_json(), f, ensure_ascii=False, indent=4)