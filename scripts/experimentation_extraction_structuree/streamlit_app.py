import os
import streamlit as st

import pandas as pd
import json

from data_extraction.schemas.v1.schema_dispositif_aide import DispositifAide
from data_extraction.services.engine import Engine
from typing import Any

# Configuration de la page
st.set_page_config(
    page_title="Extraction d'Aides Agricoles",
    page_icon="🌾",
    layout="wide"
)

st.title("🌾 Extraction d'Aides Agricoles")
st.markdown("---")

# Découverte automatique des PDFs dans le dossier sample_pdf à côté de ce fichier
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
SAMPLE_DIR = os.path.join(BASE_DIR, "sample_pdf")
PDF_FILES = {}
if os.path.isdir(SAMPLE_DIR):
    for fname in sorted(os.listdir(SAMPLE_DIR)):
        if fname.lower().endswith(".pdf"):
            PDF_FILES[fname] = os.path.join(SAMPLE_DIR, fname)

# Sidebar pour la configuration
st.sidebar.header("Configuration")

# Sélection du PDF
if PDF_FILES:
    selected_pdf = st.sidebar.selectbox(
        "Choisir un PDF:",
        list(PDF_FILES.keys())
    )
    pdf_path = PDF_FILES[selected_pdf]
else:
    st.sidebar.warning("Aucun fichier PDF trouvé dans sample_pdf/")
    selected_pdf = None
    pdf_path = None

# Sélection de la méthode d'extraction de texte
st.sidebar.subheader("Méthode d'extraction de texte")
extraction_method = st.sidebar.selectbox(
    "Choisir la méthode d'extraction:",
    ["docling", "pdf_miner", "langchain", "pypdf"],
    help="Choisissez la méthode pour extraire le texte du PDF"
)

# Sélection du modèle pour l'extraction structurée
st.sidebar.subheader("Modèle d'extraction structurée")
model_choice = st.sidebar.radio(
    "Choisir le modèle:",
    ["API Albert", "Modèle Local (Ollama)"],
    help="Choisissez entre l'API Albert ou un modèle local via Ollama"
)

# Configuration API Albert
if model_choice == "API Albert":
    st.sidebar.subheader("Configuration API Albert")
    model_name = st.sidebar.selectbox(
        "Modèle Albert:",
        ["albert-small", "albert-large"],
        help="Choisissez le modèle Albert à utiliser"
    )

# Configuration modèle local
if model_choice == "Modèle Local (Ollama)":
    st.sidebar.subheader("Configuration Modèle Local")
    local_model = st.sidebar.selectbox(
        "Modèle Ollama:",
        ["gemma3:1b", "gemma3:4b", "llama3.1:8b", "mistral:7b"],
        help="Choisissez le modèle Ollama à utiliser"
    )

# Boutons d'action
col1, col2 = st.columns(2)

with col1:
    extract_text_btn = st.button("📄 Extraire le texte du PDF", type="primary")

with col2:
    extract_structured_btn = st.button("🤖 Extraction structurée", type="secondary")

# Zone d'affichage des résultats
st.markdown("---")
st.subheader("Résultats")

# Initialisation des variables de session
if 'extracted_text' not in st.session_state:
    st.session_state.extracted_text = None
if 'structured_output' not in st.session_state:
    st.session_state.structured_output = None
if 'last_extraction_method' not in st.session_state:
    st.session_state.last_extraction_method = None
if 'last_pdf_selected' not in st.session_state:
    st.session_state.last_pdf_selected = None

# Affichage persistant du texte extrait
if st.session_state.extracted_text is not None:
    st.markdown("### 📄 Texte extrait")
    st.info(f"✅ Texte extrait depuis **{st.session_state.last_pdf_selected}** avec la méthode **{st.session_state.last_extraction_method}** ({len(st.session_state.extracted_text)} caractères)")
    
    with st.expander("📝 Texte extrait (premiers 1000 caractères)", expanded=False):
        st.text(st.session_state.extracted_text[:1000] + "..." if len(st.session_state.extracted_text) > 1000 else st.session_state.extracted_text)
    
    # Bouton pour réextraire si nécessaire
    if st.button("🔄 Réextraire le texte"):
        st.session_state.extracted_text = None
        st.rerun()

