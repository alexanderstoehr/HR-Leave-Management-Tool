from django.shortcuts import render
from django.http import JsonResponse  # needed for the calculations
from django.db.models import Subquery
from django.http import HttpResponseServerError


from rest_framework.response import Response
from rest_framework.generics import GenericAPIView


# import models needed
from absenceRequests.models import AbsenceRequest
from userProfile.models import UserProfile
from timeDependentVar.models import TimeDependentVar
from trainingRequests.models import TrainingRequest


# import serializers needed
from absenceRequests.serializers import AbsenceSerializerAll, AbsenceSerializerManager
from userProfile.serializers import UserProfileSerializerAll
from trainingRequests.serializers import TrainingSerializerEmployee


# to raise exceptions


# .........................................................................
class ComputeKpiYearlyMe(GenericAPIView):
    """
        Computes the KPI of the logged in users for the calendar year 2024
    """

    year_chosen = 2024  # fixed year chosen


    # .....................................................................
    # fz to get the static details of the logged in user
    def get_serializer_user_class(self):
        return UserProfileSerializerAll

    def get_info_users(self):
        # can I get the list of the users I want?
        id_CustomUserHere = self.request.user.id
        queryset = UserProfile.objects.filter(customUser_id=id_CustomUserHere)
        serializer_class = self.get_serializer_user_class()  # declare the class: needs to be done before
        serializer = serializer_class(queryset, many=True)  # need to put many=True for it to work: boh
        return Response(serializer.data)  # here it sees no data


    # .....................................................................
    # fz to get the list of absence requests for the logged in user
    def get_serializer_absences_class(self):
        return AbsenceSerializerAll

    def get_absence_requests(self):
        # TODO: select only the year
        # can I get the list of the users I want?
        id_CustomUserHere = self.request.user.id
        # get the id in UserProfile with this customUser_id
        id_UserProfileHere = UserProfile.objects.get(customUser_id=id_CustomUserHere).id
        queryset = AbsenceRequest.objects.filter(requester_id=id_UserProfileHere)  # TODO: add here the requests in the year
        serializer_class = self.get_serializer_absences_class()  # declare the class: needs to be done before
        serializer = serializer_class(queryset, many=True)  # need to put many=True for it to work: boh
        return Response(serializer.data)  # here it sees no data


    # .....................................................................
    # fz to get the list of training requests for the logged in user
    def get_serializer_training_class(self):
        return TrainingSerializerEmployee

    def get_training_requests(self):
        # TODO: select only the year
        # can I get the list of the users I want?
        id_CustomUserHere = self.request.user.id
        # get the id in UserProfile with this customUser_id
        id_UserProfileHere = UserProfile.objects.get(customUser_id=id_CustomUserHere).id
        queryset = TrainingRequest.objects.filter(requester_id=id_UserProfileHere)   # TODO: add here the requests in the year
        serializer_class = self.get_serializer_training_class()  # declare the class: needs to be done before
        serializer = serializer_class(queryset, many=True)  # need to put many=True for it to work: boh
        return Response(serializer.data)  # here it sees no data


    # ...........................................................
    # GET method
    def get(self, request, *args, **kwargs):
        """
        Here we get a list of objects where every object contains the static data of a user
        together with the total duration of the allowances of vacation, the vacations taken, the sickness leave taken
        and the training requested.
        This version works for the calendar 2024 only (hard-coded)
        """

        # get the list of the users -> list of json
        data_list_users = self.get_info_users().data  # data extracts the list of json

        # get the list of the absence requests with formatted data for the chosen user
        # vector: I take the first entry: only 1
        data_absence_requests = self.get_absence_requests().data

        # get the list of the training requests
        data_training_requests = self.get_training_requests().data

        pass

        # final_data: all same users -> sum on all
        final_data = []

        for user in data_list_users:
            # take the static var
            now_userProfile_id = user['id']
            now_username = user['customUser']['username']
            now_firstname = user['customUser']['first_name']
            now_lastname = user['customUser']['last_name']
            now_customuser_id = user['customUser']['id']

            # from time dep var
            now_tot_vacation_days = float([entry['value'] for entry in user['timeDepVars']
                                     if entry['variable'] == 'nr_tot_vacation_days'][0])
            # to convert hours in days
            now_nr_working_h_per_day_100perc_pensum = float([entry['value'] for entry in user['timeDepVars']
                                                       if entry['variable'] == 'nr_working_hours_per_day_at100PercPensum'][0])
            # converted into hours
            now_tot_vacation_hours = float(now_tot_vacation_days) * float(now_nr_working_h_per_day_100perc_pensum)

            # list of absence with requester.id = same here
            selected_absence = [abs for abs in data_absence_requests if abs['requester']['id'] == now_userProfile_id]

            # sum of the duration of the absence requests selected grouped by
            # list of unique cases of reason/status
            #list_reason_status = list(set([ entry['reason'] + '__' + entry['status'] for entry in selected_absence ]))
            absence_grouped_duration_hours = {}
            # Iterate through each record
            for now_abs in selected_absence:
                # Create a key from the category and region
                key = 'absence_duration_hours__' + now_abs["reason"] + '__' + now_abs["status"]

                # If the key is not in the dictionary, add it with a value of 0
                if key not in absence_grouped_duration_hours:
                    absence_grouped_duration_hours[key] = 0

                # Add the sales value to the corresponding key in the dictionary
                absence_grouped_duration_hours[key] += float(now_abs["durationWorkHours"])

            # here we have absence_grouped_duration_hours complete

            # list of trainings with requester.id = same here
            selected_training = [trai for trai in data_training_requests if
                                 trai['requester']['id'] == now_userProfile_id]

            # nr of trainings grouped by statusApproval / statusAdvancement
            training_grouped_nr_courses = {}
            # Iterate through each record
            for now_trai in selected_training:
                # Create a key from the category and region
                key = 'training_nr_courses__' + now_trai["statusApproval"] + '__' + now_trai["statusAdvancement"]

                # If the key is not in the dictionary, add it with a value of 0
                if key not in training_grouped_nr_courses:
                    training_grouped_nr_courses[key] = 0

                # Add the sales value to the corresponding key in the dictionary
                training_grouped_nr_courses[key] += 1

            # here we have training_grouped_nr_courses complete

            pass

            # save all the variables in final_data
            now_dict = {
                'year' : 2024,  #year_chosen,
                'user_profile_id': now_userProfile_id,
                'user_name': now_username,
                'user_firstname': now_firstname,
                'user_lastname': now_lastname,
                'user_customuser_id': now_customuser_id,
                'nr_tot_vacation_days': now_tot_vacation_days,
                'nr_tot_vacation_hours': now_tot_vacation_hours,
                'nr_working_h_per_day_100perc_pensum': now_nr_working_h_per_day_100perc_pensum,
            }
            # append the entries of the dictionaries
            now_dict.update(absence_grouped_duration_hours)
            now_dict.update(training_grouped_nr_courses)

            # final data
            final_data.append(now_dict)
            pass

        return (JsonResponse(final_data, safe=False))  # convert in JSON?


