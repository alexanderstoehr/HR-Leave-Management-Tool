from django.shortcuts import render, get_object_or_404
from rest_framework import status
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from companiesProfile.models import CompaniesProfile
from companiesProfile.permissions import IsCompanyAdmin
from companiesProfile.serializers import CompaniesProfileSerializer
from userProfile.models import UserProfile


# Create your views here.
class UserCompanyProfileView(APIView):
    """
    Retrieve the info of the company of the logged-in user
    """
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        user_profile = get_object_or_404(UserProfile, customUser=request.user)
        company = user_profile.company
        serializer = CompaniesProfileSerializer(company)
        return Response(serializer.data)


class ListCreateCompaniesProfileView(ListCreateAPIView):

    permission_classes = [IsAuthenticated, IsCompanyAdmin]
    serializer_class = CompaniesProfileSerializer
    queryset = CompaniesProfile.objects.all()

    def get(self, request, *args, **kwargs):
        """List all company profiles (company admin)"""
        return super().list(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        """Create a new company profile (company admin)"""
        return super().create(request, *args, **kwargs)


class RetrieveUpdateDeleteCompaniesProfileView(RetrieveUpdateDestroyAPIView):

    permission_classes = [IsAuthenticated, IsCompanyAdmin]
    serializer_class = CompaniesProfileSerializer
    queryset = CompaniesProfile.objects.all()

    def get(self, request, *args, **kwargs):
        """Retrieve a single company profile by ID (company admin)"""
        return super().retrieve(request, *args, **kwargs)

    def patch(self, request, *args, **kwargs):
        """Update a single company profile by ID (company admin)"""
        return super().partial_update(request, *args, **kwargs)

    def delete(self, request, *args, **kwargs):
        """Delete a single company profile by ID (company admin)"""
        return super().destroy(request, *args, **kwargs)