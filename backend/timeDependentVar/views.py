from django.shortcuts import render
from rest_framework import generics, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from userProfile.models import UserProfile
from userProfile.serializers import UserProfileSerializerAll


# Create your views here.
class UserProfileDetailView(generics.RetrieveAPIView):
    """
    Retrieve all info of a selected user
    """
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializerAll
    lookup_field = 'customUser__username'

    def get(self, request, *args, **kwargs):
        user_profile = self.get_object()
        serializer = self.get_serializer(user_profile)
        return Response(serializer.data, status=status.HTTP_200_OK)


class LoggedInUserProfileDetailView(generics.RetrieveAPIView):
    """
    Retrieve all info of the logged-in user
    """
    serializer_class = UserProfileSerializerAll
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user.userProfile

    def get(self, request, *args, **kwargs):
        user_profile = self.get_object()
        serializer = self.get_serializer(user_profile)
        return Response(serializer.data, status=status.HTTP_200_OK)