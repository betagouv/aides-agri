import pytest

from aides_integration.models import RawAideRegionOccitanie
from aides_integration.tasks.region_occitanie import import_region_occitanie_feed, URL


fake_region_occitanie_rss_feed = """[
{
    "rubrique": "Tous les appels à projets",
    "titre": "Appel à projets - Coopération internationale Occitanie Résilience des Territoires  Maroc - Sénégal - Palestine",
    "url": "https://www.laregion.fr/Appel-a-projets-Cooperation-internationale-Occitanie-Resilience-des-Territoires",
    "date_publication": "2026-10-22 16:38:51",
    "date_modification": "2026-10-22 16:39:04",
    "region_service": "SREI",
    "aides_appels_a_projets": "Appels à projets",
    "thematiques": "Environnement - Climat, Agriculture et alimentation, Solidarités - Santé - Égalités, Europe et international",
    "publics": "Une association, Une collectivité, un acteur public, Association loi 1901, Fédération, Autre association",
    "chapo": "La Région Occitanie soutient les acteurs de son territoire qui portent des projets de coopération dans le domaine de l’eau et de l’agroécologie, de l’économie circulaire et de la santé, avec des partenaires dans 3 de ses zones cibles : au Maroc, en Palestine et au Sénégal. ",
    "introduction": "Ces projets doivent répondre à une logique de co-construction, en impliquant des acteurs de la région Occitanie et du territoire partenaire dans toutes les phases d’élaboration, de mise en œuvre du projet et d’évaluation du projet. Contexte et objectifs Les projets doivent se positionner sur un&nbsp;(…)<a href='https://www.laregion.fr/Appel-a-projets-Cooperation-internationale-Occitanie-Resilience-des-Territoires'>En savoir plus</a>",
    "texte": "<div class=\\"boite boite--bloc_en_avant\\"><div class=\\"bloc_en_avant\\"><div class=\\"bloc_en_avant__content\\">\\n<p>La Région Occitanie soutient les acteurs de son territoire qui portent des projets de coopération dans le domaine de l’eau et de l’agroécologie, de l’économie circulaire et de la santé, avec des partenaires dans 3 de ses zones cibles&nbsp;: au Maroc, en Palestine et au Sénégal.</p>\\n</div></div></div><p>Ces projets doivent répondre à une logique de co-construction, en impliquant des acteurs de la région Occitanie et du territoire partenaire dans toutes les phases d’élaboration, de mise en œuvre du projet et d’évaluation du projet.</p>\\n<div class='blocdepliable'><div class='blocdepliable_titre js-expandmore' data-hideshow-prefix-class='blocdepliable'>Contexte et objectifs</div><div class='js-to_expand'>\\n<p><strong class=\\"spip\\">Les projets doivent se positionner sur un ou plusieurs des axes suivants&nbsp;:</strong></p>\\n<ul class=\\"spip\\" role=\\"list\\"><li> <strong class=\\"spip\\">Eau et agroécologie </strong>\\n<ul class=\\"spip\\" role=\\"list\\"><li> Sensibilisation des usagers à la gestion économe de l’eau,</li><li> Amélioration de la gouvernance de l’eau (implication des acteurs locaux, meilleure prise en compte de l’eau dans la planification et l’aménagement) et gestion des conflits d’usage,</li><li> Intégration de l’approche GIRE au niveau territorial,</li><li> Développement de pratiques agroécologiques dédiées à l’utilisation de l’eau.</li></ul></li></ul><ul class=\\"spip\\" role=\\"list\\"><li> <strong class=\\"spip\\">Économie circulaire et déchets </strong>\\n<ul class=\\"spip\\" role=\\"list\\"><li> Gouvernance sur la question des déchets et économie circulaire</li><li> Formation et montée en compétences au sein des collectivités et structures publiques</li><li> Structuration de filières de réemploi, réutilisation et recyclage</li><li> Sensibilisation et lutte contre le gaspillage</li></ul></li></ul><ul class=\\"spip\\" role=\\"list\\"><li> <strong class=\\"spip\\">Santé </strong>\\n<ul class=\\"spip\\" role=\\"list\\"><li> Formation des personnels soignants</li><li> Soutien à des structures médicales publiques</li><li> Amélioration de l’accès aux services de santé, notamment en zone rurale</li><li> prévention et prise en charge de la santé mentale</li></ul></li></ul></div></div><div class='blocdepliable'><div class='blocdepliable_titre js-expandmore' data-hideshow-prefix-class='blocdepliable'>Bénéficiaires</div><div class='js-to_expand'>\\n<p>Structures publiques ou privées hors entreprises, idéalement en consortium basées en Occitanie et ayant un projet de coopération dans un des trois territoires de l’AAP.</p>\\n</div></div><div class='blocdepliable'><div class='blocdepliable_titre js-expandmore' data-hideshow-prefix-class='blocdepliable'>Modalités de participation</div><div class='js-to_expand'><div class=\\"boite boite--bloc_encadre_important\\"><div class=\\"bloc_encadre_important\\">\\n<p>\\n<strong class=\\"spip\\">Les dossiers de candidature devront être soumis complets avant le 24 janvier 2027 à 23h59, sur la plateforme &#171;&nbsp;Mes aides en ligne&nbsp;&#187;  </strong></p>\\n<p><span class=\\"call-to-action\\"><a href=\\"https://mesaidesenligne.laregion.fr\\" class=\\"spip_out\\" rel=\\"external\\">Accéder à Mes Aides en Ligne</a></span></p>\\n</div></div></div></div><div class='blocdepliable'><div class='blocdepliable_titre js-expandmore' data-hideshow-prefix-class='blocdepliable'>Date limite de dépôt des dossiers</div><div class='js-to_expand'><div class=\\"boite boite--bloc_encadre_important\\"><div class=\\"bloc_encadre_important\\">\\n<p><strong class=\\"spip\\">24 janvier 2027</strong></p>\\n</div></div></div></div><div class='blocdepliable'><div class='blocdepliable_titre js-expandmore' data-hideshow-prefix-class='blocdepliable'>Contact</div><div class='js-to_expand'><div class=\\"boite boite--bloc_encadre_large\\"><div class=\\"bloc_encadre_large\\">\\n<p><strong class=\\"spip\\">Mail&nbsp;: </strong> <a href=\\"mailto:solidarite.internationale@laregion.fr\\" class=\\"spip_mail\\">solidarite.internationale@laregion.fr</a></p>\\n</div></div>\\n<p><strong class=\\"spip\\">Les candidatures ne doivent pas être transmises par mail.</strong></p>\\n</div></div><div class=\\"boite boite--bloc_encadre_large\\"><div class=\\"bloc_encadre_large\\"><h2 itemprop=\\"headline\\" class=\\"spip\\" id='Webinaire-d-informations'>Wébinaire d&#8217;informations</h2>\\n<p><strong class=\\"spip\\">Suite à l’ouverture de l’Appel à projets &#171;&nbsp;Coopération internationale Occitanie&nbsp;&#187;, un webinaire d’informations sera organisé le 12 novembre 2026 à 14h30.</strong></p>\\n<p><strong class=\\"spip\\">Ordre du jour&nbsp;:</strong></p>\\n<ul class=\\"spip\\" role=\\"list\\"><li> Mot d’ouverture de Madame Fadelha BENNAMAR KOLY, Présidente de la commission &#171;&nbsp;International, Europe et Coopération&nbsp;&#187;, Conseillère régionale Occitanie.</li><li> Présentation des modalités de candidature</li><li> Echange avec les participants</li></ul><div class=\\"boite boite--bloc_ensavoirplus\\"><div class=\\"bloc_ensavoirplus\\"><p class=\\"bloc_ensavoirplus__titre\\"><span>En savoir plus</span></p>\\n<div class=\\"bloc_ensavoirplus__texte\\">\\n<p><span class=\\"call-to-action\\"><a href=\\"Inscription-au-Webinaire-d-information-Lancement-de-l-AAP-Cooperation-internationale\\" class=\\"spip_in\\">Cliquez ici pour vous inscrire</a></span></p>\\n</div></div></div>\\n</div></div><div class=\\"boite boite--bloc_telechargements\\"><div class=\\"bloc_telechargements\\">\\n\\t<div class=\\"bloc_telechargements__titre\\"><span>Téléchargements</span></div>\\n\\t<ul class=\\"spip bloc_telechargements__texte\\">\\n\\t\\t\\n\\t\\t<li><a href=\\"IMG/pdf/b/6/a/2026_reglement_aap_ci.pdf\\">Règlement de l&#8217;appel à projet 2026 <small>(application PDF, 754.6 kio)</small></a></li>\\n\\t\\t\\n\\t\\t<li><a href=\\"IMG/pdf/7/c/c/2026_aide_a_la_candidature.pdf\\">Aide à la candidature et informations complémentaires <small>(application PDF, 613.9 kio)</small></a></li>\\n\\t\\t\\n\\t\\t<li><a href=\\"IMG/xlsx/4/b/a/modele_budget_previsionnel_global_par_nature-1.xlsx\\">Modèle de budget prévisionnel global par nature <small>(application Excel, 20.2 kio)</small></a></li>\\n\\t\\t\\n\\t\\t<li><a href=\\"IMG/xlsx/a/4/c/modele_budget_previsionnel_par_action-3.xlsx\\">Modèle budget prévisionnel par action <small>(application Excel, 20.8 kio)</small></a></li>\\n\\t\\t\\n\\t\\t<li><a href=\\"IMG/xlsx/a/b/d/modele_budget_aap_2026.xlsx\\">Modèle Budget AAP 2026 <small>(application Excel, 21.9 kio)</small></a></li>\\n\\t\\t\\n\\t\\t<li><a href=\\"IMG/pdf/d/0/4/2026_page_information_rgpd.pdf\\">Information RGPD <small>(application PDF, 220.3 kio)</small></a></li>\\n\\t\\t\\n\\t\\t<li><a href=\\"IMG/pdf/6/2/8/1_a_6_fusionne.pdf\\">Tuto Mes aides en ligne <small>(application PDF, 2.7 Mio)</small></a></li>\\n\\t\\t\\n\\t</ul>\\n</div></div>",
    "logo" : "https://www.laregion.fr/IMG/svg/3/c/3/offreemploi-4-dd6d3-68276.svg"
},
{
    "rubrique": "Tous les appels à projets",
    "titre": "Dispositif Convention Filières Territorialisées",
    "url": "https://www.laregion.fr/Dispositif-Convention-Filieres-Territorialisees",
    "date_publication": "2026-08-17 09:44:02",
    "date_modification": "2026-08-17 09:44:03",
    "region_service": "",
    "aides_appels_a_projets": "Aides",
    "thematiques": "Agriculture et alimentation",
    "publics": "Une association, Une entreprise, un·e professionnel·le, Association loi 1901, Fédération, Autre association, Entreprise, Agricultrice, agriculteur, Autre entreprise - autre professionnel·le",
    "chapo": " Ce dispositif vise à accompagner l’émergence de filières territorialisées afin de relocaliser les filières alimentaires et d’accroitre la valeur ajoutée sur les territoires. ",
    "introduction": "Contexte et objectifs La relocalisation des systèmes alimentaires est un moyen de répondre aux enjeux de la souveraineté alimentaire pour réduire notre dépendance aux importations de denrées. Une filière territorialisée se définit comme le fait de produire, transformer et consommer sur un même&nbsp;(…)<a href='https://www.laregion.fr/Dispositif-Convention-Filieres-Territorialisees'>En savoir plus</a>",
    "texte": "<div class=\\"boite boite--bloc_en_avant\\"><div class=\\"bloc_en_avant\\"><div class=\\"bloc_en_avant__content\\">\\n<p>Ce dispositif vise à accompagner l’émergence de filières territorialisées afin de relocaliser les filières alimentaires et d’accroitre la valeur ajoutée sur les territoires.</p>\\n</div></div></div><div class='blocdepliable'><div class='blocdepliable_titre js-expandmore' data-hideshow-prefix-class='blocdepliable'>Contexte et objectifs</div><div class='js-to_expand'>\\n<p>La relocalisation des systèmes alimentaires est un moyen de répondre aux enjeux de la souveraineté alimentaire pour réduire notre dépendance aux importations de denrées.</p>\\n<p>Une filière territorialisée se définit comme le fait de produire, transformer et consommer sur un même territoire.</p>\\n<p>Le présent dispositif vise à financer du temps d’ingénierie dédié à l’élaboration d’un plan d’actions concret et opérationnel pour les acteurs économiques qui s’engagent dans une démarche de relocalisation de l’ensemble des maillons de la chaîne de valeur d’une filière sur un même territoire, qu’il s’agisse de la phase d’émergence de nouvelles filières agricoles ou alimentaires ou de la re-territorialisation de filières existantes.</p>\\n</div></div><div class='blocdepliable'><div class='blocdepliable_titre js-expandmore' data-hideshow-prefix-class='blocdepliable'>Bénéficiaires</div><div class='js-to_expand'>\\n<p>Les bénéficiaires de ce dispositif sont&nbsp;:</p>\\n<ul class=\\"spip\\" role=\\"list\\"><li> Associations comprenant une majorité d’agriculteurs</li><li> Organisation de Producteurs (OP)</li><li> Coopératives agricoles</li><li> Entreprises actives dans la transformation et/ou la commercialisation de produits agricoles ou alimentaires</li><li> Chambres d’agriculture</li><li> CUMA</li><li> CIVAM</li><li> GAB</li><li> Organisme de Défense et de Gestion (ODG)</li></ul></div></div><div class='blocdepliable'><div class='blocdepliable_titre js-expandmore' data-hideshow-prefix-class='blocdepliable'>Montant</div><div class='js-to_expand'>\\n<p>Selon la nature des projets.</p>\\n<div class=\\"boite boite--bloc_encadre_important\\"><div class=\\"bloc_encadre_important\\">\\n<p><strong class=\\"spip\\">Consultez le détail du dispositif disponible au téléchargement en bas de la présente page.</strong></p>\\n</div></div></div></div><div class='blocdepliable'><div class='blocdepliable_titre js-expandmore' data-hideshow-prefix-class='blocdepliable'>Conditions d’éligibilité</div><div class='js-to_expand'>\\n<p>Selon la nature des projets.</p>\\n<div class=\\"boite boite--bloc_encadre_important\\"><div class=\\"bloc_encadre_important\\">\\n<p><strong class=\\"spip\\">Consultez le détail du dispositif disponible au téléchargement en bas de la présente page. <br class='autobr' />\\nDispositif ouvert sur invitation.</strong></p>\\n</div></div></div></div><div class='blocdepliable'><div class='blocdepliable_titre js-expandmore' data-hideshow-prefix-class='blocdepliable'>Contacts</div><div class='js-to_expand'>\\n<p><strong class=\\"spip\\">Mail&nbsp;:</strong> <a href=\\"mailto:filieres.territorialisees@laregion.fr\\" class=\\"spip_mail\\">filieres.territorialisees@laregion.fr</a></p>\\n</div></div><div class=\\"boite boite--bloc_telechargements\\"><div class=\\"bloc_telechargements\\">\\n\\t<div class=\\"bloc_telechargements__titre\\"><span>Téléchargements</span></div>\\n\\t<ul class=\\"spip bloc_telechargements__texte\\">\\n\\t\\t\\n\\t\\t<li><a href=\\"IMG/pdf/9/c/2/annexe_dispositif_filiere_territorialisee.pdf\\">Notice Convention Filières Territorialisées <small>(application PDF, 98.3 kio)</small></a></li>\\n\\t\\t\\n\\t</ul>\\n</div></div>",
    "logo" : "https://www.laregion.fr/IMG/svg/3/c/3/offreemploi-4-dd6d3-68276.svg"
}
]
"""


