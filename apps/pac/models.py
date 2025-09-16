from django.contrib.postgres import fields as postgres_fields
from django.db import models


class FondsAgricole(models.TextChoices):
    FEADER = "332", "FEADER"
    FEAGA = "333", "FEAGA"


class NiveauPilotageUE(models.TextChoices):
    NDR = "NDR", "National avec éléments régionaux"
    NAT = "NAT", "National"
    REG = "REG", "Régional"
    T = "T", "Transnational"


class TypeSoutien(models.TextChoices):
    IF = "IF", "Instrument financier"
    SUB = "SUB", "Subvention"


class TypeSoutienAB(models.TextChoices):
    CONVERSION = "CAB", "Soutien à la conversion en AB"
    MAINTIEN = "MAB", "Soutien au maintien en AB"


class TypeZoneICHN(models.TextChoices):
    MO = "MO", "Zones de montagne"
    CN = "CN", "ZSCN - zone à contraintes naturelles importantes"
    CS = "CS", "ZSCS - Zones à contraintes spécifiques"


class TypeProduitFinancier(models.TextChoices):
    PRET = "1", "Prêt"
    GARANTIE = "2", "Garantie"
    PARTICIPATION = "3", "Prise de participation"
    QUASI_PARTICIPATION = "4", "Quasi-participation"


class FormeIntervention(models.TextChoices):
    DPdecoupled = "DPdecoupled", "Paiements directs découplés"
    DPcoupled = "DPcoupled", "Paiements directs couplés"
    Sectoral = "Sectoral", "Interventions sectorielles"
    RD = "RD", "Développement rural"


class UniteIndicateur(models.TextChoices):
    Nb = "Nb", "Nombre de"
    PERCENT = "%", "Pourcentage"
    Acto = "Acto", "Actions"
    Acti = "Acti", "Activités"
    Cons = "Cons", "Conseillers"
    Ruches = "Ruches", "Ruches"
    Apic = "Apic", "Apiculteurs"
    Benef = "Benef", "Bénéficiaires"
    m3 = "m3", "Mètres cubes"
    j = "j", "Jours"
    Eqpmt = "Eqpmt", "Equipement"
    EUR = "EUR", "Euros"
    EURPERha = "EUR/ha", "Euros par hectare"
    Agri = "Agri", "Agriculteurs"
    PERCENTSurfForet = "%SurfForet", "Pourcentage de la surface forestière"
    Fonds = "Fonds", "Fonds"
    ha = "ha", "Hectares"
    Tete = "Tête", "Tête"
    hl = "hl", "Hectolitres"
    h = "h", "Heures"
    km2 = "km2", "Kilomètres carrés"
    Belevage = "Belevage", "Batiment d'élevage"
    UGB = "UGB", "Unités Gros Bétail"
    PERCENTUGB = "%UGB", "Pourcentage d’UGB"
    m = "m", "Mètres"
    ExpAgr = "ExpAgr", "Exploitations agricoles"
    MW = "MW", "Mégawatt"
    PO = "PO", "Programmes opérationnels"
    Ope = "Ope", "Opérations"
    PersCons = "PersCons", "Personnes conseillées"
    Pers = "Pers", "Personnes"
    Veg = "Veg", "Végétaux"
    ActoPrep = "ActoPrep", "Actions préparatoires LEADER"
    Prjs = "Prjs", "Projets"
    Prj = "Prj", "Projet"
    ReiAb = "ReiAb", "Reines des abeilles et abeilles"
    Ech = "Ech", "Echantillons"
    Chien = "Chien", "Chien de protection"
    Vers = "Vers", "Vers à soie"
    m2 = "m2", "Mètres carrés"
    Strat = "Strat", "Stratégies LEADER"
    TEP = "TEP", "Tonnes d’équivalent pétrole (TEP)"
    PERCENTSupTot = "%SupTot", "Pourcentage de la surface totale"
    Arbres = "Arbres", "Arbres"
    PERCENTSAU = "%SAU", "Pourcentage de SAU"


