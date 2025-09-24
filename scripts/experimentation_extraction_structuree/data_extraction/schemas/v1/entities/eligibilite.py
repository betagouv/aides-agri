from typing import List
from pydantic import BaseModel, Field

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