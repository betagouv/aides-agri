from typing import List, Literal
from datetime import date
from pydantic import BaseModel, Field

class Porteur(BaseModel):
    nom: str = Field(..., description="Nom de l'acteur impliqué.")
    roles: List[Literal["diffuseur", "financeur", "instructeur"]] = Field(
        ...,
        description="Rôle(s) joué(s) par ce porteur dans le dispositif. Attention : La liste de rôles ne doit pas contenir 2 fois la même catégorie."
    )

class Eligibilite(BaseModel):
    criteres_eligibilite: List[str] | None = Field(
        ...,
        title="Critères d'éligibilité",
        description="""
                Ensemble des critères à remplir pour qu’une personne physique ou morale soit considéré comme recevable dans le cadre du dispositif. 
                Ces conditions peuvent concerner : 
                    - La taille du cheptel : c'est-à-dire le nombre d'animaux d'élevage qui font partie d'une exploitation agricole
                    - La taille des parcelles (en nombre d’hectares), c'est-à-dire la surface de terre dédiée à l'agriculture (culture ou élevage). Elle peut être indiquée sous le libellé “Surface agricole engagée”
                    - Le nombre de salarié ayant un contrat de travail avec l'entreprise (effectif salarié)
                    - Les labels déjà obtenus par l’exploitation. Ces labels attestent l’origine géographique, le mode de fabrication et/ou le respect de critères environnementaux et nutritionnels des produits alimentaires. Certains sont reconnus au niveau européen, d’autres à l’échelle nationale.
                        Quelques exemples de labels :
                            - L’Appellation d’origine protégée (AOP) désigne un produit dont toutes les étapes de production sont réalisées selon un savoir-faire reconnu dans une aire géographique précise, qui confère ses caractéristiques au produit.
                            - L’Appellation d’origine contrôlée (AOC) est l’équivalent national de l’AOP. Elle constitue une étape dans l'obtention du label européen AOP.
                            - L’indication géographique protégée (IGP) identifie un produit agricole, brut ou transformé, dont la qualité, la réputation ou d’autres caractéristiques sont liées à son origine géographique. L’IGP repose également sur la notion de savoir-faire. À la différence de l’AOP, une seule des étapes de production, transformation ou élaboration doit avoir lieu dans la zone concernée.
                            - Le Label Rouge est un label national. Il distingue les produits qui présentent une qualité supérieure par rapport aux produits courants similaires. Les produits alimentaires, mais aussi les produits agricoles non alimentaires peuvent obtenir le Label Rouge. Ils doivent pour cela respecter un cahier des charges et être homologués par un arrêté interministériel sur proposition de l’Inao. Le Label Rouge porte sur la notion de qualité supérieure par rapport aux autres produits similaires commercialisés. En France, cela concerne par exemple le jambon de Bayonne, le canard à foie gras du Sud-Ouest, etc.
                    - La présence en zone géographique ICHN, c'est-à-dire que la commune ou se trouve l'exploitation agricole peut bénéficier de l'aide ICHN. L’indemnité compensatoire de handicaps naturels (ICHN) est une aide qui vient soutenir les agriculteurs installés dans des territoires où les conditions de productions sont plus difficiles qu’ailleurs, du fait de contraintes naturelles ou spécifiques.
            """,
        examples = [
            "Réalisation d’une étude préalable et installations conformes à la réglementation.",
            "Construction d’installations nouvelles.",
            "Depuis 2021 : installations accompagnées par des entreprises certifiées par le label Qualimétha (certification obtenue) ou justifiant de conditions équivalentes.",
            "Réduction des émissions de gaz à effet de serre de l’installation.",
            "Depuis 2024, l’approvisionnement ne doit pas comporter de cultures principales (taux = 0%).",
            "Maîtrise a minima de 60% du potentiel énergétique du gisement global d’intrants.",
            "Efficacité énergétique minimale de 50 % en cogénération.",
            "Le contrat d’achat biométhane devra avoir été signé et justifié à l’ADEME avant la notification du contrat d’aide ADEME."
        ]

    )

    operation_eligible: List[str] | None = Field(
        ...,
        title="Opération éligible",
        description="""
                Projet ou installation pouvant bénéficier d’une aide, défini par trois critères principaux :
                    1. Type d’activité : production ou valorisation (ex. méthanisation, cogénération, injection de biométhane, valorisation en chaleur).
                    2. Équipements concernés : dispositifs techniques explicitement listés dans le dispositif (ex. unités de méthanisation, chaudières biogaz, systèmes d’épuration et d’injection).
                    3. Seuils applicables : limites de puissance, capacité ou volume fixées par la réglementation (ex. < 500 kWe, < 25 GWh/an, < 8 GWh/an).
            """,
        examples = [
            """Pour les unités de méthanisation avec cogénération (< 500 kWe), opération d’injection de biométhane (< 25 GWh/an) ou chaudière biogaz (<8GWh) :                        
                - Équipements de production de biogaz,                        
                - Équipements de valorisation énergétique du biogaz : production de chaleur seule, cogénération d’électricité et de chaleur, épuration du biogaz en biométhane, injection dans le réseau public ou utilisation en carburant bioGNV.
            """,

            """
            Pour les stations d’épuration urbaines (STEU) :                        
                - Seuls les équipements de valorisation énergétique du biogaz comprenant l’épuration en biométhane et l’injection dans le réseau public.
            """
        ]

    )

    operation_non_eligible: List[str] | None = Field(
        ...,
        title="Opération non éligible",
        description="""
                Une opération non éligible est un projet ou une installation qui ne peut pas bénéficier du dispositif d’aide, car elle sort du périmètre technique, réglementaire ou financier défini. Cela recouvre notamment :
                    1. Des activités ou équipements exclus du champ du dispositif
                        ◦ Exemple : équipements de production de biogaz sur certaines stations d’épuration urbaines.
                    2. Des projets réalisés sur des sites non concernés
                        ◦ Exemple : production et valorisation de biogaz sur une installation de stockage de déchets non dangereux.
                    3. Des projets dépassant les seuils autorisés
                        ◦ Exemple : méthanisation industrielle en chaudière de grande capacité (> 8 GWh/an) ou projets de cogénération/injection de très grande taille.
                    4. Des projets couverts par d’autres dispositifs de soutien
                        ◦ Exemple : installations déjà éligibles à un complément de rémunération dans le cadre des appels d’offres de la Commission de régulation de l’énergie (CRE).
            """,
        examples = [
            "Stations d’épuration urbaines (STEU) : les équipements de production de biogaz.",
            "Production et valorisation de biogaz sur une installation de stockage de déchets non dangereux (ISDND).",
            "Projets de méthanisation industrielle en chaudière > 8GWh (AAP BCIAT).",
            "Production et valorisation de biogaz consécutive à un traitement mécano-biologique des ordures ménagères ne faisant pas l’objet d’une collecte séparée.",
            "Les projets éligibles à un complément de rémunération dans le cadre des appels d’offres de la Commission de Régulation de l’Énergie (CRE) ne sont pas éligibles aux aides de l’ADEME (cogénération > 500 kWe et injection > 25GWh)."
        ]


    )

