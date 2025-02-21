# Generated by Django 5.0.7 on 2024-07-31 10:10

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('userProfile', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='TrainingRequest',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('title', models.CharField(max_length=300)),
                ('trainingUrl', models.CharField(max_length=500)),
                ('description', models.TextField(blank=True, null=True)),
                ('price', models.DecimalField(decimal_places=2, max_digits=10)),
                ('statusApproval', models.CharField(choices=[('pending', 'Pending'), ('approved', 'Approved'), ('rejected', 'Rejected')], default='pending', max_length=11)),
                ('statusAdvancement', models.CharField(choices=[('notStarted', 'Not Started'), ('ongoing', 'Ongoing'), ('finished', 'Finished')], default='notStarted', max_length=11)),
                ('dtCreated', models.DateTimeField(auto_now_add=True)),
                ('dtUpdated', models.DateTimeField(auto_now=True)),
                ('requester', models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, related_name='trainingRequest', to='userProfile.userprofile')),
            ],
        ),
    ]
