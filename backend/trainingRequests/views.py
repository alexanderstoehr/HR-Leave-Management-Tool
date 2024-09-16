from django.shortcuts import render

from django.db.models import Subquery
from rest_framework import status
from rest_framework.response import Response

from rest_framework.generics import ListAPIView, GenericAPIView

# import models
from .models import TrainingRequest
from userProfile.models import UserProfile

# serializers
from .serializers import (
        TrainingSerializerEmployee,  # to post a new request of training
        TrainingSerializerManager,  # for the manager: only to accept or reject the training
        TrainingSerializerEmployeeUpdate   # for the employee only to patch the statusAdvancement and completionCertificateId
        )


# Create your views here.

# .......................................................................
# GET the requests of ALL users -> only for tests
class TrainingGetAll(ListAPIView):
    """
    Retrieve the absence requests for all users
    """
    queryset = TrainingRequest.objects.all()
    serializer_class = TrainingSerializerEmployee


# .......................................................................
class CreateListModifyTrainingMeView(GenericAPIView):
    """
        Retrieve the list of all training requests of the logged-in user (employee or manager)
    """

    # define serializer for special cases
    def get_serializer_class(self):
        #if self.request.method == 'PATCH':
        #    return TrainingSerializerEmployeeUpdate
        #    # can change only statusAdvancement and only if statusApproval = approved
        #else:
        return TrainingSerializerEmployee

        #    return CustomUserSerializerPrivate  # private info
        # return CustomUserSerializerPublic  # PATCH -> only public patch according to the specifics
        #return TrainingSerializerEmployee  # simple by now


    # filter the logged-in user via the CustomUser table
    def get_queryset(self):
        # I want the entries of userProfile whose customUser_id = id of the CustomUser
        # get id of CustomUser where username=self.request.user
        id_CustomUserHere = self.request.user.id

        # get the id in UserProfile with this customUser_id
        id_UserProfileHere = UserProfile.objects.get(customUser_id=id_CustomUserHere).id

        # return the entries of the AbsenceRequest whose requester_id is = this above
        return TrainingRequest.objects.filter(requester_id=id_UserProfileHere)
        # return UserProfile.objects.all()  # test

    # GET method
    def get(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)  # need to put many=True for it to work: boh
        # serializer_class = UserProfileSerializerAll # with this it does not work
        return Response(serializer.data)  # here it sees no data


    # Post a new absence for me only
    def post(self, request, *args, **kwargs):
        """
           Creates a new training request for the logged-in employee.

           The requester_id is set automatically as the logged-in user.
           The statusApproval is set to "pending" automatically.
           The statusAdvancement is set to "notStarted" automatically.

           Validation performed:
           -

        """
        # I want the entries of userProfile whose customUser_id = id of the CustomUser
        # get id of CustomUser where username=self.request.user
        id_CustomUserHere = self.request.user.id

        # get the id in UserProfile with this customUser_id
        id_UserProfileHere = UserProfile.objects.get(customUser_id=id_CustomUserHere).id

        # get the data passed
        serializer = self.get_serializer(data=request.data)
        # check the data
        serializer.is_valid(raise_exception=True)

        #pass

        # fix the variables to pass to the serializer
        statusApproval_here = 'pending'
        statusAdvancement_here = 'notStarted'


        # do such that the requester id is the logged in user of UserProfile
        serializer.save(requester_id=id_UserProfileHere,
                        statusApproval=statusApproval_here,
                        statusAdvancement=statusAdvancement_here
                        )

        return Response(serializer.data, status=status.HTTP_201_CREATED)


# ...........................................................................
"""
 For the employee to update the status of the training
"""
class ModifyTrainingMeView(GenericAPIView):

    # define serializer for special cases
    def get_serializer_class(self):
        if self.request.method == 'PATCH':
            return TrainingSerializerEmployeeUpdate
            # can change only statusAdvancement and only if statusApproval = approved
        else:
            return TrainingSerializerEmployee


    # filter the logged-in user via the CustomUser table
    def get_queryset(self):
        # I want the entries of userProfile whose customUser_id = id of the CustomUser
        # get id of CustomUser where username=self.request.user
        id_CustomUserHere = self.request.user.id

        # get the id in UserProfile with this customUser_id
        id_UserProfileHere = UserProfile.objects.get(customUser_id=id_CustomUserHere).id

        # return the entries of the AbsenceRequest whose requester_id is = this above
        return TrainingRequest.objects.filter(requester_id=id_UserProfileHere)
        # return UserProfile.objects.all()  # test

    def patch(self, request, *args, **kwargs):
        """
            The employee can modify the statusAdvancement of a training.
            The other fields are ignored.
            The pk of TrainingRequests is used.

            Validations:
            - the statusAdvancement can be modified only if statusApproval is 'approved'

        """
        # get the object
        instance = self.get_object()  # a single object: focusing on pk implicit
        # get the new quality via the serializer
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        # validate: TODO: need to change here???
        serializer.is_valid(raise_exception=True)
        # update the data into the DB
        serializer.save()
        # return
        return Response(serializer.data, status=status.HTTP_200_OK)