class IndicateurRealisation(models.Model):
    class TypeMonitoring(models.TextChoices):
        A = "A", "Apurement"
        S = "S", "Suivi"

    id_sfc = models.CharField()
    code_sfc = models.CharField()
    code = models.CharField()
    libelle = models.CharField()
    type_monitoring = models.CharField(choices=TypeMonitoring)
    unites = postgres_fields.ArrayField(models.CharField(choices=UniteIndicateur))
    double_compte_autorise = models.BooleanField()
    autres_unites_planification_possibles = models.BooleanField()

    class Meta:
        verbose_name = "Indicateur de réalisation"
        verbose_name_plural = "Indicateurs de réalisation (OI)"

    def __str__(self):
        return f"{self.code} - {self.libelle}"


class ObjectifGenerique(models.Model):
    code = models.CharField()
    libelle = models.CharField()

    class Meta:
        verbose_name = "Objectif générique"
        verbose_name_plural = "Objectifs génériques (OG)"

    def __str__(self):
        return f"{self.code} - {self.libelle}"


class ObjectifSpecifique(models.Model):
    code_sfc = models.CharField()
    code = models.CharField()
    id_sfc = models.CharField()
    libelle = models.CharField()
    libelle_long = models.CharField()
    objectif_generique = models.ForeignKey(ObjectifGenerique, on_delete=models.CASCADE)

    class Meta:
        verbose_name = "Objectif spécifique"
        verbose_name_plural = "Objectifs spécifiques (OS)"

    def __str__(self):
        return f"{self.code} - {self.libelle}"


class Besoin(models.Model):
    class Priorite(models.TextChoices):
        P1 = "Priorité 1", "Priorité 1"
        P2 = "Priorité 2", "Priorité 2"
        P3 = "Priorité 3", "Priorité 3"

    id_sfc = models.CharField()
    code_sfc = models.CharField()
    code = models.CharField()
    libelle = models.CharField()
    libelle_long = models.CharField()
    priorite = models.CharField(choices=Priorite)
    objectif_specifique = models.ForeignKey(
        ObjectifSpecifique, on_delete=models.CASCADE
    )

    class Meta:
        verbose_name = "Besoin"
        verbose_name_plural = "Besoins"

    def __str__(self):
        return f"{self.code} - {self.libelle}"


class Organisme(models.Model):
    code_structure_payeuse = models.CharField()
    code_sfc = models.CharField()
    code = models.CharField()
    libelle = models.CharField()
    libelle_structure_payeuse = models.CharField()

    class Meta:
        verbose_name = "Organisme"
        verbose_name_plural = "Organismes payeurs ou opérateurs (SP ou OP)"

    def __str__(self):
        return f"{self.code} - {self.libelle}"


class Secteur(models.Model):
    code = models.CharField()
    code_sfc = models.CharField()
    id_sfc = models.CharField()
    libelle = models.CharField()

    class Meta:
        verbose_name = "Secteur"
        verbose_name_plural = "Secteurs"

    def __str__(self):
        return self.libelle


class IndicateurContexte(models.Model):
    id_sfc = models.CharField()
    code_sfc = models.CharField()
    code = models.CharField()
    libelle = models.CharField()
    secteur = models.ForeignKey(Secteur, on_delete=models.CASCADE)
    unite = models.CharField(choices=UniteIndicateur)
    valeurs = postgres_fields.HStoreField()

    class Meta:
        verbose_name = "Indicateur de contexte"
        verbose_name_plural = "Indicateurs de contexte (CI)"

    def __str__(self):
        return self.libelle


class IndicateurMesure(models.Model):
    code = models.CharField()
    libelle = models.CharField()
    unite = models.CharField(choices=UniteIndicateur)

    class Meta:
        verbose_name = "Indicateur mesuré"
        verbose_name_plural = "Indicateurs mesurés (MI)"

    def __str__(self):
        return f"{self.code} - {self.libelle}"