# Fonction pour extraire le texte
def extract_text_from_pdf():
    try:
        st.info(f"Extraction du texte avec {extraction_method}...")
        parser_key = "pdfminer" if extraction_method == "pdf_miner" else extraction_method
        if not pdf_path:
            st.error("Aucun PDF sélectionné")
            return
        engine = Engine(schema=DispositifAide, parser_name=parser_key)
        text = engine.parse(pdf_path)
        st.session_state.extracted_text = text
        st.session_state.last_extraction_method = extraction_method
        st.session_state.last_pdf_selected = selected_pdf
        st.success(f"✅ Texte extrait avec succès! ({len(text)} caractères)")
        st.rerun()
    except Exception as e:
        st.error(f"❌ Erreur lors de l'extraction: {str(e)}")

def extract_structured():
    try:
        parser_key = "pdfminer" if extraction_method == "pdf_miner" else extraction_method
        selected_model = model_name if model_choice == "API Albert" else local_model
        st.info("🤖 Extraction structurée en cours...")
        engine = Engine(
            schema=DispositifAide,
            parser_name=parser_key,
            model_name=selected_model
        )
        if not pdf_path:
            st.error("Aucun PDF sélectionné")
            return
        if st.session_state.extracted_text:
            result = engine.generate(st.session_state.extracted_text)
        else:
            result = engine.run(pdf_path)
        if result is None or not hasattr(result, "get_json"):
            st.error("❌ Erreur: le résultat de l'extraction structurée est invalide ou ne possède pas la méthode 'get_json'.")
            return
        content_json = result.get_json()
        carbon = getattr(result, "carbon", None)
        st.session_state.carbon = carbon
        if isinstance(content_json, str):
            structured_data = DispositifAide.model_validate_json(content_json)
        else:
            structured_data = DispositifAide.model_validate(content_json)
        st.session_state.structured_output = structured_data
        st.success("✅ Extraction structurée réussie!")
        st.rerun()
    except Exception as e:
        st.error(f"❌ Erreur lors de l'extraction structurée: {str(e)}")

# Gestion des clics sur les boutons
if extract_text_btn:
    extract_text_from_pdf()

if extract_structured_btn:
    extract_structured()