@pytest.mark.django_db
@pytest.mark.parametrize(
    "raw_aide_region_occitanie__id_externe,raw_aide_region_occitanie_integrated__id_externe,raw_aide_region_occitanie_integrated__status",
    [
        [
            "coucou",
            "Dispositif-Convention-Filieres-Territorialisees",
            RawAideRegionOccitanie.Status.DONE,
        ]
    ],
)
def test_import_region_occitanie_feed(
    requests_mock, raw_aide_region_occitanie, raw_aide_region_occitanie_integrated
):
    # GIVEN 2 RawAideRegionOccitanie in DB, one NEW and one DONE
    # And a fake RSS feed containing 1 new Aide and 1 existing Aide
    assert RawAideRegionOccitanie.objects.count() == 2
    assert RawAideRegionOccitanie.objects.new().count() == 1
    assert RawAideRegionOccitanie.objects.done().count() == 1
    requests_mock.get(URL, text=fake_region_occitanie_rss_feed)

    # WHEN calling import_region_occitanie_feed()
    task_result = import_region_occitanie_feed.enqueue()

    # THEN
    assert task_result.return_value == [1, 1, 1]
    assert RawAideRegionOccitanie.objects.count() == 3
    assert RawAideRegionOccitanie.objects.to_do().count() == 2
    assert RawAideRegionOccitanie.objects.new().count() == 1
    assert RawAideRegionOccitanie.objects.updated().count() == 1
    assert RawAideRegionOccitanie.objects.soft_deleted().count() == 1
    qs = RawAideRegionOccitanie.objects.to_do().order_by("titre")
    aide_1 = qs.first()
    assert (
        aide_1.titre
        == "Appel à projets - Coopération internationale Occitanie Résilience des Territoires Maroc - Sénégal - Palestine"
    )
    assert aide_1.thematiques == [
        "Environnement - Climat",
        "Agriculture et alimentation",
        "Solidarités - Santé - Égalités",
        "Europe et international",
    ]
    aide_2 = qs.last()
    assert aide_2.titre == "Dispositif Convention Filières Territorialisées"
    assert aide_2.thematiques == ["Agriculture et alimentation"]