# .....................................................................
class CreateListModifyTrainingEmployeeMyTeamView(GenericAPIView):
    """
        Retrieve the list of all training requests of all the users with the same approver as the logged-in person.
        The logged in person is included in the query.
        This is to be used when the logged in user is an employee.
    """


    # define serializer for special cases
    def get_serializer_class(self):
        # if self.request.method == 'GET':
        #    return CustomUserSerializerPrivate  # private info
        # return CustomUserSerializerPublic  # PATCH -> only public patch according to the specifics
        return TrainingSerializerEmployee  # simple by now

    # filter the logged-in user via the CustomUser table
    # and extract the users with the same approver and add the approver
    def get_queryset(self):
        # I want the entries of userProfile whose customUser_id = id of the CustomUser
        # get id of CustomUser where username=self.request.user
        id_CustomUserHere = self.request.user.id

        # get the id in UserProfile with this customUser_id
        id_UserProfileHere = UserProfile.objects.get(customUser_id=id_CustomUserHere).id


        # the userProfile id of the approver
        id_approverHere = UserProfile.objects.get(id=id_UserProfileHere).approver_id

        # USING THIS to study: https://docs.djangoproject.com/en/5.0/topics/db/queries/
        # Methods of the queryset = https://docs.djangoproject.com/en/5.0/ref/models/querysets/

        # Subquery to get related_field values from RelatedModel
        # take the list of UserProfile id with the same approver as the logged in user -> it is a list
        subquery = UserProfile.objects.filter(approver=id_approverHere).values('id')

        # Filter MyModel using the subquery
        # return the list of absence request with this filter
        return TrainingRequest.objects.filter(requester__in=Subquery(subquery))

    # GET method
    def get(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)  # need to put many=True for it to work: boh
        # serializer_class = UserProfileSerializerAll # with this it does not work
        return Response(serializer.data)  # here it sees no data


# .............................................................
class CreateListModifyTrainingEmployeeMyManagerView(GenericAPIView):
    """
        Retrieve the list of all training requests of the approver of the logged-in user.
        This is for the employees.
    """

    # define serializer for special cases
    def get_serializer_class(self):
        # if self.request.method == 'GET':
        #    return CustomUserSerializerPrivate  # private info
        # return CustomUserSerializerPublic  # PATCH -> only public patch according to the specifics
        return TrainingSerializerEmployee  # simple by now

    # filter the logged-in user via the CustomUser table
    # and extract the users with the same approver and add the approver
    def get_queryset(self):
        # I want the entries of userProfile whose customUser_id = id of the CustomUser
        # get id of CustomUser where username=self.request.user
        id_CustomUserHere = self.request.user.id

        # get the id in UserProfile with this customUser_id
        id_UserProfileHere = UserProfile.objects.get(customUser_id=id_CustomUserHere).id

        # SQL I NEED -> solved with subqueries


        # the userProfile id of the approver
        id_approverHere = UserProfile.objects.get(id=id_UserProfileHere).approver_id

        # USING THIS to study: https://docs.djangoproject.com/en/5.0/topics/db/queries/
        # Methods of the queryset = https://docs.djangoproject.com/en/5.0/ref/models/querysets/

        # Subquery to get related_field values from RelatedModel
        # take the list of UserProfile id with the same approver as the logged in user -> it is a list
        subquery = UserProfile.objects.filter(id=id_approverHere).values('id')

        # Filter MyModel using the subquery
        # return the list of absence request with this filter
        return TrainingRequest.objects.filter(requester__in=Subquery(subquery))

    # GET method
    def get(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)  # need to put many=True for it to work: boh
        # serializer_class = UserProfileSerializerAll # with this it does not work
        return Response(serializer.data)  # here it sees no data



