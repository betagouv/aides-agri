"""
Streamlit App for PDF Chunk Classification

This app allows users to upload PDFs, automatically chunks them based on 
hierarchical structure, and classifies each chunk into predefined categories.
"""

import os
import streamlit as st
from dotenv import load_dotenv

# Unified pipeline imports
from data_extraction.adapters.chunk_classifier import AlbertChunkClassifier
from data_extraction.services.parser_aide import ParserAide

# Load environment variables
load_dotenv()

# Page configuration
st.set_page_config(
    page_title="Classification de Chunks PDF",
    page_icon="📄",
    layout="wide"
)

# Custom CSS for better styling
st.markdown("""
<style>
    .chunk-box {
        background-color: #f0f2f6;
        border-left: 4px solid #0068c9;
        padding: 15px;
        margin: 10px 0;
        border-radius: 5px;
    }
    .category-header {
        font-size: 1.3em;
        font-weight: bold;
        color: #0068c9;
        margin-top: 20px;
        margin-bottom: 10px;
    }
    .chunk-title {
        font-weight: bold;
        color: #333;
        margin-bottom: 5px;
    }
    .chunk-content {
        font-size: 0.9em;
        color: #555;
        white-space: pre-wrap;
    }
</style>
""", unsafe_allow_html=True)

# Title and description
st.title("📄 Classification de Chunks PDF")
st.markdown("""
Cette application analyse des documents PDF, les découpe en sections basées sur leur structure 
hiérarchique (titres), et classifie chaque section dans des catégories prédéfinies.
""")
st.markdown("---")

# Initialize session state
if 'chunks' not in st.session_state:
    st.session_state.chunks = None
if 'classified_chunks' not in st.session_state:
    st.session_state.classified_chunks = None
if 'grouped_chunks' not in st.session_state:
    st.session_state.grouped_chunks = None
if 'processing' not in st.session_state:
    st.session_state.processing = False
# Legacy placeholder removed: full_markdown not required with ParserAide pipeline
if 'extracted_data' not in st.session_state:
    st.session_state.extracted_data = None

# Sidebar configuration
with st.sidebar:
    st.header("⚙️ Configuration")
    
    st.subheader("Modèle Albert")
    model_name = st.selectbox(
        "Modèle",
        ["albert-small", "albert-large", "albert-code"],
        help="Choisissez le modèle Albert à utiliser pour la classification"
    )
    
    window_size = st.slider(
        "Taille de la fenêtre contextuelle",
        min_value=0,
        max_value=5,
        value=2,
        help="Nombre de chunks autour utilisés comme contexte pour la classification"
    )
    
    st.markdown("---")
    st.subheader("À propos")
    st.markdown("""
    Cette application utilise :
    - **Docling** pour parser les PDFs
    - **Albert LLM** pour la classification
    - **Langfuse** pour la gestion des prompts
    """)

# Main content area
tab1, tab2, tab3, tab4 = st.tabs(["📤 Upload & Traitement", "🔍 Résultats Détaillés", "📊 Vue par Catégorie", "📋 Extraction Structurée"])

with tab1:
    st.header("Upload de PDF")
    
    # File uploader
    uploaded_file = st.file_uploader(
        "Glissez-déposez un fichier PDF ou cliquez pour parcourir",
        type=['pdf'],
        help="Sélectionnez un fichier PDF à analyser"
    )
    
    if uploaded_file is not None:
        # Save uploaded file temporarily
        temp_dir = "temp_uploads"
        os.makedirs(temp_dir, exist_ok=True)
        temp_path = os.path.join(temp_dir, uploaded_file.name)
        
        with open(temp_path, "wb") as f:
            f.write(uploaded_file.getbuffer())
        
        st.success(f"✅ Fichier chargé : {uploaded_file.name}")
        
        # Process button
        col1, col2, col3 = st.columns([1, 2, 1])
        with col2:
            if st.button("🚀 Analyser et Classifier", use_container_width=True, type="primary"):
                st.session_state.processing = True
                
                try:
                    # Initialisation pipeline
                    classifier = AlbertChunkClassifier(model_name=model_name, temperature=0)
                    parser = ParserAide(chunk_classifier=classifier, model_name=model_name)

                    # Chunking first (to know total upfront)
                    with st.spinner("📖 Découpage du PDF en chunks..."):
                        raw_chunks = parser.chunker.chunk_file(temp_path)
                        st.session_state.chunks = raw_chunks
                        st.info(f"✂️ {len(raw_chunks)} chunks extraits du document")

                    # Progress classification
                    progress_bar = st.progress(0)
                    status_text = st.empty()

                    def update_progress(done: int, total: int):
                        status_text.text(f"Classification du chunk {done}/{total}...")
                        progress_bar.progress(done / total if total else 0)

                    with st.spinner("🤖 Classification des chunks..."):
                        grouped_chunks, classified_chunks = parser.classify_chunks_with_progress(
                            temp_path,
                            window_size=window_size,
                            progress_callback=update_progress
                        )
                    status_text.empty()
                    progress_bar.empty()
                    st.success(f"✅ Classification terminée : {len(classified_chunks)} chunks classifiés")

                    # Structured extraction
                    with st.spinner("🔍 Extraction structurée..."):
                        extracted_json = parser.extract_structured(temp_path)
                    st.success("✅ Extraction structurée terminée")

                    # Persist state
                    st.session_state.classified_chunks = classified_chunks
                    st.session_state.extracted_data = extracted_json
                    st.session_state.grouped_chunks = grouped_chunks
                    st.session_state.chunks = [
                        {k: v for k, v in c.items() if k in ("title", "content", "categorie")}
                        for c in classified_chunks
                    ]

                    st.session_state.processing = False

                    # Résumé par catégorie
                    st.markdown("### 📊 Résumé")
                    cols = st.columns(min(len(grouped_chunks), 4))
                    for idx, (category, chunks_in_cat) in enumerate(grouped_chunks.items()):
                        with cols[idx % 4]:
                            st.metric(label=category, value=len(chunks_in_cat))
                    
                except Exception as e:
                    st.error(f"❌ Erreur lors du traitement : {str(e)}")
                    st.exception(e)
                    st.session_state.processing = False
        
        # Clean up temporary file
        if os.path.exists(temp_path) and not st.session_state.processing:
            try:
                os.remove(temp_path)
            except:
                pass

