from rest_framework import serializers

from .models import Demarche


class DemarcheReadSerializer(serializers.ModelSerializer):
    types_aides = serializers.SerializerMethodField()
    cibles = serializers.SerializerMethodField()
    porteurs = serializers.SerializerMethodField()
    eligibilite_geographique = serializers.SerializerMethodField()
    eligibilite_geographique_exclusions = serializers.SerializerMethodField()
    date_mise_a_jour = serializers.DateTimeField(source="date_updated")
    chainage_paiement = serializers.CharField(source="demande_de_paiement_de")

    class Meta:
        model = Demarche
        fields = (
            "code",
            "titre",
            "promesse",
            "description",
            "eligibilite",
            "url_source",
            "date_ouverture",
            "date_cloture",
            "date_mise_a_jour",
            "types_aides",
            "cibles",
            "porteurs",
            "programmes_parents",
            "eligibilite_geographique",
            "eligibilite_geographique_exclusions",
            "ciblage_naf",
            "ciblage_naf_exclusions",
            "ciblage_secteur_activite",
            "eligibilite_effectif_minimal",
            "eligibilite_effectif_maximal",
            "eligibilite_categorie_taille_entreprise",
            "eligibilite_forme_juridique",
            "eligibilite_forme_juridique_exclusions",
            "chainage_paiement",
        )

    def get_porteurs(self, obj: Demarche):
        return [
            {
                "nom": porteur.organisme.nom,
                "siren": porteur.organisme.siren,
                "roles": [role.api_repr() for role in porteur.roles],
            }
            for porteur in obj.porteur_set.all()
        ]

    def get_types_aides(self, obj: Demarche):
        return "|".join([t.api_repr() for t in obj.types_aides])

    def get_cibles(self, obj: Demarche):
        return "|".join([c.api_repr() for c in obj.cibles])

    def get_eligibilite_geographique(self, obj: Demarche):
        return "|".join(
            obj.eligibilite_geographique.all().values_list("code_cog", flat=True)
            or ["PAYS-99100"]
        )

    def get_eligibilite_geographique_exclusions(self, obj: Demarche):
        return "|".join(
            obj.eligibilite_geographique_exclusions.all().values_list(
                "code_cog", flat=True
            )
        )

    def get_eligibilite_forme_juridique(self, obj: Demarche):
        return "|".join(obj.eligibilite_forme_juridique)

    def get_eligibilite_forme_juridique_exclusions(self, obj: Demarche):
        return "|".join(obj.eligibilite_forme_juridique_exclusions)
