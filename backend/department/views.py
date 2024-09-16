from django.shortcuts import render, get_object_or_404
from rest_framework import status, generics
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from department.models import Department
from department.permissions import IsCompanyAdmin
from department.serializers import DepartmentSerializer
from userProfile.models import UserProfile


# Create your views here.
class UserDepartmentView(APIView):
    """
    Retrieve information about the department of the logged-in user
    """
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        user_profile = get_object_or_404(UserProfile, customUser=request.user)
        department = user_profile.department
        serializer = DepartmentSerializer(department)
        return Response(serializer.data)


class ListCreateDepartmentsView(ListCreateAPIView):

    permission_classes = [IsAuthenticated, IsCompanyAdmin]
    serializer_class = DepartmentSerializer
    queryset = Department.objects.all()

    def get(self, request, *args, **kwargs):
        """List all departments (company admin)"""
        return super().list(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        """Create a new department (company admin)"""
        return super().create(request, *args, **kwargs)


class RetrieveUpdateDeleteDepartmentsView(RetrieveUpdateDestroyAPIView):

    permission_classes = [IsAuthenticated, IsCompanyAdmin]
    serializer_class = DepartmentSerializer
    queryset = Department.objects.all()

    def get(self, request, *args, **kwargs):
        """Retrieve a single department by ID (company admin)"""
        return super().retrieve(request, *args, **kwargs)

    def patch(self, request, *args, **kwargs):
        """Update a single department by ID (company admin)"""
        return super().partial_update(request, *args, **kwargs)

    def delete(self, request, *args, **kwargs):
        """Delete a single department by ID (company admin)"""
        return super().destroy(request, *args, **kwargs)