# .............................................................
class ListTrainingManagerMyTeamView(GenericAPIView):
    """
        Retrieve the list of all training requests of all the users whose approver is the logged-in user.
        The logged in person is excluded by this query.
    """


    # define serializer for special cases
    def get_serializer_class(self):
        # if self.request.method == 'GET':
        #    return CustomUserSerializerPrivate  # private info
        # return CustomUserSerializerPublic  # PATCH -> only public patch according to the specifics
        return TrainingSerializerEmployee  # simple by now

    # filter the logged-in user via the CustomUser table
    # and extract the users with the same approver and add the approver
    def get_queryset(self):
        # I want the entries of userProfile whose customUser_id = id of the CustomUser
        # get id of CustomUser where username=self.request.user
        id_CustomUserHere = self.request.user.id

        # get the id in UserProfile with this customUser_id
        # the id of the manager is the id of the approver
        #id_UserProfileHere = UserProfile.objects.get(customUser_id=id_CustomUserHere).id
        id_approverHere = UserProfile.objects.get(customUser_id=id_CustomUserHere).id

        # the userProfile id of the approver
        #id_approverHere = UserProfile.objects.get(customUser_id=id_CustomUserHere).approver_id

        # USING THIS to study: https://docs.djangoproject.com/en/5.0/topics/db/queries/
        # Methods of the queryset = https://docs.djangoproject.com/en/5.0/ref/models/querysets/

        # Subquery to get related_field values from RelatedModel
        # take the list of UserProfile id with the same approver as the logged in user -> it is a list
        subquery = UserProfile.objects.filter(approver=id_approverHere).values('id')

        # Filter MyModel using the subquery
        # return the list of absence request with this filter
        return TrainingRequest.objects.filter(requester__in=Subquery(subquery))

    # GET method
    def get(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)  # need to put many=True for it to work: boh
        # serializer_class = UserProfileSerializerAll # with this it does not work
        return Response(serializer.data)  # here it sees no data



# .............................................................
class ModifyTrainingManagerMyTeamView(GenericAPIView):
    """
        Retrieve the list of all absence requests of all the users whose approver is the logged-in user.
        The logged in person is excluded by this query.
    """

    # define serializer for special cases
    def get_serializer_class(self):
        # if self.request.method == 'GET':
        #    return CustomUserSerializerPrivate  # private info
        # return CustomUserSerializerPublic  # PATCH -> only public patch according to the specifics
        #return AbsenceSerializerAll  # simple by now
        return TrainingSerializerManager
        # we use a different serializer for the patch



    # do I need this???
    def get_queryset(self):
        # I want the entries of userProfile whose customUser_id = id of the CustomUser
        # get id of CustomUser where username=self.request.user
        id_CustomUserHere = self.request.user.id

        # get the id in UserProfile with this customUser_id
        # the id of the manager is the id of the approver
        #id_UserProfileHere = UserProfile.objects.get(customUser_id=id_CustomUserHere).id
        id_approverHere = UserProfile.objects.get(customUser_id=id_CustomUserHere).id

        # the userProfile id of the approver
        #id_approverHere = UserProfile.objects.get(customUser_id=id_CustomUserHere).approver_id

        # USING THIS to study: https://docs.djangoproject.com/en/5.0/topics/db/queries/
        # Methods of the queryset = https://docs.djangoproject.com/en/5.0/ref/models/querysets/

        # Subquery to get related_field values from RelatedModel
        # take the list of UserProfile id with the same approver as the logged in user -> it is a list
        subquery = UserProfile.objects.filter(approver=id_approverHere).values('id')

        # Filter MyModel using the subquery
        # return the list of absence request with this filter
        return TrainingRequest.objects.filter(requester__in=Subquery(subquery))



    # I need to create a different class?
    # TODO: how to accept partial update???
    # patch status only of my team
    def patch(self, request, *args, **kwargs):
        """
            The manager (approver) can modify only the statusApproval of the training, not the other fields.
            This operation uses the primary key of TrainingRequest as pk in the URL.
            The trainingRequests modifiable are the ones selected by the method get_query and are already
            only the ones that the approver can approve.

            Validations done:
            - only the statusApproval can be changed, the other fields are ignored without a warning

        """
        # get the object
        instance = self.get_object()  # a single object: focusing on pk implicit
        # get the new quality via the serializer
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        # validate: TODO: need to change here???
        serializer.is_valid(raise_exception=True)
        # update the data into the DB
        serializer.save()
        # return
        return Response(serializer.data, status=status.HTTP_200_OK)
