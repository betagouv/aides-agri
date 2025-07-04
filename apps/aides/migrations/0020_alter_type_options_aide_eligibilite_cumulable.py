# Generated by Django 5.2.3 on 2025-06-20 06:54

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("aides", "0019_type_urgence"),
    ]

    operations = [
        migrations.AlterModelOptions(
            name="type",
            options={
                "ordering": ("-urgence", "nom"),
                "verbose_name": "Type d'aides",
                "verbose_name_plural": "Types d'aides",
            },
        ),
        migrations.AddField(
            model_name="aide",
            name="eligibilite_cumulable",
            field=models.CharField(blank=True),
        ),
    ]
