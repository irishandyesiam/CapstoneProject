# Generated by Django 4.1.2 on 2023-04-23 17:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('shopping_list', '0003_remove_shoppinglist_unit'),
    ]

    operations = [
        migrations.AddField(
            model_name='shoppinglist',
            name='unit',
            field=models.CharField(default=0, max_length=20),
        ),
    ]
