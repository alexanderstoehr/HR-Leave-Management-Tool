from django.shortcuts import get_object_or_404
from rest_framework import permissions
from companiesProfile.models import CompaniesProfile
from userProfile.models import UserProfile


class IsCompanyAdmin(permissions.BasePermission):
    def has_permission(self, request, view):
        try:
            user_profile = UserProfile.objects.get(customUser=request.user)
            return user_profile.isCompanyAdmin
        except UserProfile.DoesNotExist:
            return False
