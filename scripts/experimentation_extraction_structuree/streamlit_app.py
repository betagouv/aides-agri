import os
import streamlit as st

from data_extraction.schemas.pydantic_schema import DispositifAide
from data_extraction.core.engine import Engine

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
        ["albert-small", "albert-medium", "albert-large"],
        help="Choisissez le modèle Albert à utiliser"
    )

# Configuration modèle local
if model_choice == "Modèle Local (Ollama)":
    st.sidebar.subheader("Configuration Modèle Local")
    local_model = st.sidebar.selectbox(
        "Modèle Ollama:",
        ["gemma3:4b", "llama3.1:8b", "mistral:7b"],
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
        engine = Engine(schema=DispositifAide, parser=parser_key)
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
            parser=parser_key,
            model_name=selected_model,
            temperature=0.1,
            max_completion_tokens=2000,
        )
        if not pdf_path:
            st.error("Aucun PDF sélectionné")
            return
        if st.session_state.extracted_text:
            result = engine.generate(st.session_state.extracted_text[:50000])
        else:
            result = engine.run(pdf_path)
        content_json = result.get_json()
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
    
    # Affichage formaté
    st.markdown("### 📝 Informations extraites")
    
    data = st.session_state.structured_output
    
    col1, col2 = st.columns(2)
    
    with col1:
        st.markdown(f"**Titre:** {data.titre}")
        st.markdown(f"**Description:** {data.description}")
        
        if data.eligibilite:
            st.markdown("**Critères d'éligibilité:**")
            for critere in data.eligibilite:
                st.markdown(f"- {critere}")
    
    with col2:
        if data.types_aides:
            st.markdown("**Types d'aides:**")
            for aide in data.types_aides:
                st.markdown(f"- {aide}")
        
        if data.porteurs:
            st.markdown("**Porteurs:**")
            for porteur in data.porteurs:
                roles_str = ", ".join(porteur.roles)
                st.markdown(f"- {porteur.nom} ({roles_str})")
    
    # Informations supplémentaires
    if data.cibles:
        st.markdown("**Bénéficiaires ciblés:**")
        for cible in data.cibles:
            st.markdown(f"- {cible}")
    
    if data.eligibilite_geographique:
        st.markdown(f"**Couverture géographique:** {data.eligibilite_geographique}")
    
    if data.date_ouverture:
        st.markdown(f"**Date d'ouverture:** {data.date_ouverture.strftime('%d/%m/%Y')}")
    
    if data.date_cloture:
        st.markdown(f"**Date de clôture:** {data.date_cloture.strftime('%d/%m/%Y')}")

# Footer
st.markdown("---")
st.markdown("🌾 **Extraction d'Aides Agricoles** - Outil d'extraction et d'analyse de documents PDF")
