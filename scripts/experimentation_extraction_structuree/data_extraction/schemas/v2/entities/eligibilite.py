from typing import List
from pydantic import BaseModel, Field

class Eligibilite(BaseModel):
    criteres_eligibilite: List[str] | None = Field(
        ...,
        title="Critères d'éligibilité",
        description="""
                Ensemble des critères à remplir pour qu’un bénéficiaire soit considéré comme recevable dans le cadre du dispositif.
            """,
        # examples = [
        #     "Réalisation d’une étude préalable et installations conformes à la réglementation.",
        #     "Construction d’installations nouvelles.",
        #     "Depuis 2021 : installations accompagnées par des entreprises certifiées par le label Qualimétha (certification obtenue) ou justifiant de conditions équivalentes.",
        # ]

    )

    operation_eligible: List[str] | None = Field(
        ...,
        title="Opération éligible",
        # description="""
        #         Projet, action ou installation pouvant bénéficier d’une aide, défini par trois critères principaux :
        #             1. Type d’activité : production ou valorisation (ex. méthanisation, cogénération, injection de biométhane, valorisation en chaleur).
        #             2. Équipements concernés : dispositifs techniques explicitement listés dans le dispositif (ex. unités de méthanisation, chaudières biogaz, systèmes d’épuration et d’injection).
        #             3. Seuils applicables : limites de puissance, capacité ou volume fixées par la réglementation (ex. < 500 kWe, < 25 GWh/an, < 8 GWh/an).
        #     """,
        # examples = [
        #     """Pour les unités de méthanisation avec cogénération (< 500 kWe), opération d’injection de biométhane (< 25 GWh/an) ou chaudière biogaz (<8GWh) :                        
        #         - Équipements de production de biogaz,                        
        #         - Équipements de valorisation énergétique du biogaz : production de chaleur seule, cogénération d’électricité et de chaleur, épuration du biogaz en biométhane, injection dans le réseau public ou utilisation en carburant bioGNV.
        #     """
        # ]

    )

    operation_non_eligible: List[str] | None = Field(
        ...,
        title="Opération non éligible",
        # description="""
        #         Une opération non éligible est un projet, une action ou une installation qui ne peut pas bénéficier du dispositif d’aide, car elle sort du périmètre technique, réglementaire ou financier défini.
        #     """,
        # examples = [
        #     "Stations d’épuration urbaines (STEU) : les équipements de production de biogaz.",
        #     "Production et valorisation de biogaz sur une installation de stockage de déchets non dangereux (ISDND).",
        # ]


    )