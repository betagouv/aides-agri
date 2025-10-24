import os
import streamlit as st

import json
import base64

from data_extraction.schemas.v2.schema_dispositif_aide import DispositifAide
from data_extraction.services.engine import Engine

# Configuration de la page
st.set_page_config(
    page_title="Extraction d'Aides Agricoles",
    page_icon="🌾",
    layout="wide"
)


def structured_to_markdown(structured) -> str:
    """Convert a structured Python object into a human-readable Markdown string.

    - Dicts: each top-level key becomes a bolded label followed by a readable value.
    - Lists: rendered as bullet lists with nested formatting.
    - Scalars: rendered inline.

    This produces Markdown intended for human reading rather than raw JSON code blocks.
    """
    if structured is None:
        return ""

    md_lines = ["# Extraction — Résumé\n"]

    def emit_scalar(val):
        if val is None:
            return "(aucune valeur)"
        if isinstance(val, bool):
            return "Oui" if val else "Non"
        if isinstance(val, (int, float)):
            return str(val)
        # For long strings, keep them as-is but strip
        return str(val).strip()

    def render(obj, depth=0, is_top_level=False):
        indent = "  " * depth
        if isinstance(obj, dict):
            # If this is the top-level dict, render each key as a subsection title
            for idx, (k, v) in enumerate(obj.items()):
                if depth == 0:
                    # top-level: render as heading and separate fields
                    md_lines.append(f"### {k}\n")
                    if isinstance(v, (dict, list)):
                        render(v, depth + 1)
                    else:
                        md_lines.append(f"{emit_scalar(v)}\n")
                    # visual separator between main fields
                    md_lines.append("---\n")
                else:
                    # nested dict: use bullets
                    md_lines.append(f"{indent}- **{k}**: {''}")
                    if isinstance(v, (dict, list)):
                        md_lines.append("")
                        render(v, depth + 1)
                    else:
                        md_lines[-1] = md_lines[-1] + emit_scalar(v)
        elif isinstance(obj, list):
            for i, item in enumerate(obj, start=1):
                if isinstance(item, (dict, list)):
                    md_lines.append(f"{indent}- Item {i}:")
                    render(item, depth + 1)
                else:
                    md_lines.append(f"{indent}- {emit_scalar(item)}")
        else:
            # scalar at top-level or nested
            md_lines.append(f"{indent}- {emit_scalar(obj)}")

    try:
        render(structured)
    except Exception:
        # fallback to JSON block if anything unexpected happens
        try:
            return "# Extraction — Résumé\n\n```json\n" + json.dumps(structured, ensure_ascii=False, indent=2) + "\n```\n"
        except Exception:
            return "# Extraction — Résumé\n\n" + str(structured)

    return "\n".join(md_lines) + "\n"

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

# ------------------------------------------------------------------
# Resource pool UI (first part of the page)
# The user can add resources by: drag & drop upload, selecting sample PDFs,
# or pasting a resource URL. The rest of the page is hidden until the
# user validates the resource pool.
# ------------------------------------------------------------------

# Initialize session state for resource pool
if 'resource_pool' not in st.session_state:
    st.session_state.resource_pool = []
if 'resource_pool_validated' not in st.session_state:
    st.session_state.resource_pool_validated = False
# Widget key counters to force remount/clear after adds
if 'uploader_key_idx' not in st.session_state:
    st.session_state.uploader_key_idx = 0
if 'sample_select_key_idx' not in st.session_state:
    st.session_state.sample_select_key_idx = 0
if 'url_input_key_idx' not in st.session_state:
    st.session_state.url_input_key_idx = 0

st.header("Créer un pool de ressources")
st.markdown("Ajoutez des PDF via glisser-déposer, sélectionnez des exemples, ou collez une URL. Validez pour continuer.")

col_a, col_b, col_c = st.columns(3)

with col_a:
    uploader_key = f"uploader_{st.session_state.uploader_key_idx}"
    uploaded = st.file_uploader("Glisser-déposer des PDF", type=['pdf'], accept_multiple_files=True, key=uploader_key)
    if uploaded:
        # Ensure sample dir exists and save uploaded files there so they become selectable
        os.makedirs(SAMPLE_DIR, exist_ok=True)
        added = []
        for up in uploaded:
            target = os.path.join(SAMPLE_DIR, up.name)
            base, ext = os.path.splitext(up.name)
            i = 1
            # Avoid overwriting existing files
            while os.path.exists(target):
                target = os.path.join(SAMPLE_DIR, f"{base}_{i}{ext}")
                i += 1
            with open(target, "wb") as f:
                f.write(up.getbuffer())
            PDF_FILES[os.path.basename(target)] = target
            # Only add if not already present
            existing_paths = {it.get("path") for it in st.session_state.resource_pool if it.get("type") == "local"}
            if target not in existing_paths:
                st.session_state.resource_pool.append({"type": "local", "name": os.path.basename(target), "path": target})
                added.append(os.path.basename(target))
            else:
                st.warning(f"Ignoré (doublon): {os.path.basename(target)}")
        if added:
            st.success(f"Ajouté: {', '.join(added)}")
            # increment uploader key index to remount uploader (clears selection)
            st.session_state.uploader_key_idx += 1
            st.rerun()