# ...............................................................................................................
class ComputeKpiYearlyManagerMyTeam(GenericAPIView):
    """
        Computes the KPI of the people the logged in user is manager of
    """

    year_chosen = 2024  # fixed year chosen


    # .....................................................................
    # fz to get the static details of the logged in user
    def get_serializer_user_class(self):
        return UserProfileSerializerAll

    def get_info_users(self):
        # can I get the list of the users I want?
        id_CustomUserHere = self.request.user.id

        pass

        # get the id in UserProfile with this customUser_id
        # the id of the manager is the id of the approver
        id_approverHere = UserProfile.objects.get(customUser_id=id_CustomUserHere).id

        pass

        # Subquery to get related_field values from RelatedModel
        # take the list of UserProfile id with the same approver as the logged in user -> it is a list
        queryset = UserProfile.objects.filter(approver=id_approverHere) #.values('id')

        pass

        # queryset = UserProfile.objects.filter(customUser_id=id_CustomUserHere)
        serializer_class = self.get_serializer_user_class()  # declare the class: needs to be done before
        serializer = serializer_class(queryset, many=True)  # need to put many=True for it to work: boh
        return Response(serializer.data)  # here it sees no data


    # .....................................................................
    # fz to get the list of absence requests for the team of the logged in user
    def get_serializer_absences_class(self):
        return AbsenceSerializerAll

    def get_absence_requests(self):
        # TODO: select only the year
        # can I get the list of the users I want?
        id_CustomUserHere = self.request.user.id

        pass

        # get the id in UserProfile with this customUser_id
        # the id of the manager is the id of the approver
        id_approverHere = UserProfile.objects.get(customUser_id=id_CustomUserHere).id

        pass

        # Subquery to get related_field values from RelatedModel
        # take the list of UserProfile id with the same approver as the logged in user -> it is a list
        subquery = UserProfile.objects.filter(approver=id_approverHere).values('id')

        queryset = AbsenceRequest.objects.filter(requester__in=Subquery(subquery))

        # get the id in UserProfile with this customUser_id
        # id_UserProfileHere = UserProfile.objects.get(customUser_id=id_CustomUserHere).id
        # queryset = AbsenceRequest.objects.filter(requester_id=id_UserProfileHere)  # TODO: add here the requests in the year
        serializer_class = self.get_serializer_absences_class()  # declare the class: needs to be done before
        serializer = serializer_class(queryset, many=True)  # need to put many=True for it to work: boh
        return Response(serializer.data)  # here it sees no data


    # .....................................................................
    # fz to get the list of training requests for the team of the logged in user
    def get_serializer_training_class(self):
        return TrainingSerializerEmployee

    def get_training_requests(self):
        # TODO: select only the year
        # can I get the list of the users I want?
        id_CustomUserHere = self.request.user.id

        # get the id in UserProfile with this customUser_id
        # the id of the manager is the id of the approver
        id_approverHere = UserProfile.objects.get(customUser_id=id_CustomUserHere).id

        # Subquery to get related_field values from RelatedModel
        # take the list of UserProfile id with the same approver as the logged in user -> it is a list
        subquery = UserProfile.objects.filter(approver=id_approverHere).values('id')

        queryset = TrainingRequest.objects.filter(requester_id__in=Subquery(subquery))

        pass  # check queryset

        #.........
        # get the id in UserProfile with this customUser_id
        # id_UserProfileHere = UserProfile.objects.get(customUser_id=id_CustomUserHere).id
        # queryset = TrainingRequest.objects.filter(requester_id=id_UserProfileHere)   # TODO: add here the requests in the year
        serializer_class = self.get_serializer_training_class()  # declare the class: needs to be done before
        serializer = serializer_class(queryset, many=True)  # need to put many=True for it to work: boh
        return Response(serializer.data)  # here it sees no data


    # ...........................................................
    # GET method
    def get(self, request, *args, **kwargs):
        """
        Here we get a list of objects where every object contains the static data of a user
        together with the total duration of the allowances of vacation, the vacations taken, the sickness leave taken
        and the training requested.
        This version works for the calendar 2024 only (hard-coded)
        """
        # get the list of the users -> list of json
        data_list_users = self.get_info_users().data  # data extracts the list of json

        # get the list of the absence requests with formatted data for the chosen user
        data_absence_requests = self.get_absence_requests().data

        # get the list of the training requests
        data_training_requests = self.get_training_requests().data

        # final_data: all same users -> sum on all
        final_data = []

        for user in data_list_users:
            # take the static var
            now_userProfile_id = user['id']
            now_username = user['customUser']['username']
            now_firstname = user['customUser']['first_name']
            now_lastname = user['customUser']['last_name']
            now_customuser_id = user['customUser']['id']

            # from time dep var
            try:
                now_tot_vacation_days = float([entry['value'] for entry in user['timeDepVars'] \
                                         if entry['variable'] == 'nr_tot_vacation_days'][0])
            except:
                # raise exception if not found
                message = f"PROBLEM: the user {now_username} does not have nr_tot_vacation_days"
                return HttpResponseServerError(f"Error: {message}")

            # to convert hours in days
            try:
                now_nr_working_h_per_day_100perc_pensum = float([entry['value'] for entry in user['timeDepVars'] \
                                                       if entry['variable'] == 'nr_working_hours_per_day_at100PercPensum'][0])
            except:
                # raise exception if not found
                message = f"PROBLEM: the user {now_username} does not have nr_working_hours_per_day_at100PercPensum"
                return HttpResponseServerError(f"Error: {message}")


            # converted into hours
            now_tot_vacation_hours = float(now_tot_vacation_days) * float(now_nr_working_h_per_day_100perc_pensum)

            # list of absence with requester.id = same here
            selected_absence = [abs for abs in data_absence_requests if abs['requester']['id'] == now_userProfile_id]

            # sum of the duration of the absence requests selected grouped by
            # list of unique cases of reason/status
            #list_reason_status = list(set([ entry['reason'] + '__' + entry['status'] for entry in selected_absence ]))
            absence_grouped_duration_hours = {}
            # Iterate through each record
            for now_abs in selected_absence:
                # Create a key from the category and region
                key = 'absence_duration_hours__' + now_abs["reason"] + '__' + now_abs["status"]

                # If the key is not in the dictionary, add it with a value of 0
                if key not in absence_grouped_duration_hours:
                    absence_grouped_duration_hours[key] = 0

                # Add the sales value to the corresponding key in the dictionary
                absence_grouped_duration_hours[key] += float(now_abs["durationWorkHours"])

            # here we have absence_grouped_duration_hours complete

            # list of trainings with requester.id = same here
            selected_training = [trai for trai in data_training_requests if
                                 trai['requester']['id'] == now_userProfile_id]

            # nr of trainings grouped by statusApproval / statusAdvancement
            training_grouped_nr_courses = {}
            # Iterate through each record
            for now_trai in selected_training:
                # Create a key from the category and region
                key = 'training_nr_courses__' + now_trai["statusApproval"] + '__' + now_trai["statusAdvancement"]

                # If the key is not in the dictionary, add it with a value of 0
                if key not in training_grouped_nr_courses:
                    training_grouped_nr_courses[key] = 0

                # Add the sales value to the corresponding key in the dictionary
                training_grouped_nr_courses[key] += 1

            # here we have training_grouped_nr_courses complete

            pass

            # save all the variables in final_data
            now_dict = {
                'year' : 2024,  #year_chosen,
                'user_profile_id': now_userProfile_id,
                'user_name': now_username,
                'user_firstname': now_firstname,
                'user_lastname': now_lastname,
                'user_customuser_id': now_customuser_id,
                'nr_tot_vacation_days': now_tot_vacation_days,
                'nr_tot_vacation_hours': now_tot_vacation_hours,
                'nr_working_h_per_day_100perc_pensum': now_nr_working_h_per_day_100perc_pensum,
            }
            # append the entries of the dictionaries
            now_dict.update(absence_grouped_duration_hours)
            now_dict.update(training_grouped_nr_courses)

            # final data
            final_data.append(now_dict)
            pass

        return (JsonResponse(final_data, safe=False))  # convert in JSON?



