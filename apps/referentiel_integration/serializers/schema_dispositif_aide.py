import reversion
from django.core.exceptions import ValidationError
from django.core.validators import validate_email, URLValidator
from rest_framework import serializers, fields

from referentiel.models import Porteur

from ..models.schema_dispositif_aide import RawDemarcheSchemaDispositifAide


class RawDemarcheSchemaDispositifAideSerializer(serializers.ModelSerializer):
    id = serializers.CharField(source="id_externe")

    class Meta:
        model = RawDemarcheSchemaDispositifAide
        exclude = ("source", "status", "demarche", "id_externe")

    def __init__(self, data=fields.empty, source: str = "", **kwargs):
        super().__init__(data=data, **kwargs)
        assert source != "", (
            "RawDemarcheSchemaAideSerializer must be instantiated with a source kwarg"
        )
        self.source = source
        if data is not fields.empty and self.is_valid():
            try:
                self.instance = RawDemarcheSchemaDispositifAide.objects.get(
                    source=source, id_externe=self.validated_data["id_externe"]
                )
            except RawDemarcheSchemaDispositifAide.DoesNotExist:
                pass

    def save(self, **kwargs):
        kwargs["source"] = self.source
        with reversion.create_revision():
            super().save(**kwargs)

    def _validate_list_of_dicts(self, value, dict_keys: set) -> list[dict]:
        if not isinstance(value, list):
            raise serializers.ValidationError("Ce champ doit être une liste JSON")
        for json_obj in value:
            if not isinstance(json_obj, dict):
                raise serializers.ValidationError(
                    "Les éléments de la liste JSON de ce champ doivent être des objets JSON"
                )
            else:
                if set(json_obj.keys()) != dict_keys:
                    raise serializers.ValidationError(
                        "Les éléments de la liste JSON de ce champ doivent avoir pour attributs [nom, siren, roles]"
                    )
        return value

    def validate_porteurs(self, value):
        value = self._validate_list_of_dicts(value, {"nom", "siren", "roles"})
        valid_roles = [r.api_repr() for r in Porteur.Role]
        for json_obj in value:
            if not json_obj["nom"]:
                raise serializers.ValidationError(
                    "L’attribut nom des éléments de la liste JSON de ce champ ne peut être vide"
                )
            if not isinstance(json_obj["roles"], list):
                raise serializers.ValidationError(
                    "L’attribut roles des éléments de la liste JSON de ce champ doit être une liste"
                )
            elif any((raw_role not in valid_roles for raw_role in json_obj["roles"])):
                raise serializers.ValidationError(
                    f"Les valeurs possibles pour l’attribut roles des éléments de la liste JSON de ce champ sont {valid_roles}"
                )
        return value

    def validate_referents_internes(self, value):
        value = self._validate_list_of_dicts(value, {"nom", "mail", "telephone"})
        for json_obj in value:
            if not json_obj["nom"]:
                raise serializers.ValidationError(
                    "L’attribut nom des éléments de la liste JSON de ce champ ne peut être vide"
                )
            if not json_obj["mail"] and not json_obj["telephone"]:
                raise serializers.ValidationError(
                    "L’un des attributs mail ou telephone des éléments de la liste JSON de ce champ ne peut être vide"
                )
            if json_obj["mail"]:
                try:
                    validate_email(json_obj["mail"])
                except ValidationError:
                    raise serializers.ValidationError(
                        "L’attribut mail des éléments de la liste JSON de ce champ doit contenir une adresse e-mail"
                    )
        return value

    def validate_bases_juridiques(self, value):
        value = self._validate_list_of_dicts(value, {"libelle", "lien"})
        for json_obj in value:
            if not json_obj["libelle"]:
                raise serializers.ValidationError(
                    "L’attribut libelle des éléments de la liste JSON de ce champ ne peut être vide"
                )
            if not json_obj["lien"]:
                raise serializers.ValidationError(
                    "L’attribut lien des éléments de la liste JSON de ce champ ne peut être vide"
                )
            try:
                URLValidator(json_obj["lien"])
            except ValidationError:
                raise serializers.ValidationError(
                    "L’attribut lien des éléments de la liste JSON de ce champ doit contenir une URL"
                )