with col_b:
    st.write("Sélection depuis sample_pdf")
    if PDF_FILES:
        sample_key = f"sample_select_{st.session_state.sample_select_key_idx}"
        sel = st.multiselect("Choisir des exemples", list(PDF_FILES.keys()), key=sample_key)
        if st.button("Ajouter les sélectionnés", key="add_samples"):
            added_sel = []
            skipped_sel = []
            existing_paths = {it.get("path") for it in st.session_state.resource_pool if it.get("type") == "local"}
            for name in sel:
                path = PDF_FILES.get(name)
                if path:
                    if path in existing_paths:
                        skipped_sel.append(name)
                    else:
                        st.session_state.resource_pool.append({"type": "local", "name": name, "path": path})
                        added_sel.append(name)
            if added_sel:
                st.success(f"{len(added_sel)} ajouté(s) au pool: {', '.join(added_sel)}")
            if skipped_sel:
                st.warning(f"Ignoré(s) déjà présent(s): {', '.join(skipped_sel)}")
            # increment multiselect key index to remount it (clears selection)
            st.session_state.sample_select_key_idx += 1
            st.rerun()
    else:
        st.write("Aucun exemple disponible.")

with col_c:
    url_key = f"url_input_{st.session_state.url_input_key_idx}"
    url = st.text_input("Coller une URL de ressource (page HTML ou PDF)", key=url_key)
    if st.button("Ajouter l'URL", key="add_url"):
        if url:
            # normalize URL simple form
            norm_url = url.strip()
            existing_urls = {it.get("url") for it in st.session_state.resource_pool if it.get("type") == "url"}
            if norm_url in existing_urls:
                st.warning("Ignoré: cette URL est déjà dans le pool")
            else:
                st.session_state.resource_pool.append({"type": "url", "url": norm_url})
                st.success("URL ajoutée au pool")
            # increment url input key index to remount it (clears value)
            st.session_state.url_input_key_idx += 1
            st.rerun()

st.markdown("### Pool courant")
if st.session_state.resource_pool:
    for idx, item in enumerate(st.session_state.resource_pool):
        if item.get("type") == "local":
            st.write(f"{idx+1}. 📄 {item['name']} (local)")
        else:
            st.write(f"{idx+1}. 🔗 {item['url']}")
    if st.button("Vider le pool", key="clear_pool"):
        st.session_state.resource_pool = []
        st.rerun()
else:
    st.info("Le pool est vide. Ajoutez au moins une ressource.")

# Validation (reveals the rest of the page)
if st.button("Valider le pool de ressources", key="validate_pool"):
    if not st.session_state.resource_pool:
        st.error("Ajoutez au moins une ressource avant de valider.")
    else:
        st.session_state.resource_pool_validated = True
        st.success("Pool validé — vous pouvez maintenant accéder aux outils d'extraction.")
        st.rerun()

# If not validated yet, stop the script here so the rest of the UI is hidden
if not st.session_state.resource_pool_validated:
    st.stop()

# ------------------------------------------------------------------
# Extraction and display (rest of the page)
# ------------------------------------------------------------------


# ------------------------------------------------------------------
# Extraction UI and execution
# - Let the user choose a provider (ollama / albert)
# - Let the user pick a model for the provider
# - Provide temperature and optional instruction prefix
# - Build Engine with the chosen model and run extraction on demand
# ------------------------------------------------------------------

print(f"Resource pool: {st.session_state.resource_pool}")
st.header("Configuration du modèle et extraction")

col1, col2, col3 = st.columns([2, 2, 3])

with col1:
    provider = st.selectbox("Provider", ["ollama", "albert"], index=0)

