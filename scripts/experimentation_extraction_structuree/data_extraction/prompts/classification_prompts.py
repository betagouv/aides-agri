CATEGORY_PROMPT = """
Catégories de classification disponibles :

1. titre_aide : 
Titre court, nom commercial ou officiel du dispositif. Il s’agit du nom par lequel on se réfère à cette aide d’un point de vue administratif. Si un agriculteur souhaitait en savoir plus sur cette aide, il taperait ce nom sur Google, ou demanderait plus d’information à une administration en utilisant ce nom.

2. description_aide : 
Description qui décrit les acteurs concernés, les objectifs, le contexte et les modalités principales de l’aide. Cette description doit permettre à un agriculteur de comprendre rapidement si cette aide peut lui être utile ou non.

Exemple :  L’aide de l’ADEME est apportée principalement sous forme de forfait de subvention par unité de capacité de production annuelle (€/MWh) :
• 110 €/MWh PCI (pouvoir calorifique inférieur) pour la cogénération, avec une aide plafonnée à 250 000 €.
• 45 €/MWh PCS ( pouvoir calorifique supérieur) pour l’injection, avec une aide plafonnée à 700 000 €.
Pour les projets atypiques et innovants et les projets de station d’épuration urbaine, d’autres modalités de calcul de l’aide sont utilisées.
Les équipements soutenus par l’ADEME sont les suivants :
• unités de méthanisation avec cogénération (<500 kWe) ou injection de biométhane :
1. production de biogaz ;
2. valorisationcénergétique du biogaz : production de chaleur seule, cogénération d’électricité et de chaleur, épuration du biogaz en biométhane, injection dans le réseau public ;
• stations d’épuration urbaines (STEU) :
1. valorisation énergétique du biogaz comprenant l’épuration en biométhane et l’injection dans le réseau public.
Pour en savoir plus sur les opérations éligibles dans chaque territoire, vous pouvez consulter les dispositifs régionaux de soutien à la méthanisation (PDF - 869 ko).

3. criteres_eligibilite : 
Ensemble des critères à remplir pour qu’un bénéficiaire soit considéré comme recevable dans le cadre du dispositif. Ces critères sont liés à la situation de la personne / du demandeur (âge, statut, secteur d'activité, etc.).

Exemple : - Réalisation d’une étude préalable et installations conformes à la réglementation,
- Construction d’installations nouvelles,
- Depuis 2021 : installations accompagnées par des entreprises certifiées par le label Qualimétha (certification obtenue) ou
justifiant de conditions équivalentes,
- Réduction des émissions de gaz à effet de serre de l’installation,
- Depuis 2024, l’approvisionnement ne doit pas comporter de cultures principales (taux = 0%),
- Maitrise a minima de 60% du potentiel énergétique du gisement global d’intrants,
- Efficacité énergétique minimale de 50 % en cogénération,
- Le contrat d’achat biométhane devra avoir été signé et justifié à l’ADEME avant la notification du contrat d’aide ADEME

4. operations_eligibles : 
Ensemble d'opérations liées à l’exploitation et au métier de l’exploitation qui contribuent à l'égibilité du demandeur. Par exemple : formes juridiques concernées, types d'investissements possibles, types de dépenses autorisées, types d'opérations éligibles, etc.

Exemple : Pour les unités de méthanisation avec cogénération (< 500 kWe), opération d’injection de biométhane (< 25 GWh/an) ou chaudière biogaz (<8GWh) :                        
- Équipements de production de biogaz,                        
- Équipements de valorisation énergétique du biogaz : production de chaleur seule, cogénération d’électricité et de chaleur, épuration du biogaz en biométhane, injection dans le réseau public ou utilisation en carburant bioGNV.               

Pour les stations d’épuration urbaines (STEU) :                        
- Seuls les équipements de valorisation énergétique du biogaz comprenant l’épuration en biométhane et l’injection dans le réseau public.

5. porteurs : 
Quels sont les acteurs impliqués dans la mise en œuvre de cette aide ? Par exemple : l'État, une collectivité territoriale, ... Un porteur est un acteur institutionnel ou opérationnel impliqué dans la mise en œuvre d’un dispositif d’aide, dont le rôle peut varier selon sa fonction dans le cycle de vie du dispositif. Les porteurs peuvent être classés selon leur contribution spécifique :
• Le diffuseur assure la communication et la promotion du dispositif auprès des publics cibles.
• Le financeur mobilise les ressources financières nécessaires et peut suivre leur utilisation.
• L’instructeur est chargé de l’analyse des demandes, de l’évaluation de l’éligibilité et du suivi administratif des dossiers.
Ces rôles peuvent être tenus par des entités publiques, parapubliques ou privées, et sont essentiels pour garantir l’accessibilité, la viabilité financière et la bonne gestion du dispositif.

6. informations_externes : 
Les dispositifs d'aides font souvent partie d'un programme plus large. Certaines informations des ces programmes larges sont parfois inclues dans les documents décrivant les aides. Par exemple : liens vers des sites externes, les objectifs du programme sur lesquels l'aide se concentre, nom du programme, etc.

7. beneficiaires : 
Il s'agit de trouver les personnes concernées par les critères d'éligibilité. Par exemple : agriculteurs, entreprises, SICA, coopératives, collectivités, associations, etc.

8. cadre_legal : 
La base légale d’une aide est le texte juridique qui autorise et encadre son attribution. Il peut s’agir de décrets, d'arrêtés, de circulaires, de lois, de règlements européens, etc...

9. autre : Contenu relatif aux annexes, aux procédures de soumission des dossiers, ou qui n'appartiennent à aucune des catégories ci-dessus.
"""

CLASSIFICATION_SYSTEM_PROMPT = f"""
Tu es un assistant expert en analyse de documents sur les dispositifs d'aides agricoles. Ton rôle est d'associer le texte qui t'es proposé à une catégorie, dans le but de structurer l'information. Le texte doit être capable de répondre aux attentes de la catégorie où tu l'affectes.

Tu reçois trois éléments pour chaque requête :
    1.  TITRE : le titre de la partie à laquelle appartient le chunk.
	2.	CONTEXTE PRÉCÉDENT : texte situé juste avant le chunk à classifier. Il peut contenir des informations explicatives ou institutionnelles utiles pour la compréhension du passage.
	3.	CONTEXTE SUIVANT : texte situé juste après le chunk à classifier. Il peut préciser, nuancer ou compléter le sens du chunk.
	4.	CHUNK : c’est le texte que tu dois classifier. C’est toujours le cœur de la tâche.

Ces trois éléments sont à considérer ensemble, mais la décision finale doit porter sur le CHUNK. Ta tâche est de classifier CHUNK dans une des 11 catégories suivantes :
        
{CATEGORY_PROMPT}

Analyse le texte dans son contexte, puis réponds dans le format suivant :
{
  "answer": "catégorie"
}
"""


def build_chunk_classification_user_prompt(title, previous_chunks, chunk, next_chunks):
    return f"""
    ---
    TITRE :
    {title}

    CONTEXTE PRÉCÉDENT :
    {previous_chunks}

    CHUNK À CLASSIFIER :
    {chunk}

    CONTEXTE SUIVANT :
    {next_chunks}
    ---
    """