class IndicateurResultat(models.Model):
    class Type(models.TextChoices):
        A = "A", "Annuel"
        C = "C", "Cumulatif"

    class TypeMonitoring(models.TextChoices):
        E = "E", "Examen"
        S = "S", "Suivi"

    class TypeCalcul(models.TextChoices):
        RATIO = "Ratio", "Ratio"
        SOMME = "Somme", "Somme"

    class MomentCollecte(models.TextChoices):
        A = "Acompte", "Acompte"
        S = "Solde", "Solde"

    class Meta:
        verbose_name = "Indicateur de résultat"
        verbose_name_plural = "Indicateurs de résultat (RI)"

    id_sfc = models.CharField()
    code_sfc = models.CharField()
    code = models.CharField()
    libelle = models.CharField()
    libelle_sfc = models.CharField()
    libelle_long = models.CharField()
    type = models.CharField(choices=Type)
    type_calcul = models.CharField(choices=TypeCalcul)
    type_monitoring = models.CharField(choices=TypeMonitoring)
    unite = models.CharField(choices=UniteIndicateur)
    surfacique = models.BooleanField()
    indicateur_mesure = models.ForeignKey(IndicateurMesure, on_delete=models.CASCADE)
    moment_collecte = models.CharField(choices=MomentCollecte)
    double_compte_autorise = models.BooleanField()
    denominateur = models.ForeignKey(
        IndicateurContexte, on_delete=models.CASCADE, null=True
    )

    def __str__(self):
        return f"{self.code} - {self.libelle}"


class TypeIntervention(models.Model):
    id_sfc = models.CharField()
    code_sfc = models.CharField()
    code = models.CharField()
    forme = models.CharField(choices=FormeIntervention)
    fonds = models.CharField(choices=FondsAgricole)
    libelle = models.CharField()
    libelle_sfc = models.CharField()
    article = models.CharField()

    class Meta:
        verbose_name = "Type d’intervention"
        verbose_name_plural = "Types d’interventions"

    def __str__(self):
        return self.libelle


class ActeurGeographique(models.Model):
    code = models.CharField()
    libelle = models.CharField()
    niveau_pilotage_ue = models.CharField(choices=NiveauPilotageUE)

    class Meta:
        verbose_name = "Acteur géographique"
        verbose_name_plural = "Acteurs géographiques (AG)"

    def __str__(self):
        return f"{self.code} - {self.libelle}"


class Intervention(models.Model):
    code = models.CharField()
    libelle = models.CharField()
    niveau_pilotage_ue = models.CharField(choices=NiveauPilotageUE)
    acteur_geographique = models.ForeignKey(
        ActeurGeographique, on_delete=models.CASCADE, null=True
    )
    structure_payante = models.ForeignKey(
        Organisme,
        on_delete=models.CASCADE,
        related_name="interventions_as_structure_payante",
    )
    operateur = models.ForeignKey(
        Organisme, on_delete=models.CASCADE, related_name="interventions_as_operateur"
    )
    forme = models.CharField(choices=FormeIntervention)
    secteur = models.ForeignKey(Secteur, on_delete=models.CASCADE, null=True)
    type_zone_ichn = models.CharField(choices=TypeZoneICHN, blank=True)
    type = models.ForeignKey(TypeIntervention, on_delete=models.CASCADE, null=True)
    fonds_agricole = models.CharField(choices=FondsAgricole)
    type_soutien_ab = models.CharField(choices=TypeSoutienAB)
    sanctuarisation_environnement = models.BooleanField()
    sanctuarisation_ja = models.BooleanField()
    participation_objectif_climatique = models.BooleanField()
    irrigation = models.BooleanField()
    indicateur_realisation = models.ForeignKey(
        IndicateurRealisation, on_delete=models.CASCADE
    )
    indicateurs_resultat = models.ManyToManyField(IndicateurResultat)
    besoins = models.ManyToManyField(Besoin)

    class Meta:
        verbose_name = "Intervention"
        verbose_name_plural = "Interventions"

    def __str__(self):
        return f"{self.code} - {self.libelle}"


__all__ = [
    "IndicateurContexte",
    "IndicateurMesure",
    "IndicateurRealisation",
    "IndicateurResultat",
    "ObjectifGenerique",
    "ObjectifSpecifique",
    "Organisme",
    "Secteur",
    "Besoin",
    "TypeIntervention",
    "ActeurGeographique",
    "Intervention",
]
