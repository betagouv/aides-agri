def departement_from_commune(code_insee_commune: str) -> str:
    departements_outre_mer = ("97", "98")
    if any((code_insee_commune.startswith(outre_mer)) for outre_mer in departements_outre_mer):
        return code_insee_commune[:3]
    else:
        return code_insee_commune[:2]
