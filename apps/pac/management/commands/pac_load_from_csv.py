import csv
from functools import cached_property

from django.core.management.base import BaseCommand

from ...models import (
    ActeurGeographique,
    Besoin,
    IndicateurContexte,
    IndicateurMesure,
    IndicateurRealisation,
    IndicateurResultat,
    Intervention,
    TypeIntervention,
    ObjectifGenerique,
    ObjectifSpecifique,
    Organisme,
    Secteur,
)


class Command(BaseCommand):
    @cached_property
    def all_objectifs_generiques(self):
        return {obj.code: obj.pk for obj in ObjectifGenerique.objects.all()}

    @cached_property
    def all_objectifs_specifiques(self):
        return {obj.id_sfc: obj.pk for obj in ObjectifSpecifique.objects.all()}

    @cached_property
    def all_secteurs(self):
        return {obj.code: obj.pk for obj in Secteur.objects.all()}

    @cached_property
    def all_indicateurs_contexte(self):
        return {obj.code: obj.pk for obj in IndicateurContexte.objects.all()}

    @cached_property
    def all_indicateurs_realisation(self):
        return {obj.code: obj.pk for obj in IndicateurRealisation.objects.all()}

    @cached_property
    def all_indicateurs_resultat(self):
        return {obj.code: obj.pk for obj in IndicateurResultat.objects.all()}

    @cached_property
    def all_acteurs_geographiques(self):
        return {obj.code: obj.pk for obj in ActeurGeographique.objects.all()}

    @cached_property
    def all_structures_payeuses(self):
        return {obj.code_structure_payeuse: obj.pk for obj in Organisme.objects.all()}

    @cached_property
    def all_operateurs(self):
        return {obj.code: obj.pk for obj in Organisme.objects.all()}

    @cached_property
    def all_types(self):
        return {obj.code: obj.pk for obj in TypeIntervention.objects.all()}

    @cached_property
    def all_besoins(self):
        return {obj.code: obj.pk for obj in Besoin.objects.all()}

    @cached_property
    def all_interventions(self):
        return {obj.code: obj.pk for obj in Intervention.objects.all()}

    def load_organismes(self):
        print("Loading Organismes...")
        to_create = []
        with open("scripts/pac/organismes.csv") as f:
            reader = csv.reader(f)
            next(reader)
            for row in reader:
                to_create.append(
                    Organisme(
                        code_structure_payeuse=row[0],
                        code_sfc=row[3],
                        code=row[2],
                        libelle_structure_payeuse=row[1],
                        libelle=row[4],
                    )
                )
        Organisme.objects.bulk_create(to_create)
        print(f"... {len(to_create)} loaded.")

    def load_acteurs_geographiques(self):
        print("Loading Acteurs géographiques...")
        to_create = []
        with open("scripts/pac/ag.csv") as f:
            reader = csv.reader(f)
            next(reader)
            for row in reader:
                to_create.append(
                    ActeurGeographique(
                        code=row[0],
                        libelle=row[1],
                        niveau_pilotage_ue=row[2],
                    )
                )
        ActeurGeographique.objects.bulk_create(to_create)
        print(f"... {len(to_create)} loaded.")

    def load_secteurs(self):
        print("Loading Secteurs...")
        to_create = []
        with open("scripts/pac/secteurs.csv") as f:
            reader = csv.reader(f)
            next(reader)
            for row in reader:
                to_create.append(
                    Secteur(id_sfc=row[1], code_sfc=row[0], code=row[2], libelle=row[3])
                )
        Secteur.objects.bulk_create(to_create)
        print(f"... {len(to_create)} loaded.")

    def load_types_intervention(self):
        print("Loading Types d'intervention...")
        to_create = []
        with open("scripts/pac/types_inter.csv") as f:
            reader = csv.reader(f)
            next(reader)
            for row in reader:
                to_create.append(
                    TypeIntervention(
                        id_sfc=row[1],
                        code_sfc=row[0],
                        code=row[2],
                        libelle=row[7],
                        libelle_sfc=row[6],
                        forme=row[3],
                        fonds=row[5],
                        article=row[4],
                    )
                )
        TypeIntervention.objects.bulk_create(to_create)
        print(f"... {len(to_create)} loaded.")

    def load_og(self):
        print("Loading Objectifs génériques...")
        to_create = []
        with open("scripts/pac/og.csv") as f:
            reader = csv.reader(f)
            next(reader)
            for row in reader:
                to_create.append(ObjectifGenerique(code=row[0], libelle=row[1]))
        ObjectifGenerique.objects.bulk_create(to_create)
        print(f"... {len(to_create)} loaded.")

    def load_os(self):
        print("Loading Objectifs spécifiques...")
        to_create = []
        with open("scripts/pac/os.csv") as f:
            reader = csv.reader(f)
            next(reader)
            for row in reader:
                to_create.append(
                    ObjectifSpecifique(
                        id_sfc=row[2],
                        code_sfc=row[0],
                        code=row[1],
                        libelle=row[4],
                        libelle_long=row[5],
                        objectif_generique_id=self.all_objectifs_generiques[row[3]],
                    )
                )
        ObjectifSpecifique.objects.bulk_create(to_create)
        print(f"... {len(to_create)} loaded.")

    def load_besoins(self):
        print("Loading Besoins...")
        to_create = []
        with open("scripts/pac/besoins.csv") as f:
            reader = csv.reader(f)
            next(reader)
            for row in reader:
                to_create.append(
                    Besoin(
                        id_sfc=row[1],
                        code_sfc=row[0],
                        code=row[2],
                        libelle=row[5],
                        libelle_long=row[6],
                        priorite=row[3],
                        objectif_specifique_id=self.all_objectifs_specifiques[row[7]],
                    )
                )
        Besoin.objects.bulk_create(to_create)
        print(f"... {len(to_create)} loaded.")

    def load_indicateurs_realisation(self):
        print("Loading OIs...")
        to_create = dict()
        with open("scripts/pac/indicateurs_realisation.csv") as f:
            reader = csv.reader(f)
            next(reader)
            for row in reader:
                if row[0] not in to_create:
                    to_create[row[0]] = IndicateurRealisation(
                        id_sfc=row[1],
                        code_sfc=row[0],
                        code=row[2],
                        libelle=row[3],
                        type_monitoring=row[4],
                        double_compte_autorise=row[6] == "O",
                        autres_unites_planification_possibles=row[7] == "O",
                        unites=[row[9]],
                    )
                else:
                    to_create[row[0]].unites.append(row[9])

        IndicateurRealisation.objects.bulk_create(list(to_create.values()))
        print(f"... {len(to_create)} loaded.")

    def load_indicateurs_contexte(self):
        print("Loading CIs...")
        to_create = dict()
        with open("scripts/pac/indicateurs_contexte.csv") as f:
            reader = csv.reader(f)
            next(reader)
            for row in reader:
                key = f"{row[1]}-{row[6]}"
                if key not in to_create:
                    to_create[key] = IndicateurContexte(
                        id_sfc=row[0],
                        code_sfc=row[1],
                        code=row[3],
                        libelle=row[4],
                        secteur_id=self.all_secteurs[row[6]],
                        unite=row[8],
                        valeurs={row[10]: row[11]},
                    )
                else:
                    to_create[key].valeurs[row[10]] = row[11]

        IndicateurContexte.objects.bulk_create(list(to_create.values()))
        print(f"... {len(to_create)} loaded.")

    def load_indicateurs_resultat(self):
        print("Loading RIs...")
        to_create = []
        with open("scripts/pac/indicateurs_resultat.csv") as f:
            reader = csv.reader(f)
            next(reader)
            for row in reader:
                mi = IndicateurMesure.objects.create(
                    code=row[14], libelle=row[15], unite=row[17]
                )
                to_create.append(
                    IndicateurResultat(
                        id_sfc=row[1],
                        code_sfc=row[0],
                        code=row[2],
                        libelle=row[3],
                        libelle_long=row[4],
                        type_monitoring=row[5],
                        type=row[7],
                        type_calcul=row[9],
                        unite=row[11],
                        surfacique=row[13] == "Surfacique",
                        moment_collecte=row[16],
                        double_compte_autorise=row[19] == "O",
                        denominateur_id=self.all_indicateurs_contexte[row[21]]
                        if row[21]
                        else None,
                        indicateur_mesure=mi,
                    )
                )
        IndicateurResultat.objects.bulk_create(to_create)
        print(f"... {len(to_create)} loaded.")

    def load_interventions(self):
        print("Loading Interventions...")
        to_create = []
        with open("scripts/pac/inters.csv") as f:
            reader = csv.reader(f)
            next(reader)
            for row in reader:
                to_create.append(
                    Intervention(
                        code=row[0],
                        libelle=row[1],
                        niveau_pilotage_ue=row[2],
                        acteur_geographique_id=self.all_acteurs_geographiques[row[4]]
                        if row[4]
                        else None,
                        structure_payante_id=self.all_structures_payeuses[row[5]],
                        operateur_id=self.all_operateurs[row[6]],
                        forme=row[7],
                        secteur_id=self.all_secteurs[row[13]] if row[13] else None,
                        type_zone_ichn=row[16],
                        type_id=self.all_types.get(row[18], None) if row[18] else None,
                        fonds_agricole={
                            v: k for k, v in Intervention.fonds_agricole.field.choices
                        }[row[20].upper()],
                        type_soutien_ab=row[22],
                        sanctuarisation_environnement=row[24] == "O",
                        sanctuarisation_ja=row[25] == "O",
                        participation_objectif_climatique=row[26] == "O",
                        irrigation=row[27] == "O",
                        indicateur_realisation_id=self.all_indicateurs_realisation[
                            row[29]
                        ],
                    )
                )
        Intervention.objects.bulk_create(to_create)
        print(f"... {len(to_create)} loaded.")

    def load_interventions_besoins(self):
        print("Loading Interventions/Besoins relations...")
        to_create = []
        with open("scripts/pac/inters_besoins.csv") as f:
            reader = csv.reader(f)
            next(reader)
            for row in reader:
                to_create.append(
                    Intervention.besoins.through(
                        intervention_id=self.all_interventions[row[0]],
                        besoin_id=self.all_besoins[row[2]],
                    )
                )
        Intervention.besoins.through.objects.bulk_create(to_create)
        print(f"... {len(to_create)} loaded.")

    def load_interventions_indicateurs_resultat(self):
        print("Loading Interventions/IndicateurResultat relations...")
        to_create = []
        with open("scripts/pac/inters_indicateurs_resultat.csv") as f:
            reader = csv.reader(f)
            next(reader)
            for row in reader:
                if not row[4]:
                    continue
                to_create.append(
                    Intervention.indicateurs_resultat.through(
                        intervention_id=self.all_interventions[row[0]],
                        indicateurresultat_id=self.all_indicateurs_resultat[row[4]],
                    )
                )
        Intervention.indicateurs_resultat.through.objects.bulk_create(to_create)
        print(f"... {len(to_create)} loaded.")

    def handle(self, *args, **options):
        self.load_acteurs_geographiques()
        self.load_secteurs()
        self.load_organismes()
        self.load_og()
        self.load_os()
        self.load_types_intervention()
        self.load_besoins()
        self.load_indicateurs_contexte()
        self.load_indicateurs_realisation()
        self.load_indicateurs_resultat()
        self.load_interventions()
        self.load_interventions_besoins()
        self.load_interventions_indicateurs_resultat()