# Affichage des résultats structurés
if st.session_state.structured_output is not None:
    st.markdown("---")
    st.subheader("📊 Résultat de l'extraction structurée")
    
    # Affichage en format JSON
    with st.expander("📋 Données structurées (JSON)"):
        json_data = st.session_state.structured_output.model_dump()
        st.json(json_data)
    
    st.markdown("---")
    st.markdown(f"**Émissions de CO2 estimées:** {st.session_state.carbon} kgCO2eq")
    # Affichage formaté
    st.markdown("### 📝 Informations extraites")
    
    data = st.session_state.structured_output
    
    col1, col2 = st.columns(2)
    
    with col1:
        st.markdown(f"**Titre:** {data.presentation_aide.titre_aide}")
        st.markdown(f"**Description:** {data.presentation_aide.description_aide}")

        if data.eligibilite:
            st.markdown("**Critères d'éligibilité:**")
            for critere in data.eligibilite.criteres_eligibilite:
                st.markdown(f"- {critere}")
            st.markdown("**Opérations éligibles:**")
            for critere in data.eligibilite.operation_eligible:
                st.markdown(f"- {critere}")
            st.markdown("**Opérations non éligibles:**")
            for critere in data.eligibilite.operation_non_eligible:
                st.markdown(f"- {critere}")
                
    
    with col2:
        if data.types_aides:
            st.markdown("**Types d'aides:**")

            # Format enum members or strings into a human-friendly, de-duplicated list
            def _format_type_item(item):
                # If it's an enum-like object with a .value attribute, prefer that
                try:
                    if hasattr(item, "value"):
                        val = item.value
                    else:
                        val = item
                except Exception:
                    val = item

                # Convert to str and normalize spacing
                s = str(val).strip()
                # Capitalize only the first letter to keep multi-word labels natural
                if s:
                    s = s[0].upper() + s[1:]
                return s

            formatted = []
            seen = set()
            for aide in data.types_aides:
                label = _format_type_item(aide)
                if label and label not in seen:
                    seen.add(label)
                    formatted.append(label)

            if formatted:
                # Show as a comma-separated human readable string
                st.markdown(f"{', '.join(formatted)}")
        
        if data.porteurs:
            st.markdown("**Porteurs:**")
            for porteur in data.porteurs.liste_porteurs:
                roles_str = ", ".join(porteur.roles)
                st.markdown(f"- {porteur.nom} ({roles_str})")
    
        # Informations supplémentaires
        if data.cibles:
            st.markdown("**Bénéficiaires ciblés:**")
            for cible in data.cibles.beneficiaire:
                st.markdown(f"- {cible}")
        
        if data.eligibilite_geographique:
            if data.eligibilite_geographique.zones_eligibles:
                st.markdown("**Zones éligibles:**")
                for zone_eligible in data.eligibilite_geographique.zones_eligibles:
                    st.markdown(f"- {zone_eligible}")
            st.markdown("**Zones exclues:**")
            if data.eligibilite_geographique.zones_exclues:
                for zone_exclue in data.eligibilite_geographique.zones_exclues:
                    st.markdown(f"- {zone_exclue}")
            else:
                st.markdown("- Aucune")
        
        if data.dates:
            st.markdown(f"**Date d'ouverture:** {data.dates.date_ouverture}")
            st.markdown(f"**Date de clôture:** {data.dates.date_cloture}")


    data_dict = data.model_dump()
    df = pd.DataFrame([data_dict])

    # Export buttons
    st.title("Export DispositifAide")

    # JSON export using Pydantic's model_dump_json for better fidelity
    try:
        json_payload = data.model_dump_json(indent=2, ensure_ascii=False)
    except Exception:
        json_payload = json.dumps(data_dict, indent=2, ensure_ascii=False)

    st.download_button("Export as JSON", json_payload, file_name="dispositif.json", mime="application/json")

    # Helper to convert pydantic model to Markdown
    def model_to_markdown(obj: Any, level: int = 2) -> str:
        """Recursively convert a pydantic BaseModel (or dict/list/primitive) to a markdown string.

        - dict/BaseModel: each key becomes a heading at current level, values are recursed with level+1
        - list/tuple: enumerated items are recursed; simple lists are shown as bullet lists
        - primitives: returned as string
        """
        md_lines = []

        # handle pydantic BaseModel-like objects by converting to dict
        try:
            # avoid importing pydantic directly to keep optional deps minimal
            if hasattr(obj, "model_dump"):
                obj = obj.model_dump()
        except Exception:
            pass

        if isinstance(obj, dict):
            for key, val in obj.items():
                heading = f"{'#' * level} {key}"
                md_lines.append(heading)
                md_lines.append("")
                md_lines.append(model_to_markdown(val, min(level + 1, 6)))
                md_lines.append("")
        elif isinstance(obj, (list, tuple)):
            # if list of primitives, render bullets
            if all(not isinstance(i, (dict, list, tuple)) for i in obj):
                for item in obj:
                    md_lines.append(f"- {item}")
            else:
                for idx, item in enumerate(obj, start=1):
                    md_lines.append(f"{'#' * level} Item {idx}")
                    md_lines.append("")
                    md_lines.append(model_to_markdown(item, min(level + 1, 6)))
                    md_lines.append("")
        else:
            # primitive
            md_lines.append(str(obj) if obj is not None else "")

        return "\n".join([line for line in md_lines if line is not None])

    md_content = model_to_markdown(data)
    st.download_button("Export as Markdown", md_content, file_name="dispositif.md", mime="text/markdown")

# Footer
st.markdown("---")
st.markdown("🌾 **Extraction d'Aides Agricoles** - Outil d'extraction et d'analyse de documents PDF")