with tab2:
    st.header("Résultats Détaillés")
    
    if st.session_state.classified_chunks is None:
        st.info("👆 Uploadez et analysez un PDF dans l'onglet 'Upload & Traitement' pour voir les résultats")
    else:
        # Display all chunks with their classifications
        for i, chunk in enumerate(st.session_state.classified_chunks, 1):
            with st.expander(f"Chunk {i}: {chunk['title']} - **[{chunk['categorie']}]**"):
                st.markdown(f"**Catégorie:** `{chunk['categorie']}`")
                st.markdown("**Contenu:**")
                st.text_area(
                    "Content",
                    value=chunk['content'],
                    height=200,
                    disabled=True,
                    label_visibility="collapsed",
                    key=f"chunk_content_{i}"
                )

with tab3:
    st.header("Vue par Catégorie")
    
    if st.session_state.grouped_chunks is None:
        st.info("👆 Uploadez et analysez un PDF dans l'onglet 'Upload & Traitement' pour voir les résultats")
    else:
        grouped = st.session_state.grouped_chunks or {}
        # Display chunks grouped by category
        for category, chunks_in_cat in sorted(grouped.items()):
            st.markdown(f"### 📁 {category.upper()} ({len(chunks_in_cat)} chunks)")
            
            for i, chunk in enumerate(chunks_in_cat, 1):
                with st.expander(f"{i}. {chunk['title']}"):
                    st.markdown(chunk['content'])
            
            st.markdown("---")

with tab4:
    st.header("Extraction Structurée")
    
    if st.session_state.extracted_data is None:
        st.info("👆 Uploadez et analysez un PDF dans l'onglet 'Upload & Traitement' pour voir les données extraites")
    else:
        st.markdown("### 📋 Informations extraites du document")
        
        # Display extracted data
        extracted_data = st.session_state.extracted_data
        
        # Dates section
        st.markdown("#### 📅 Dates")
        col1, col2 = st.columns(2)
        
        with col1:
            st.markdown("**Date d'ouverture**")
            date_ouverture = extracted_data.get('dates', {}).get('date_ouverture', 'Non renseignée')
            st.info(date_ouverture if date_ouverture else 'Non renseignée')
        
        with col2:
            st.markdown("**Date de clôture**")
            date_cloture = extracted_data.get('dates', {}).get('date_cloture', 'Non renseignée')
            st.info(date_cloture if date_cloture else 'Non renseignée')
        
        st.markdown("---")
        
        # Geography section
        st.markdown("#### 🗺️ Zones géographiques")
        
        # Eligible zones
        st.markdown("**Zones éligibles**")
        zones_eligibles = extracted_data.get('eligibilite_geographique', {}).get('zones_eligibles', [])
        if zones_eligibles:
            for zone in zones_eligibles:
                st.success(f"✓ {zone}")
        else:
            st.info("Aucune zone éligible spécifiée")
        
        st.markdown("")
        
        # Excluded zones
        st.markdown("**Zones exclues**")
        zones_exclues = extracted_data.get('eligibilite_geographique', {}).get('zones_exclues', [])
        if zones_exclues:
            for zone in zones_exclues:
                st.error(f"✗ {zone}")
        else:
            st.info("Aucune zone exclue spécifiée")
        
        st.markdown("---")
        
        # JSON view
        with st.expander("🔍 Voir les données brutes (JSON)"):
            st.json(extracted_data)

# Footer
st.markdown("---")
st.markdown("""
<div style='text-align: center; color: #666; padding: 20px;'>
    🌾 Classification de Chunks PDF | Powered by Albert LLM & Docling
</div>
""", unsafe_allow_html=True)
