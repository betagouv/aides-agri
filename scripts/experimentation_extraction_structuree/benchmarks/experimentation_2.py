from typing import Any, Dict
from tqdm import tqdm

from settings import DOC_PATH, models
from data_extraction.core.engine import Engine
from data_extraction.schemas.v1.schema_dispositif_aide import DispositifAide

from data_extraction.schemas.v1.entities import (
    PresentationAide,
    Eligibilite,
    TypeAide,
    ListePorteurs,
    InformationsExternes,
    Beneficiaire,
    EligibiliteGeographique,
    Dates,
)

entity_map: list[tuple[str, type]] = [
    ("presentation_aide", PresentationAide),
    ("eligibilite", Eligibilite),
    ("types_aides", TypeAide),
    ("porteurs", ListePorteurs),
    ("informations_externes", InformationsExternes),
    ("cibles", Beneficiaire),
    ("eligibilite_geographique", EligibiliteGeographique),
    ("dates", Dates),
]

def parse_document(path: str) -> Any:
    """Parse un document avec un parser donné."""
    parser_engine = Engine(schema=DispositifAide, parser="pdfminer")
    return parser_engine.parse(path)

def extract_entity(content: Any, model: str, field_name: str, schema_cls: Any, temperature: float) -> Any:
    """Extrait et valide une entité donnée avec un modèle."""
    try:
        eng = Engine(schema=schema_cls, model_name=model)
        structured = eng.generate(content, temperature=temperature)
        if structured is None:
            print(f"{field_name}: no response (API busy or error)")
            return None
        
        # Première tentative : validation stricte Pydantic
        try:
            return schema_cls.model_validate(structured.get_json())
        except Exception as e:
            print(f"{field_name}: validation error -> {e}")
            # Fallback : instanciation directe
            try:
                return schema_cls(**structured.get_json())
            except Exception:
                return None
    except Exception as e:
        print(f"{field_name}: extraction error -> {e}")
        return None

def build_and_save_result(output_folder: str, results: Dict[str, Any], model: str, filename: str) -> None:
    """Construit l'objet final et écrit le résultat dans un fichier JSON."""
    final_obj = DispositifAide(**results)
    file_name = f"{model}-{filename}"
    out_path = f"{output_folder}/{file_name}.json"
    with open(out_path, "w", encoding="utf-8") as f:
        f.write(final_obj.model_dump_json(indent=4))


def benchmark_v2(output_folder: str = "expe_2", temperature: float = 0.2) -> None:
    """Benchmark multiple parsers and models against DOC_PATH documents."""

    for filename, path in DOC_PATH.items():
        content = parse_document(path)

        for model in tqdm(models, desc=f"Models ({filename})"):
            pydantic_entities: Dict[str, Any] = {}
            
            for field_name, schema_cls in tqdm(entity_map, desc=f"Entities ({model})"):
                pydantic_entities[field_name] = extract_entity(content, model, field_name, schema_cls, temperature)

            build_and_save_result(output_folder, pydantic_entities, model, filename)