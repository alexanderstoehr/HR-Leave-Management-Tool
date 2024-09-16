from django.shortcuts import get_object_or_404
from rest_framework import permissions
from userProfile.models import UserProfile


class IsCompanyAdmin(permissions.BasePermission):
    def has_permission(self, request, view):
        user_profile = get_object_or_404(UserProfile, customUser=request.user)
        return user_profile.isCompanyAdmin
