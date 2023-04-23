# Generated by Django 4.1.2 on 2023-04-23 17:37

import django
from django.db import migrations, models
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        ('meal_planner', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='MealPlan',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('day_week', models.CharField(max_length=255, null=True)),
                ('meal_type', models.CharField(max_length=15, null=True)),
                ('recipe', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='recipes.recipe')),
                ('user', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