# ...............................................................................................................
class ComputeKpiYearlyMyCompany(GenericAPIView):
    """
        Computes the KPI of the people the logged in user is manager of
    """

    year_chosen = 2024  # fixed year chosen


    # .....................................................................
    # fz to get the static details of the logged in user
    def get_serializer_user_class(self):
        return UserProfileSerializerAll

    def get_info_users(self):
        # can I get the list of the users I want?
        id_CustomUserHere = self.request.user.id

        pass

        # id of company
        # get the field "company" for the logged in user
        company_idHere = UserProfile.objects.get(customUser_id=id_CustomUserHere).company


        # get the id in UserProfile with this customUser_id
        # the id of the manager is the id of the approver
        #id_approverHere = UserProfile.objects.get(customUser_id=id_CustomUserHere).id

        pass

        # Subquery to get related_field values from RelatedModel
        # take the list of UserProfile id with the same approver as the logged in user -> it is a list
        #queryset = UserProfile.objects.filter(approver=id_approverHere) #.values('id')
        queryset = UserProfile.objects.filter(company_id=company_idHere)  # .values('id')

        pass

        # queryset = UserProfile.objects.filter(customUser_id=id_CustomUserHere)
        serializer_class = self.get_serializer_user_class()  # declare the class: needs to be done before
        serializer = serializer_class(queryset, many=True)  # need to put many=True for it to work: boh
        return Response(serializer.data)  # here it sees no data


    # .....................................................................
    # fz to get the list of absence requests for the company of the logged in user
    def get_serializer_absences_class(self):
        return AbsenceSerializerAll

    def get_absence_requests(self):
        # TODO: select only the year
        # can I get the list of the users I want?
        id_CustomUserHere = self.request.user.id

        pass

        # get the id in UserProfile with this customUser_id
        # the id of the manager is the id of the approver
        #id_approverHere = UserProfile.objects.get(customUser_id=id_CustomUserHere).id

        # id of company
        # get the field "company" for the logged in user
        company_idHere = UserProfile.objects.get(customUser_id=id_CustomUserHere).company


        pass

        # Subquery to get related_field values from RelatedModel
        # take the list of UserProfile id with the same approver as the logged in user -> it is a list
        #subquery = UserProfile.objects.filter(approver=id_approverHere).values('id')
        subquery = UserProfile.objects.filter(company_id = company_idHere).values('id')

        queryset = AbsenceRequest.objects.filter(requester__in=Subquery(subquery))

        # get the id in UserProfile with this customUser_id
        # id_UserProfileHere = UserProfile.objects.get(customUser_id=id_CustomUserHere).id
        # queryset = AbsenceRequest.objects.filter(requester_id=id_UserProfileHere)  # TODO: add here the requests in the year
        serializer_class = self.get_serializer_absences_class()  # declare the class: needs to be done before
        serializer = serializer_class(queryset, many=True)  # need to put many=True for it to work: boh
        return Response(serializer.data)  # here it sees no data


    # .....................................................................
    # fz to get the list of training requests for the company of the logged in user
    def get_serializer_training_class(self):
        return TrainingSerializerEmployee

    def get_training_requests(self):
        # TODO: select only the year
        # can I get the list of the users I want?
        id_CustomUserHere = self.request.user.id

        # get the id in UserProfile with this customUser_id
        # the id of the manager is the id of the approver
        #id_approverHere = UserProfile.objects.get(customUser_id=id_CustomUserHere).id

        # id of company
        # get the field "company" for the logged in user
        company_idHere = UserProfile.objects.get(customUser_id=id_CustomUserHere).company

        # Subquery to get related_field values from RelatedModel
        # take the list of UserProfile id with the same approver as the logged in user -> it is a list
        #subquery = UserProfile.objects.filter(approver=id_approverHere).values('id')
        subquery = UserProfile.objects.filter(company_id=company_idHere).values('id')

        queryset = TrainingRequest.objects.filter(requester_id__in=Subquery(subquery))

        pass  # check queryset

        #.........
        # get the id in UserProfile with this customUser_id
        # id_UserProfileHere = UserProfile.objects.get(customUser_id=id_CustomUserHere).id
        # queryset = TrainingRequest.objects.filter(requester_id=id_UserProfileHere)   # TODO: add here the requests in the year
        serializer_class = self.get_serializer_training_class()  # declare the class: needs to be done before
        serializer = serializer_class(queryset, many=True)  # need to put many=True for it to work: boh
        return Response(serializer.data)  # here it sees no data


    # ...........................................................
    # GET method
    def get(self, request, *args, **kwargs):
        """
        Here we get a list of objects where every object contains the static data of a user
        together with the total duration of the allowances of vacation, the vacations taken, the sickness leave taken
        and the training requested.
        This version works for the calendar 2024 only (hard-coded)
        """
        # get the list of the users -> list of json
        data_list_users = self.get_info_users().data  # data extracts the list of json

        # get the list of the absence requests with formatted data for the chosen user
        data_absence_requests = self.get_absence_requests().data

        # get the list of the training requests
        data_training_requests = self.get_training_requests().data

        # final_data: all same users -> sum on all
        final_data = []

        for user in data_list_users:
            # take the static var
            now_userProfile_id = user['id']
            now_username = user['customUser']['username']
            now_firstname = user['customUser']['first_name']
            now_lastname = user['customUser']['last_name']
            now_customuser_id = user['customUser']['id']

            # from time dep var
            try:
                now_tot_vacation_days = float([entry['value'] for entry in user['timeDepVars'] \
                                         if entry['variable'] == 'nr_tot_vacation_days'][0])
            except:
                # raise exception if not found
                message = f"PROBLEM: the user {now_username} does not have nr_tot_vacation_days"
                return HttpResponseServerError(f"Error: {message}")

            # to convert hours in days
            try:
                now_nr_working_h_per_day_100perc_pensum = float([entry['value'] for entry in user['timeDepVars'] \
                                                       if entry['variable'] == 'nr_working_hours_per_day_at100PercPensum'][0])
            except:
                # raise exception if not found
                message = f"PROBLEM: the user {now_username} does not have nr_working_hours_per_day_at100PercPensum"
                return HttpResponseServerError(f"Error: {message}")


            # converted into hours
            now_tot_vacation_hours = float(now_tot_vacation_days) * float(now_nr_working_h_per_day_100perc_pensum)

            # list of absence with requester.id = same here
            selected_absence = [abs for abs in data_absence_requests if abs['requester']['id'] == now_userProfile_id]

            # sum of the duration of the absence requests selected grouped by
            # list of unique cases of reason/status
            #list_reason_status = list(set([ entry['reason'] + '__' + entry['status'] for entry in selected_absence ]))
            absence_grouped_duration_hours = {}
            # Iterate through each record
            for now_abs in selected_absence:
                # Create a key from the category and region
                key = 'absence_duration_hours__' + now_abs["reason"] + '__' + now_abs["status"]

                # If the key is not in the dictionary, add it with a value of 0
                if key not in absence_grouped_duration_hours:
                    absence_grouped_duration_hours[key] = 0

                # Add the sales value to the corresponding key in the dictionary
                absence_grouped_duration_hours[key] += float(now_abs["durationWorkHours"])

            # here we have absence_grouped_duration_hours complete

            # list of trainings with requester.id = same here
            selected_training = [trai for trai in data_training_requests if
                                 trai['requester']['id'] == now_userProfile_id]

            # nr of trainings grouped by statusApproval / statusAdvancement
            training_grouped_nr_courses = {}
            # Iterate through each record
            for now_trai in selected_training:
                # Create a key from the category and region
                key = 'training_nr_courses__' + now_trai["statusApproval"] + '__' + now_trai["statusAdvancement"]

                # If the key is not in the dictionary, add it with a value of 0
                if key not in training_grouped_nr_courses:
                    training_grouped_nr_courses[key] = 0

                # Add the sales value to the corresponding key in the dictionary
                training_grouped_nr_courses[key] += 1

            # here we have training_grouped_nr_courses complete

            pass

            # save all the variables in final_data
            now_dict = {
                'year' : 2024,  #year_chosen,
                'user_profile_id': now_userProfile_id,
                'user_name': now_username,
                'user_firstname': now_firstname,
                'user_lastname': now_lastname,
                'user_customuser_id': now_customuser_id,
                'nr_tot_vacation_days': now_tot_vacation_days,
                'nr_tot_vacation_hours': now_tot_vacation_hours,
                'nr_working_h_per_day_100perc_pensum': now_nr_working_h_per_day_100perc_pensum,
            }
            # append the entries of the dictionaries
            now_dict.update(absence_grouped_duration_hours)
            now_dict.update(training_grouped_nr_courses)

            # final data
            final_data.append(now_dict)
            pass

        return (JsonResponse(final_data, safe=False))  # convert in JSON?


