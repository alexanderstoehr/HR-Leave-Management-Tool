from rest_framework import serializers
from .models import CompaniesProfile


class CompaniesProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = CompaniesProfile
        fields = ['id', 'companyName']
