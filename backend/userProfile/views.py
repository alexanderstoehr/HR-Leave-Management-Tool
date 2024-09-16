from django.shortcuts import render
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
#from drf_yasg.openapi import Response
#from rest_framework.response import Response
from rest_framework.generics import ListAPIView, GenericAPIView

#from .models import UserProfile
from rest_framework import generics, status

from .models import UserProfile, CustomUser
from .serializers import UserProfileSerializerAll


# Create your views here.

# ...........................................................................
class UserProfileGetAll(ListAPIView):
#class UserProfileGetAll(generics.ListCreateAPIView):
    """
    Retrieve the list of ALL UserProfiles
    """
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializerAll


# ...........................................................................
class ListUserProfileMeView(GenericAPIView):
    """
    Retrieve the information of the logged-in user
    """

    # define serializer for special cases
    def get_serializer_class(self): # serializer or serializer_class?
        #if self.request.method == 'GET':
        #    return CustomUserSerializerPrivate  # private info
        #return CustomUserSerializerPublic  # PATCH -> only public patch according to the specifics
        return UserProfileSerializerAll

    # filter the logged in user
    def get_queryset(self):
        # I want the entries of userProfile whose cutomUser_id = id of the CustomUser
        # get id of CustomUser where username=self.request.user
        id_CustomUserHere = self.request.user.id
        pass
        # return the entries of the UserProfile whose customUser_id is = this above
        return UserProfile.objects.filter(customUser_id=id_CustomUserHere)
        #return UserProfile.objects.all()  # test


    # GET method
    def get(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True) # need to put many=True for it to work: boh
        #serializer_class = UserProfileSerializerAll # with this it does not work
        return Response(serializer.data) # here it sees no data



# ................................................................................
class UserProfileByApproverView(generics.ListAPIView):
    """
    List all UserProfiles where the logged-in user is approver of
    """
    serializer_class = UserProfileSerializerAll
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return UserProfile.objects.filter(approver__customUser=user)


# ..................................................................................
# ...........................................................................
class ListUserProfileMyCompanyView(GenericAPIView):
    """
    Retrieve the information of all the users whose company is the same as the one of the logged-in user
    """

    # define serializer for special cases
    def get_serializer_class(self): # serializer or serializer_class?
        #if self.request.method == 'GET':
        #    return CustomUserSerializerPrivate  # private info
        #return CustomUserSerializerPublic  # PATCH -> only public patch according to the specifics
        return UserProfileSerializerAll

    # filter the logged in user
    def get_queryset(self):
        # I want the entries of userProfile whose cutomUser_id = id of the CustomUser
        # get id of CustomUser where username=self.request.user
        id_CustomUserHere = self.request.user.id

        # get the field "company" for the logged in user
        company_idHere = UserProfile.objects.get(customUser_id=id_CustomUserHere).company

        #pass


        #pass
        # return the entries of the UserProfile whose customUser_id is = this above
        return UserProfile.objects.filter(company_id=company_idHere)
        #return UserProfile.objects.all()  # test


    # GET method
    def get(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True) # need to put many=True for it to work: boh
        #serializer_class = UserProfileSerializerAll # with this it does not work
        return Response(serializer.data) # here it sees no data