class EligibiliteGeographique(BaseModel):
    """
    Couverture géographique de l’aide : zones éligibles et exclusions éventuelles. Une zone géographique peut être :
    Ça peut être :
        - Le pays entier (France). Il s’agit de la plus large unité géographique et administrative. La France est composée de régions, départements, communes et autres subdivisions administratives.
        - une région. C’est la granularité intermédiaire entre le pays et le département.
        - un département. C’est la granularité intermédiaire entre la région et la commune. Chaque département est associé à un nombre unique entre 01 et 95 pour la France métropolitaine, et les départements d’outre-mer disposent de numéros spécifiques à trois chiffres (971 à 976).
        - un établissement public de coopération intercommunale (EPCI). C’est une structure administrative qui regroupe plusieurs communes. C’est le niveau intermédiaire entre le département et la commune.
        - une commune. C’est la plus petite division administrative. Des mots équivalents sont ville, village, métropole, bourg, agglomération.

        Voici une liste des régions et des départements : 
        France
        │
        ├─ Auvergne-Rhône-Alpes
        │   ├─ Ain (01)
        │   ├─ Allier (03)
        │   ├─ Ardèche (07)
        │   ├─ Cantal (15)
        │   ├─ Drôme (26)
        │   ├─ Isère (38)
        │   ├─ Loire (42)
        │   ├─ Haute-Loire (43)
        │   ├─ Puy-de-Dôme (63)
        │   ├─ Rhône (69)
        │   ├─ Savoie (73)
        │   └─ Haute-Savoie (74)
        │
        ├─ Bourgogne-Franche-Comté
        │   ├─ Côte-d'Or (21)
        │   ├─ Doubs (25)
        │   ├─ Jura (39)
        │   ├─ Nièvre (58)
        │   ├─ Haute-Saône (70)
        │   ├─ Saône-et-Loire (71)
        │   ├─ Yonne (89)
        │   └─ Territoire de Belfort (90)
        │
        ├─ Bretagne
        │   ├─ Côtes-d’Armor (22)
        │   ├─ Finistère (29)
        │   ├─ Ille-et-Vilaine (35)
        │   └─ Morbihan (56)
        │
        ├─ Centre-Val de Loire
        │   ├─ Cher (18)
        │   ├─ Eure-et-Loir (28)
        │   ├─ Indre (36)
        │   ├─ Indre-et-Loire (37)
        │   ├─ Loir-et-Cher (41)
        │   └─ Loiret (45)
        │
        ├─ Corse
        │   ├─ Corse-du-Sud (2A)
        │   └─ Haute-Corse (2B)
        │
        ├─ Grand Est
        │   ├─ Ardennes (08)
        │   ├─ Aube (10)
        │   ├─ Marne (51)
        │   ├─ Haute-Marne (52)
        │   ├─ Meurthe-et-Moselle (54)
        │   ├─ Meuse (55)
        │   ├─ Moselle (57)
        │   ├─ Bas-Rhin (67)
        │   ├─ Haut-Rhin (68)
        │   └─ Vosges (88)
        │
        ├─ Hauts-de-France
        │   ├─ Aisne (02)
        │   ├─ Nord (59)
        │   ├─ Oise (60)
        │   ├─ Pas-de-Calais (62)
        │   └─ Somme (80)
        │
        ├─ Île-de-France
        │   ├─ Paris (75)
        │   ├─ Seine-et-Marne (77)
        │   ├─ Yvelines (78)
        │   ├─ Essonne (91)
        │   ├─ Hauts-de-Seine (92)
        │   ├─ Seine-Saint-Denis (93)
        │   ├─ Val-de-Marne (94)
        │   └─ Val-d’Oise (95)
        │
        ├─ Normandie
        │   ├─ Calvados (14)
        │   ├─ Eure (27)
        │   ├─ Manche (50)
        │   ├─ Orne (61)
        │   └─ Seine-Maritime (76)
        │
        ├─ Nouvelle-Aquitaine
        │   ├─ Charente (16)
        │   ├─ Charente-Maritime (17)
        │   ├─ Corrèze (19)
        │   ├─ Creuse (23)
        │   ├─ Dordogne (24)
        │   ├─ Gironde (33)
        │   ├─ Landes (40)
        │   ├─ Lot-et-Garonne (47)
        │   ├─ Pyrénées-Atlantiques (64)
        │   ├─ Deux-Sèvres (79)
        │   ├─ Vienne (86)
        │   └─ Haute-Vienne (87)
        │
        ├─ Occitanie
        │   ├─ Ariège (09)
        │   ├─ Aude (11)
        │   ├─ Aveyron (12)
        │   ├─ Gard (30)
        │   ├─ Haute-Garonne (31)
        │   ├─ Gers (32)
        │   ├─ Hérault (34)
        │   ├─ Lot (46)
        │   ├─ Lozère (48)
        │   ├─ Hautes-Pyrénées (65)
        │   ├─ Pyrénées-Orientales (66)
        │   ├─ Tarn (81)
        │   └─ Tarn-et-Garonne (82)
        │
        ├─ Pays de la Loire
        │   ├─ Loire-Atlantique (44)
        │   ├─ Maine-et-Loire (49)
        │   ├─ Mayenne (53)
        │   ├─ Sarthe (72)
        │   └─ Vendée (85)
        │
        ├─ Provence-Alpes-Côte d’Azur
        │   ├─ Alpes-de-Haute-Provence (04)
        │   ├─ Hautes-Alpes (05)
        │   ├─ Alpes-Maritimes (06)
        │   ├─ Bouches-du-Rhône (13)
        │   ├─ Var (83)
        │   └─ Vaucluse (84)
        │
        ├─ Guadeloupe (971)
        ├─ Guyane (973)
        ├─ La Réunion (974)
        ├─ Martinique (972)
        └─ Mayotte (976)

    """
    zones_eligibles: str | None = Field(
        None,
        title="Zones géographiques éligibles",
        description="Les zones géographiques éligibles à l'aide.",
        examples=[
            "région Auvergne Rhône-Alpes", 
            "département des Hautes-Alpes",
            "ville de Caen",
        ]
    )
    zones_exclues: str | None = Field(
        None,
        title="Zones géographiques exclues",
        description="Aires géographiques exclues du dispositif.",
        examples=[
            "région Auvergne Rhône-Alpes", 
            "département des Hautes-Alpes",
            "ville de Caen",
        ]
    )

