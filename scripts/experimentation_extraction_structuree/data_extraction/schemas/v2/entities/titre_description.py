from pydantic import BaseModel, Field

class PresentationAide(BaseModel):

    titre_aide: str = Field(
        ...,
        title="Titre",
        description="Titre court, nom commercial ou officiel du dispositif. Il s’agit du nom par lequel on se réfère à cette aide d’un point de vue administratif. Si un agriculteur souhaitait en savoir plus sur cette aide, il taperait ce nom sur Google, ou demanderait plus d’information à une administration en utilisant ce nom.",
        max_length=200,
        #examples=["Accélérateur décarbonation", "TPE gagnantes sur tous les coûts", "Agri’écoute"]
    )

    description_aide: str = Field(
        ...,
        title="Description",
        description="Description juridique et exacte du dispositif mis en place.",
        max_length=5000,
        # examples=[
        #     """
        #      L’aide de l’ADEME est apportée principalement sous forme de forfait de subvention par unité de capacité de production annuelle (€/MWh) :
        #         • 110 €/MWh PCI (pouvoir calorifique inférieur) pour la cogénération, avec une aide plafonnée à 250 000 €.
        #         • 45 €/MWh PCS ( pouvoir calorifique supérieur) pour l’injection, avec une aide plafonnée à 700 000 €.
        #     Pour les projets atypiques et innovants et les projets de station d’épuration urbaine, d’autres modalités de calcul de l’aide sont utilisées.
        #     Les équipements soutenus par l’ADEME sont les suivants :
        #         • unités de méthanisation avec cogénération (<500 kWe) ou injection de biométhane :
        #             1. production de biogaz ;
        #             2. valorisationcénergétique du biogaz : production de chaleur seule, cogénération d’électricité et de chaleur, épuration du biogaz en biométhane, injection dans le réseau public ;
        #         • stations d’épuration urbaines (STEU) :
        #             1. valorisation énergétique du biogaz comprenant l’épuration en biométhane et l’injection dans le réseau public.
        #     Pour en savoir plus sur les opérations éligibles dans chaque territoire, vous pouvez consulter les dispositifs régionaux de soutien à la méthanisation (PDF - 869 ko).
        #     """
        # ]
    )