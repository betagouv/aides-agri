from rest_framework import serializers

from referentiel.models import Porteur

from .models import DispositifSchemaAide


class DispositifSchemaAideSerializer(serializers.ModelSerializer):
    id = serializers.CharField(source="id_externe")

    class Meta:
        model = DispositifSchemaAide
        exclude = ("source", "id_externe")

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
