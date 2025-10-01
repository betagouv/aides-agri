from typing import Any, Dict
from tqdm import tqdm
import time

import pandas as pd
from docling.datamodel.accelerator_options import AcceleratorDevice, AcceleratorOptions
from docling.datamodel.base_models import InputFormat
from docling.datamodel.pipeline_options import (
    PdfPipelineOptions,
)
from docling.datamodel.settings import settings
from docling.document_converter import DocumentConverter, PdfFormatOption

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

def parse_document(parser: str, path: str) -> Any:
    """Parse un document avec un parser donné."""
    parser_engine = Engine(schema=DispositifAide, parser=parser)
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

def build_and_save_result(output_folder: str, results: Dict[str, Any], parser: str, model: str, filename: str) -> None:
    """Construit l'objet final et écrit le résultat dans un fichier JSON."""
    final_obj = DispositifAide(**results)
    file_name = f"{parser}-{model}-{filename}"
    out_path = f"{output_folder}/{file_name}.json"
    with open(out_path, "w", encoding="utf-8") as f:
        f.write(final_obj.model_dump_json(indent=4))


def benchmark_v3(output_folder: str = "expe_3", temperature: float = 0.2) -> None:
    """Benchmark multiple parsers and models against DOC_PATH documents."""

    for parser in ["docling", "pdfminer"]:
        for filename, path in DOC_PATH.items():
            content = parse_document(parser, path)

            for model in tqdm(models, desc=f"Models ({parser}-{filename})"):
                pydantic_entities: Dict[str, Any] = {}
                
                for field_name, schema_cls in tqdm(entity_map, desc=f"Entities ({model})"):
                    pydantic_entities[field_name] = extract_entity(content, model, field_name, schema_cls, temperature)

                build_and_save_result(output_folder, pydantic_entities, parser, model, filename)






def run_pipeline(file_path: str, device: str) -> float:
        """Exécute DocumentConverter sur un fichier avec un device donné et retourne le temps total."""
        accelerator_options = AcceleratorOptions(num_threads=8, device=device)
        
        pipeline_options = PdfPipelineOptions()
        pipeline_options.accelerator_options = accelerator_options
        pipeline_options.do_ocr = True
        pipeline_options.do_table_structure = True
        pipeline_options.table_structure_options.do_cell_matching = True

        converter = DocumentConverter(
            format_options={
                InputFormat.PDF: PdfFormatOption(
                    pipeline_options=pipeline_options,
                )
            }
        )

        # Profiling activé
        settings.debug.profile_pipeline_timings = True

        start = time.perf_counter()
        conversion_result = converter.convert(file_path)
        elapsed = time.perf_counter() - start

        # Pour vérification
        doc_conversion_secs = conversion_result.timings["pipeline_total"].times
        print(f"[{device}] pipeline timing: {doc_conversion_secs}")
        return elapsed

def run_parser(file_path: str) -> float:
    """Exécute pdfminer Engine sur un fichier et retourne le temps."""
    parser_engine = Engine(schema=DispositifAide, parser="pdfminer")
    start = time.perf_counter()
    _ = parser_engine.parse(file_path)
    elapsed = time.perf_counter() - start
    return elapsed


def benchmark_file(file_path: str):
    """
    Exécute un document donné avec deux accélérateurs (CPU, MPS)
    et avec pdfminer Engine. Retourne les temps d'exécution.
    """

    # --- Exécutions ---
    cpu_time = run_pipeline(file_path, AcceleratorDevice.CPU)
    mps_time = run_pipeline(file_path, AcceleratorDevice.MPS)
    parse_time = run_parser(file_path)

    return cpu_time, mps_time, parse_time


def compare_parsers_performance():
    # Résultats stockés dans une liste
    results = []

    for name, path in DOC_PATH.items():
        print(f"\n=== Benchmarking {name} ===")
        cpu_t, mps_t, parse_t = benchmark_file(path)
        results.append({
            "document": name,
            "cpu_time": cpu_t,
            "mps_time": mps_t,
            "pdfminer_time": parse_t
        })

    # Conversion en DataFrame
    df = pd.DataFrame(results)
    print("\n=== Résumé des benchmarks ===")
    print(df)

    return df