with col2:
    # Default model lists
    ollama_default = "gemma3:4b"
    albert_options = ["albert-small", "albert-large"]

    model_choice = None
    if provider == "ollama":
        # Try to list available ollama models if the package is present
        try:
            import ollama

            try:
                list_models_fn = getattr(ollama, "list_models", None)
                raw_models = list_models_fn() if callable(list_models_fn) else []
                # normalize to an iterable
                if isinstance(raw_models, (list, tuple, set)):
                    raw_iter = raw_models
                else:
                    raw_iter = [raw_models]

                models = []
                for m in raw_iter:
                    if isinstance(m, dict) and "id" in m:
                        models.append(m["id"])
                    else:
                        models.append(str(m))
                # keep only small-ish models when possible (best-effort filter)
                if models:
                    model_choice = st.selectbox("Modèle ollama", models, index=0)
                else:
                    model_choice = st.text_input("Modèle ollama (aucun modèle listé)", value=ollama_default)
            except Exception:
                # Fall back to a text input if listing fails
                model_choice = st.text_input("Modèle ollama", value=ollama_default)
        except Exception:
            # ollama not installed or not reachable: fallback to default name input
            model_choice = st.text_input("Modèle ollama (client non disponible)", value=ollama_default)
    else:
        model_choice = st.selectbox("Modèle albert", albert_options, index=0)

run_col1, run_col2 = st.columns([1, 4])
with run_col1:
    run_btn = st.button("Lancer l'extraction", key="run_extraction")
with run_col2:
    st.markdown("\n")

if run_btn:
    # basic validation
    if not st.session_state.resource_pool:
        st.error("Le pool de ressources est vide — ajoutez des PDF ou des URL avant d'extraire.")
    else:
        # Build Engine with selected model passed to its constructor so self.model_name is set
        try:
            engine = Engine(schema=DispositifAide, model_name=model_choice)
        except Exception as e:
            st.error(f"Erreur lors de la création de l'engine: {e}")
            st.stop()

        with st.spinner("Extraction en cours — ceci peut prendre quelques instants..."):
            try:
                pool_paths = [resource["path"] for resource in st.session_state.resource_pool if "path" in resource]
                response = engine.run(
                    resource_pool=pool_paths
                )
            except Exception as e:
                st.error(f"Erreur durant l'extraction: {e}")
                response = None

        structured = None
        if response is None:
            st.error("Aucune réponse retournée.")
        else:
            st.success("Extraction terminée")
            # Display metadata if available
            try:
                carbon = getattr(response, "carbon", None)
                if carbon is not None:
                    st.metric(label="Émissions estimées (kgCO2eq)", value=f"{carbon:.6f}")
            except Exception:
                pass

            # Structured JSON result
            try:
                structured = response.get_json()
                st.subheader("Résultat structuré (JSON)")
                # Show JSON inside a closed expander by default
                with st.expander("Afficher le JSON structuré", expanded=False):
                    st.json(structured)
            except Exception as e:
                st.warning(f"Impossible d'obtenir le JSON structuré: {e}")

            # Raw response for debugging
            st.subheader("Réponse brute (debug)")
            try:
                raw = getattr(response, "raw_response", None)
                if raw is None:
                    # For AlbertStructuredOutput the raw response may be stored differently
                    raw = getattr(response, "raw", None)
                with st.expander("Afficher la réponse brute (debug)", expanded=False):
                    st.code(json.dumps(raw if raw is not None else str(response), default=str, indent=2))
            except Exception as e:
                with st.expander("Afficher la réponse brute (debug)", expanded=False):
                    st.write(repr(response))

            # Offer download of structured JSON and Markdown
            try:
                if structured is not None:
                    json_bytes = json.dumps(structured, ensure_ascii=False, indent=2).encode("utf-8")
                    md_text = structured_to_markdown(structured)
                    md_bytes = md_text.encode("utf-8")

                    # Use data URI HTML links for download to avoid causing a Streamlit rerun
                    json_b64 = base64.b64encode(json_bytes).decode("ascii")
                    md_b64 = base64.b64encode(md_bytes).decode("ascii")

                    html = f"""
<div style='display:flex; gap:6px; align-items:center'>
  <a download='extraction.json' href='data:application/json;base64,{json_b64}' style='text-decoration:none'>
    <div style='background-color:#0e76a8;color:#fff;padding:6px 10px;border-radius:6px;font-weight:600;'>Télécharger JSON</div>
  </a>
  <a download='extraction.md' href='data:text/markdown;base64,{md_b64}' style='text-decoration:none'>
    <div style='background-color:#137f5b;color:#fff;padding:6px 10px;border-radius:6px;font-weight:600;'>Télécharger Markdown</div>
  </a>
</div>
"""
                    st.markdown(html, unsafe_allow_html=True)

                    # Render a prettier Markdown view below the JSON
                    try:
                        st.markdown("---")
                        st.subheader("Résultat (Markdown)")
                        st.markdown(md_text)
                    except Exception:
                        # Fallback: show raw markdown as code if rendering fails
                        st.code(md_text)
            except Exception:
                pass


# Footer
st.markdown("---")
st.markdown("🌾 **Extraction d'Aides Agricoles** - Outil d'extraction et d'analyse de documents PDF")
