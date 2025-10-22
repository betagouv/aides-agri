# Classification de Chunks PDF

Application Streamlit pour analyser des PDFs, les découper en chunks basés sur leur structure hiérarchique, et classifier chaque chunk dans des catégories prédéfinies.

## 🎯 Fonctionnalités

- **Upload de PDF** : Chargez vos documents PDF via glisser-déposer
- **Parsing automatique** : Utilise Docling pour extraire et structurer le contenu en markdown
- **Chunking hiérarchique** : Découpe le document en sections basées sur les titres (# , ##, ###, etc.)
- **Classification intelligente** : Utilise Albert LLM pour classifier chaque chunk dans des catégories
- **Context-aware** : Prend en compte les chunks précédents et suivants pour une meilleure classification
- **Visualisation** : Affiche les résultats par chunk ou regroupés par catégorie

## 📋 Prérequis

- Python 3.8+
- Clé API Albert (variable d'environnement `ALBERT_API_KEY`)
- Accès à Langfuse avec un prompt nommé "Classification"

## 🚀 Installation

1. Assurez-vous d'être dans le bon répertoire :
```bash
cd scripts/experimentation_extraction_structuree
```

2. Installez les dépendances (si nécessaire) :
```bash
pip install streamlit docling python-dotenv langfuse pydantic
```

3. Configurez vos variables d'environnement dans un fichier `.env` :
```
ALBERT_API_KEY=your_api_key_here
LANGFUSE_SECRET_KEY=your_langfuse_key
LANGFUSE_PUBLIC_KEY=your_langfuse_public_key
LANGFUSE_HOST=your_langfuse_host
```

## 💻 Utilisation

### Lancer l'application

```bash
streamlit run classification_app.py
```

### Utiliser l'interface

1. **Configuration (sidebar)** :
   - Choisissez le modèle Albert (small ou large)
   - Ajustez la température (0.0 = déterministe, 1.0 = créatif)
   - Définissez la taille de la fenêtre contextuelle

2. **Upload & Traitement** :
   - Glissez-déposez un fichier PDF
   - Cliquez sur "Analyser et Classifier"
   - Attendez que le traitement se termine

3. **Visualisation** :
   - **Résultats Détaillés** : Voir tous les chunks avec leurs classifications
   - **Vue par Catégorie** : Voir les chunks regroupés par catégorie

## 📦 Modules créés

### `pdf_chunker.py`
Classe `HierarchicalPDFChunker` pour :
- Parser les PDFs avec Docling
- Convertir en markdown
- Découper en chunks basés sur les titres hiérarchiques
- Fournir des fenêtres de contexte

**Exemple d'utilisation** :
```python
from pdf_chunker import HierarchicalPDFChunker

chunker = HierarchicalPDFChunker()
chunks = chunker.chunk_file("mon_document.pdf")

for chunk in chunks:
    print(f"Titre: {chunk['title']}")
    print(f"Contenu: {chunk['content']}")
```

### `chunk_classifier.py`
Classe `ChunkClassifier` pour :
- Classifier des chunks avec Albert LLM
- Utiliser Langfuse pour la gestion des prompts
- Fournir du contexte (chunks précédents/suivants)
- Grouper les résultats par catégorie

**Exemple d'utilisation** :
```python
from chunk_classifier import ChunkClassifier

classifier = ChunkClassifier(
    model_name="albert-small",
    temperature=0.2
)

# Classifier un seul chunk
result = classifier.classify_chunk(
    chunk="Contenu du chunk",
    title="Titre",
    previous_chunks="Contexte précédent",
    next_chunks="Contexte suivant"
)

print(f"Catégorie: {result['categorie']}")

# Classifier plusieurs chunks
classified = classifier.classify_chunks(chunks, window_size=2)
grouped = classifier.group_by_category(classified)
```

### `classification_app.py`
Application Streamlit complète combinant le chunker et le classifier avec :
- Interface utilisateur intuitive
- Upload de fichiers
- Barre de progression
- Visualisation multi-onglets
- Métriques et statistiques

## 🔧 Catégories de classification

Les catégories dépendent de votre prompt Langfuse "Classification". Exemples typiques :
- `presentation_aide` : Présentation générale de l'aide
- `eligibilite` : Conditions d'éligibilité
- `operations_eligibles` : Opérations et dépenses éligibles
- `beneficiaires` : Bénéficiaires cibles
- `type_aide` : Types d'aides financières
- `dates` : Dates d'ouverture/fermeture
- `autre` : Autres informations

## 🛠️ Architecture

```
classification_app.py          # Application Streamlit principale
├── pdf_chunker.py            # Module de parsing et chunking
│   └── HierarchicalPDFChunker
└── chunk_classifier.py       # Module de classification
    └── ChunkClassifier
```

## 📝 Notes

- Le parsing peut prendre du temps pour de gros PDFs
- La classification est séquentielle (1 chunk à la fois) pour des raisons de qualité
- Les fichiers temporaires sont automatiquement nettoyés après traitement
- Ajustez `window_size` selon vos besoins de contexte (recommandé : 2-3)

## 🐛 Debugging

Si vous rencontrez des problèmes :

1. Vérifiez que votre clé API Albert est correcte
2. Assurez-vous que le prompt "Classification" existe dans Langfuse
3. Vérifiez les logs dans le terminal où Streamlit est lancé
4. Testez d'abord avec un petit PDF

## 🤝 Contribution

Pour améliorer l'application :
- Ajoutez de nouvelles catégories dans votre prompt Langfuse
- Personnalisez les styles CSS dans `classification_app.py`
- Ajoutez des exports (JSON, CSV, etc.)
- Implémentez le traitement par batch

---

🌾 **Aides Agricoles** - BetagOuv
