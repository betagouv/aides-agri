from rest_framework import serializers

from .models import DemarcheAgricole


class DemarcheReadSerializer(serializers.ModelSerializer):
    types_aides = serializers.SerializerMethodField()
    cibles = serializers.SerializerMethodField()
    porteurs_aides = serializers.SerializerMethodField()
    eligibilite_geographique = serializers.SerializerMethodField()
    eligibilite_geographique_exclusions = serializers.SerializerMethodField()

    class Meta:
        model = DemarcheAgricole
        fields = (
            "code",
            "titre",
            "promesse",
            "description",
            "eligibilite",
            "url_source",
            "date_ouverture",
            "date_cloture",
            "types_aides",
            "cibles",
            "porteurs_aides",
            "programmes_parents",
            "eligibilite_geographique",
            "eligibilite_geographique_exclusions",
        )

    def get_porteurs_aides(self, obj: DemarcheAgricole):
        return [
            {
                "nom": porteur.organisme.nom,
                "siren": porteur.organisme.siren,
                "roles": [role.api_repr() for role in porteur.roles],
            }
            for porteur in obj.porteur_set.all()
        ]

    def get_types_aides(self, obj: DemarcheAgricole):
        return "|".join([t.api_repr() for t in obj.types_aides])

    def get_cibles(self, obj: DemarcheAgricole):
        return "|".join([c.api_repr() for c in obj.cibles])

    def get_eligibilite_geographique(self, obj: DemarcheAgricole):
        return "|".join(
            obj.eligibilite_geographique.all().values_list("code_cog", flat=True)
            or ["PAYS-99100"]
        )

    def get_eligibilite_geographique_exclusions(self, obj: DemarcheAgricole):
        return "|".join(
            obj.eligibilite_geographique_exclusions.all().values_list(
                "code_cog", flat=True
            )
        )
