import reversion
from rest_framework import serializers, fields

from referentiel.models import Porteur

from .models import RawDemarcheSchemaAide


class RawDemarcheSchemaAideSerializer(serializers.ModelSerializer):
    id = serializers.CharField(source="id_externe")

    class Meta:
        model = RawDemarcheSchemaAide
        exclude = ("source", "status", "demarche", "id_externe")

    def __init__(self, data=fields.empty, source: str = "", **kwargs):
        super().__init__(data=data, **kwargs)
        assert source != "", (
            "RawDemarcheSchemaAideSerializer must be instantiated with a source kwarg"
        )
        self.source = source
        if data is not fields.empty and self.is_valid():
            try:
                self.instance = RawDemarcheSchemaAide.objects.get(
                    source=source, id_externe=self.validated_data["id_externe"]
                )
            except RawDemarcheSchemaAide.DoesNotExist:
                pass

    def save(self, **kwargs):
        kwargs["source"] = self.source
        with reversion.create_revision():
            super().save(**kwargs)

    def validate_porteurs(self, value):
        if not isinstance(value, list):
            raise serializers.ValidationError("Ce champ doit être une liste JSON")
        valid_roles = [r.api_repr() for r in Porteur.Role]
        for json_obj in value:
            if not isinstance(json_obj, dict):
                raise serializers.ValidationError(
                    "Les éléments de la liste JSON de ce champ doivent être des objets JSON"
                )
            else:
                if set(json_obj.keys()) != {"nom", "siren", "roles"}:
                    raise serializers.ValidationError(
                        "Les éléments de la liste JSON de ce champ doivent avoir pour attributs [nom, siren, roles]"
                    )
                else:
                    if not json_obj["nom"]:
                        raise serializers.ValidationError(
                            "L’attribut nom des éléments de la liste JSON de ce champ ne peut être vide"
                        )
                    if not isinstance(json_obj["roles"], list):
                        raise serializers.ValidationError(
                            "L’attribut roles des éléments de la liste JSON de ce champ doit être une liste"
                        )
                    elif any(
                        (raw_role not in valid_roles for raw_role in json_obj["roles"])
                    ):
                        raise serializers.ValidationError(
                            f"Les valeurs possibles pour l’attribut roles des éléments de la liste JSON de ce champ sont {valid_roles}"
                        )
        return value
