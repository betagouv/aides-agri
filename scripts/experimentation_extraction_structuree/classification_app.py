"""
Streamlit App for PDF Chunk Classification

This app allows users to upload PDFs, automatically chunks them based on 
hierarchical structure, and classifies each chunk into predefined categories.
"""

import os
import streamlit as st
from dotenv import load_dotenv
from pdf_chunker import HierarchicalPDFChunker
from chunk_classifier import ChunkClassifier

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
if 'processing' not in st.session_state:
    st.session_state.processing = False

# Sidebar configuration
with st.sidebar:
    st.header("⚙️ Configuration")
    
    st.subheader("Modèle Albert")
    model_name = st.selectbox(
        "Modèle",
        ["albert-small", "albert-large"],
        help="Choisissez le modèle Albert à utiliser pour la classification"
    )
    
    temperature = st.slider(
        "Température",
        min_value=0.0,
        max_value=1.0,
        value=0.2,
        step=0.1,
        help="Température pour la génération (0 = déterministe, 1 = créatif)"
    )
    
    window_size = st.slider(
        "Taille de la fenêtre contextuelle",
        min_value=1,
        max_value=5,
        value=2,
        help="Nombre de chunks avant/après à utiliser comme contexte"
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
tab1, tab2, tab3 = st.tabs(["📤 Upload & Traitement", "🔍 Résultats Détaillés", "📊 Vue par Catégorie"])

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
                    with st.spinner("📖 Parsing du PDF et découpage en chunks..."):
                        # Initialize chunker
                        chunker = HierarchicalPDFChunker()
                        
                        # Chunk the PDF
                        chunks = chunker.chunk_file(temp_path)
                        st.session_state.chunks = chunks
                        
                        st.info(f"✂️ {len(chunks)} chunks extraits du document")
                    
                    with st.spinner("🤖 Classification des chunks avec Albert LLM..."):
                        # Initialize classifier
                        classifier = ChunkClassifier(
                            model_name=model_name,
                            temperature=temperature
                        )
                        
                        # Classify chunks with progress bar
                        progress_bar = st.progress(0)
                        status_text = st.empty()
                        
                        classified_chunks = []
                        for i, chunk_obj in enumerate(chunks):
                            # Get context
                            if i == 0:
                                prev_chunks = "No chunk is available."
                            else:
                                start_idx = max(0, i - window_size)
                                prev = chunks[start_idx:i]
                                prev_chunks = "\n\n".join([c['content'] for c in prev])
                            
                            if i >= len(chunks) - 1:
                                next_chunks = "No chunk is available."
                            else:
                                end_idx = min(len(chunks), i + 1 + window_size)
                                next = chunks[i + 1:end_idx]
                                next_chunks = "\n\n".join([c['content'] for c in next])
                            
                            # Classify
                            status_text.text(f"Classification du chunk {i+1}/{len(chunks)}...")
                            classification = classifier.classify_chunk(
                                chunk=chunk_obj['content'],
                                title=chunk_obj['title'],
                                previous_chunks=prev_chunks,
                                next_chunks=next_chunks
                            )
                            
                            classified_chunks.append({
                                'title': chunk_obj['title'],
                                'content': chunk_obj['content'],
                                'categorie': classification['categorie']
                            })
                            
                            # Update progress
                            progress_bar.progress((i + 1) / len(chunks))
                        
                        st.session_state.classified_chunks = classified_chunks
                        status_text.empty()
                        progress_bar.empty()
                        
                        st.success(f"✅ Classification terminée ! {len(classified_chunks)} chunks classifiés")
                    
                    st.session_state.processing = False
                    
                    # Show summary
                    st.markdown("### 📊 Résumé")
                    grouped = classifier.group_by_category(classified_chunks)
                    
                    cols = st.columns(min(len(grouped), 4))
                    for idx, (category, chunks_in_cat) in enumerate(grouped.items()):
                        with cols[idx % 4]:
                            st.metric(
                                label=category,
                                value=len(chunks_in_cat)
                            )
                    
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
    
    if st.session_state.classified_chunks is None:
        st.info("👆 Uploadez et analysez un PDF dans l'onglet 'Upload & Traitement' pour voir les résultats")
    else:
        # Group by category
        classifier_temp = ChunkClassifier()
        grouped = classifier_temp.group_by_category(st.session_state.classified_chunks)
        
        # Display chunks grouped by category
        for category, chunks_in_cat in sorted(grouped.items()):
            st.markdown(f"### 📁 {category.upper()} ({len(chunks_in_cat)} chunks)")
            
            for i, chunk in enumerate(chunks_in_cat, 1):
                with st.expander(f"{i}. {chunk['title']}"):
                    st.markdown(chunk['content'])
            
            st.markdown("---")

# Footer
st.markdown("---")
st.markdown("""
<div style='text-align: center; color: #666; padding: 20px;'>
    🌾 Classification de Chunks PDF | Powered by Albert LLM & Docling
</div>
""", unsafe_allow_html=True)