class DispositifAide(BaseModel):

    """
    Un dispositif d’aide agricole est un cadre mis en place par les pouvoirs publics ou par des organismes habilités pour soutenir financièrement ou techniquement les acteurs du secteur agricole. 
    Il repose sur des règles précises (conditions d’éligibilité, critères techniques, plafonds financiers, obligations de suivi) et vise à :
        - Encourager certains investissements ou pratiques (modernisation des exploitations, développement des énergies renouvelables, transition agroécologique).
        - Compenser des contraintes ou des surcoûts liés à la réglementation, aux crises sanitaires ou aux fluctuations économiques.
        - Orienter le développement agricole vers des objectifs collectifs (durabilité, souveraineté alimentaire, réduction des émissions de gaz à effet de serre, protection de la biodiversité).
    Les dispositifs d’aide agricole peuvent prendre différentes formes : subventions directes, prêts bonifiés, exonérations fiscales, aides à l’investissement, paiements compensatoires ou encore accompagnement technique.
    """

    titre: str = Field(
        ...,
        title="Titre",
        description="Titre court, nom commercial ou officiel du dispositif. Il s’agit du nom par lequel on se réfère à cette aide d’un point de vue administratif. Si un agriculteur souhaitait en savoir plus sur cette aide, il taperait ce nom sur Google, ou demanderait plus d’information à une administration en utilisant ce nom.",
        max_length=200,
        examples=["Accélérateur décarbonation", "TPE gagnantes sur tous les coûts", "Agri’écoute"]
    )

    description: str = Field(
        ...,
        title="Description",
        description="Description juridique et exacte du dispositif mis en place.",
        max_length=5000,
        examples=[
            """
             L’aide de l’ADEME est apportée principalement sous forme de forfait de subvention par unité de capacité de production annuelle (€/MWh) :
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
            """,

            """
                Votre CCI vous propose une prestation  d’accompagnement sur mesure pour :                
                    • Répondre aux obligations légales,                
                    • Réaliser votre plan de mobilité : diagnostic, enquête, plan d’actions,                
                    • Mettre en place des actions : ateliers thématiques, planning de déploiement des actions, sélection des prestataires et leur suivi,...            Vous pouvez réaliser votre Plan de mobilité dans sa totalité avec nous ou chaque étape individuellement. Le contenu de l’accompagnement peut être adapté à chaque situation.
            """
        ]
    )

    eligibilite: Eligibilite | None = Field(
        ...,
        title="Eligibilité de l'aide",
        description="Qui peut accéder au dispositif d'aide ? Quel projets sont ou ne sont pas éligibles ?",
    )

    types_aides: List[
        Literal[
            "assistance",
            "avantage fiscal",
            "conseil",
            "étude",
            "financement",
            "formation",
            "information",
            "prêt"
        ] | None
    ] = Field(
        ...,
        description="""
        Types d'aides disponibles via le dispositif décrit. Chaque aide appartient à une des catégories suivantes :
          - assistance : services de remplacement, cellule d'écoute. 
          - avantage fiscal : crédits d'impôt, réduction d'impôt et autres allégements
          - conseil : accompagnement, échange avec un expert, ingenieurie
          - étude : diagnostic, accompagnement, étude faisabilité
          - financement : subvention, co-financement, participation financière à votre projet
          - formation : montée en compétences pour le/la chef d'entreprise ou les salariés
          - information : légales, administratives
          - prêt : prêt, garantie par un acteur public
          Attention : La liste ne doit pas contenir 2 fois la même catégorie.
        """,
        examples=[["financement", "formation"]]
    )

    porteurs: List[Porteur] | None = Field(
        ...,
        title="Porteurs",
        description="Liste des acteurs impliqués dans la mise en œuvre du dispositif et leurs rôles.",
        examples=[
            [{"nom": "ADEME", "roles": ["instructeur"]},
             {"nom": "BPIFRANCE (BPIFRANCE)", "roles": ["financeur"]}]
        ]
    )

    programmes_parents: str | None = Field(
        ...,
        title="Programmes parents et régime d'aides",
        description="""
            La plupart des dispositifs d’aides aux agriculteurs font partie d’une initiative globale, que l’on appelle un programme. Le programme parent est le nom du programme auquel appartient un dispositif. 
            Par exemple : L’aide de l’ADEME fait partie du programme Fonds Chaleur. Le programme parent de l’aide ADEME est alors “Fonds Chaleur”.
            Ces programmes disposent d’un budget défini par des politiques publiques pour atteindre, de différentes manières, un objectif global (la relance économique, la baisse des émissions de gaz à effet de serre, etc.). 
        """,
        examples=[
            "Fonds Chaleur",
            "Fonds vert 2024",
            "Action cœur de ville (2018-2022)",
            "UE - Europe Créative 2021-2027",
            "Territoires d'industrie"
        ]
    )

    url_source: str | None = Field(
        ...,
        title="URL Source",
        description="Lien permettant d'obtenir plus d'informations sur le dispositif.",
        examples=["https://agirpourlatransition.ademe.fr/entreprises/aides-financieres/2023/audit-energetique-industrie"],
        pattern=r"^https?://[^\s]+$"
    )

    cibles: List[str] | None = Field(
        ...,
        title="Bénéficiaires",
        description="""
            Détermine à quels types d’agriculteurs cette aide est destinée. 
            S’agit-il de tous les agriculteurs en activité, y a-t-il une limite d’âge pour l’agriculteur, une tranche d’âge pour son exploitation ? 
            Ou bien l’aide est-elle réservée aux agriculteurs regroupés en coopératives (Cuma, SCA, SICA) ou d’autres formes de regroupements (ASA, GIEE) ?
        """,
        examples=[
            ["associations"],
            ["agriculteurs", "coopératives"],
            ["SICA"]
        ]
    )

    eligibilite_geographique: EligibiliteGeographique | None = Field(
        ...,
        title="Couverture géographique de l’aide",
        description="Les zones géographiques éligibles ou non à l'aide",
    )

    date_ouverture: date | None = Field(
        ...,
        title="Date d’ouverture",
        description="Date d'ouverture du dispositif d'aides.",
        examples=["2025-10-15T15:00:00Z"]
    )

    date_cloture: date | None = Field(
        ...,
        title="Date de fin",
        description="Date de clôture du dispositif d'aides.",
        examples=["2025-10-15T15:00:00Z"]
    )

