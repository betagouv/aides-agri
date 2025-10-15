"""Prompt templates for the agricultural monitoring workflow."""

from langchain.prompts import ChatPromptTemplate

# Content extraction prompt for LLM processing
CONTENT_EXTRACTION_PROMPT = ChatPromptTemplate.from_template("""
Vous êtes un expert en analyse de contenu web spécialisé dans les aides agricoles.

Votre mission est d'extraire et identifier tous les articles, annonces, ou informations à partir du contenu web suivant.

CONTENU WEB À ANALYSER:
URL: {url}
Titre de la page: {title}
Contenu: {content}

INSTRUCTIONS:
1. Analysez le contenu pour identifier tous les éléments qui pourraient être des aides agricoles
2. Pour chaque aide identifiée, extrayez les informations suivantes si disponibles:
   - Titre/nom de l'aide
   - Description ou résumé de l'aide
   - Date de publication ou de mise à jour
   - URL spécifique à cette aide (si différente de l'URL source)
    - Un score de pertinence de 1 à 10 indiquant à quel point cette aide semble pertinente vis à vis des aides agricoles. Une "aide agricole" désigne toute forme de soutien financier, matériel, fiscal ou réglementaire accordée à des acteurs du secteur agricole (exploitants, coopératives, filières agroalimentaires, etc.).

3. Ignorez:
   - Les éléments de navigation
   - Les mentions légales
   - La publicité
   - Le contenu non pertinent

SORTIE ATTENDUE:
Retournez un JSON avec la structure suivante:
{{
  "aides_identifiees": [
    {{
      "titre": "titre de l'aide",
      "description": "description courte",
      "date_publication": "date si disponible",
      "url_specifique": "URL qui pointe vers l'article. La valeur ne doit pas être identique à l'URL source.",
      "pertinence": "score de 1-10 indiquant la pertinence comme aide agricole"
    }}
  ],
  "resume": "Résumé général du contenu analysé"
}}

Si aucune aide agricole n'est trouvée, retournez une liste vide pour "aides_identifiees".
""")

# Memory filtering prompt for comparing articles
MEMORY_FILTERING_PROMPT = ChatPromptTemplate.from_template("""
Vous êtes un expert en analyse et comparaison d'articles d'aides agricoles.

Votre mission est de filtrer une liste d'articles actuellement extraits en éliminant ceux qui ont déjà été traités dans le passé.

ARTICLES ACTUELS EXTRAITS:
{current_articles}

ARTICLES DÉJÀ VUS (MÉMOIRE):
{memory_articles}

INSTRUCTIONS:
1. Comparez les articles actuels avec ceux déjà en mémoire
2. Identifiez les articles actuels qui sont NOUVEAUX (pas encore traités)
3. Considérez deux articles comme identiques si:
   - Leurs titres sont très similaires (même après normalisation)
   - Leur contenu/description semble traiter du même sujet
   - Ils proviennent de la même source

4. Soyez prudent pour éviter les faux positifs:
   - Des articles similaires mais avec des dates différentes peuvent être des mises à jour légitimes
   - Des variations mineures dans le titre peuvent indiquer des articles différents

SORTIE ATTENDUE:
Retournez un JSON avec cette structure exacte:
{{
  "articles_nouveaux": [
    {{
      "titre_aide": "titre de l'article nouveau",
      "description": "description",
      "date": "date ou null",
      "source_url": "url source",
      "raison_inclusion": "pourquoi cet article est considéré comme nouveau"
    }}
  ],
  "articles_filtres": [
    {{
      "titre_aide": "titre de l'article filtré",
      "article_similaire_en_memoire": "titre de l'article similaire trouvé en mémoire"
    }}
  ],
  "resume": "Résumé du processus de filtrage"
}}

Si aucun article en mémoire n'est fourni, retournez tous les articles actuels comme nouveaux.
""")