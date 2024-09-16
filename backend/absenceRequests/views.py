from django.db.models import Subquery
from django.shortcuts import render
from rest_framework import status

from rest_framework.response import Response
from rest_framework.generics import ListAPIView, GenericAPIView

# import models
from .models import AbsenceRequest
from userProfile.models import UserProfile
from timeDependentVar.models import TimeDependentVar
#from customUser import CustomUser  # to filter id

# serializers
from .serializers import AbsenceSerializerAll, AbsenceSerializerManager

# to do operations for the calculations of the duration
from datetime import datetime, date, timedelta

# to raise exceptions
from django.http import HttpResponseServerError
from django.core.exceptions import MultipleObjectsReturned # to check if got more objects with get -> timeDepVar day_Monday_startTime

# Create your views here.

# ..........................................................
# GET the requests of ALL users
class AbsenceGetAll(ListAPIView):
    """
    Retrieve the absence requests for all users
    """
    queryset = AbsenceRequest.objects.all()
    serializer_class = AbsenceSerializerAll


# .............................................................
class CreateListModifyAbsenceMeView(GenericAPIView):
    """
        Retrieve the list of all absence requests of the logged-in user (employee or manager)
    """

    # variables needed in more than 1 function: does it work?
    #id_CustomUserHere = self.request.user.id
    #id_userProfileGlobal = 0

    # define serializer for special cases
    def get_serializer_class(self):
        # if self.request.method == 'GET':
        #    return CustomUserSerializerPrivate  # private info
        # return CustomUserSerializerPublic  # PATCH -> only public patch according to the specifics
        return AbsenceSerializerAll  # simple by now


    # filter the logged-in user via the CustomUser table
    def get_queryset(self):
        # I want the entries of userProfile whose customUser_id = id of the CustomUser
        # get id of CustomUser where username=self.request.user
        id_CustomUserHere = self.request.user.id

        # get the id in UserProfile with this customUser_id
        id_UserProfileHere = UserProfile.objects.get(customUser_id=id_CustomUserHere).id

        # save in global var: does it work?
        #global id_userProfileGlobal
        #super.id_userProfileGlobal = id_UserProfileHere

        #pass

        # return the entries of the AbsenceRequest whose requester_id is = this above
        return AbsenceRequest.objects.filter(requester_id=id_UserProfileHere)
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
            Creates a new absence request for the logged-in employee.

           The requester_id is set automatically as the logged-in user.

            Possible reason:
                - vacation (default if not specified)
                - sick_leave

            The status gets set automatically:
                - if reason = sick_leave, then status = 'accepted' -> 'approved'
                - other reasons -> status = 'pending'

            Validations performed:
                - checked that startDt < endDt
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

        # put status = accepted if sick_leave, else pending
        # I need to put it here and not in the serializer bc the status does not get pushed
        # handle the case of reason not specified -> it is vacation
        try:
            if serializer.validated_data['reason'] in ['sick_leave']:
                #status_here = 'accepted'
                status_here = 'approved'  # fix 2024-07-27
            else:
                status_here = 'pending'
        except:
            # if here -> reason is not specified -> it is vacation
            status_here = 'pending'


        # +++START compute duration
        # compute the durationWorkHours and raise exceptions if needed

        # ++START take the data of this user: now hard coded
        # now_nrHoursInFullDay = 8.0
        # now_workTime = { 'Monday':  {'startTime': '10:00', 'endTime': '17:00'},
        #                 'Tuesday': {'startTime': '08:00', 'endTime': '17:00'},
        #                 'Friday': {'startTime': '13:00', 'endTime': '15:00'},
        #               }

        pass
        # take the entries of timeDependentVar model
        # hard coded the year by now
        list_tdVar = TimeDependentVar.objects.filter(user_id=id_UserProfileHere,
                                                     startDate__year=2024, endDate__year=2024
                                                     )
        pass


        # CHECK: add here a check if not found items of the selected user or if more than 1 is found
        try:
            # take the nr of working hours in a day -> get bc I know I have only 1
            now_nrHoursInFullDay = float(list_tdVar.get(variable__exact='nr_working_hours_per_day_at100PercPensum').value)
        except:
            message = "PROBLEM in timeDependentVar for the current user: the variable nr_working_hours_per_day_at100PercPensum is either not found or is multiple for 2024"
            #raise ValueError("PROBLEM in timeDependentVar for the current user: teh variable nr_working_hours_per_day_at100PercPensum is either not found or is multiple for 2024")
            return HttpResponseServerError(f"Error: {message}")

        pass

        try:
            # list with day_
            list_day = list_tdVar.filter(variable__startswith='day_')
            if not list_day.exists():
                message = 'PROBLEM in timeDependentVar for the current user and 2024: there is no variable of the type day_Monday_timeStart => Add them by hand'
                raise ValueError(message)
        except Exception as e:
            return HttpResponseServerError(f"Error: {e}")


        # search by day and build the obj
        now_workTime = {}

        # start by startTime and search endTime for the day only where startTime is found
        for loop_day in ('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'):
            here_var_start = 'day_' + loop_day + '_startTime'
            pass
            try:  # try is necessary, otherwise the get will get out
                # ATTENTION: if more than 1 entry, this will be skipped
                here_start = list_day.get(variable__exact=here_var_start).value  # here it is ok to skip if not found if not all days are present
                pass
                if len(here_start) > 0:
                    # search for here_end
                    here_var_end = 'day_' + loop_day + '_endTime'
                    here_end = list_day.get(variable__exact=here_var_end).value  # here it is ok if not all days are present
                    pass

                    if (len(here_end) > 0):
                        # add into the dictionary
                        now_workTime[loop_day] = {'startTime': here_start, 'endTime': here_end}
                        pass

            # handle the case of multiple start of days found -> tell the Front End
            except MultipleObjectsReturned:
                # Handle the case where more than one item is found
                message = f"ERROR: PROBLEM in timeDependentVar for the current user and 2024: a multiple entry of {here_var_start} is found -> FIX IT"
                return HttpResponseServerError(message)

            except:  # if not found it goes here
                pass

            # # ok if entries not found, we can have only some days
            # except:
            #     pass

            # if not found, it loops over the days

        # here now_workTime is complete
        pass

        # check if it has some entries, else raise an exception
        #now_workTime.clear() # test if exception is raised

        try:
            if (len(now_workTime) == 0):
                raise ValueError("PROBLEM: There is no entry of the type day_Monday_startTime or day_Monday_endTime or they do not match for the current user and for the year considered in the table timeDependentVar: Populate it first")  # Example of raising a ValueError
        except ValueError as e:
            # Handle the exception and return a custom error response
            return HttpResponseServerError(f"Error: {e}")

        pass

        # --END take the data of the user posting


        # START CALC day of the start and end
        dt_start = serializer.validated_data['startDt']  # now it is a date
        dt_end   = serializer.validated_data['endDt']  # now it is a date
        # remove tz info -> else comparison max and min do not work
        dt_start = dt_start.replace(tzinfo=None)
        dt_end = dt_end.replace(tzinfo=None)

        # make dates
        day_start = dt_start.date()  # now it is a date
        day_end = dt_end.date()
        delta = timedelta(days=1)

        # initialize duration
        now_durationWorkHours = 0.0
        now_durationWorkTimeFormatted = '-1d_-1h_-1m'  # put the default value

        # loop on the day
        # loop on the day
        curr_date = day_start  # initialize
        while curr_date <= day_end:
            print('\n')
            print(curr_date.strftime("%Y-%m-%d"))

            # day of the week converted into name
            curr_weekday = curr_date.strftime('%A')
            print(curr_weekday)

            # check what startTime and endTime today for work
            try:
                curr_workStartTime = now_workTime[curr_weekday]['startTime']
                curr_workEndTime = now_workTime[curr_weekday]['endTime']
                # print(curr_workStartTime, curr_workEndTime)
                pass

                # build dt of the start work today
                curr_dtStart_string = curr_date.strftime('%Y-%m-%d') + ' ' + curr_workStartTime + ':00'
                # print (curr_dtStart_string)
                today_dtStartWork_dt = datetime.strptime(curr_dtStart_string, '%Y-%m-%d %H:%M:%S')
                # print (curr_dtStart_dt)

                curr_dtEnd_string = curr_date.strftime('%Y-%m-%d') + ' ' + curr_workEndTime + ':00'
                today_dtEndWork_dt = datetime.strptime(curr_dtEnd_string, '%Y-%m-%d %H:%M:%S')

                # print('Work times: ', today_dtStartWork_dt, ' -> ', today_dtEndWork_dt)
                pass

                # here we compute the start to consider
                today_considerStart = max(dt_start, today_dtStartWork_dt)
                pass

                # compute the end in this day
                today_considerEnd = min(dt_end, today_dtEndWork_dt)
                pass

                # compute the duration in this day
                dur_today_hours = (today_considerEnd - today_considerStart).total_seconds() / 3600

                # add to now_durationWorkHours
                now_durationWorkHours += dur_today_hours


            except:
                #print('Not found start time')
                pass

            # go to next date
            curr_date += delta


        # print('\n***FINAL: total hours = ', now_durationWorkHours)
        # here we have now_durationWorkHours for the entire period
        pass

        # format in formatted
        here_intnr_days = int(now_durationWorkHours // now_nrHoursInFullDay)
        here_hours_left = now_durationWorkHours - here_intnr_days * now_nrHoursInFullDay
        here_inthours = int(here_hours_left)
        here_int_minutes = int(round((here_hours_left - here_inthours) * 60, 1))
        now_durationWorkTimeFormatted = f"{here_intnr_days}d_{here_inthours}h_{here_int_minutes}m"

        # print('*** FINAL formatted = ', now_durationWorkTimeFormatted)
        # print('MEMO: hours in a day = ', now_nrHoursInFullDay)

        pass

        # initialize
        # now_durationWorkHours = 0.0



        # format the duration as 3d_4h_15m -> durationWorkTimeFormatted

        # ---END compute duration



        # Push the data such that the requester id is the logged in user of UserProfile
        serializer.save(requester_id=id_UserProfileHere, status=status_here,
                        durationWorkHours=now_durationWorkHours,
                        durationWorkTimeFormatted=now_durationWorkTimeFormatted
                        )

        #pass

        return Response(serializer.data, status=status.HTTP_201_CREATED)


# .............................................................
class CreateListModifyAbsenceEmployeeMyTeamView(GenericAPIView):
    """
        Retrieve the list of all absence requests of all the users with the same approver as the logged-in person.
        The logged in person is included in the query.
        This is to be used when the logged in user is an employee.

        Next:
        - one endpoint for the manager: his team, his employees, his approver and the people with the same approver
    """
    pass

    # define serializer for special cases
    def get_serializer_class(self):
        # if self.request.method == 'GET':
        #    return CustomUserSerializerPrivate  # private info
        # return CustomUserSerializerPublic  # PATCH -> only public patch according to the specifics
        return AbsenceSerializerAll  # simple by now


    # filter the logged-in user via the CustomUser table
    # and extract the users with the same approver and add the approver
    def get_queryset(self):
        # I want the entries of userProfile whose customUser_id = id of the CustomUser
        # get id of CustomUser where username=self.request.user
        id_CustomUserHere = self.request.user.id

        # get the id in UserProfile with this customUser_id
        id_UserProfileHere = UserProfile.objects.get(customUser_id=id_CustomUserHere).id

        # SQL I NEED -> solved with subqueries
        """
         SELECT abs.* FROM AbsenceRequests as abs
         LEFT JOIN
         UserProfile as user
         ON abs.requester_id IN (
            SELECT us2.id
            FROM UserProfile as us2
            WHERE us2.approver_id = fixed value        
         )
        
        """

        # the userProfile id of the approver
        id_approverHere = UserProfile.objects.get(id=id_UserProfileHere).approver_id

        # USING THIS to study: https://docs.djangoproject.com/en/5.0/topics/db/queries/
        # Methods of the queryset = https://docs.djangoproject.com/en/5.0/ref/models/querysets/

        # Subquery to get related_field values from RelatedModel
        # take the list of UserProfile id with the same approver as the logged in user -> it is a list
        subquery = UserProfile.objects.filter(approver=id_approverHere).values('id')

        # Filter MyModel using the subquery
        # return the list of absence request with this filter
        return AbsenceRequest.objects.filter(requester__in=Subquery(subquery))



    # GET method
    def get(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)  # need to put many=True for it to work: boh
        # serializer_class = UserProfileSerializerAll # with this it does not work
        return Response(serializer.data)  # here it sees no data


# .............................................................
class CreateListModifyAbsenceEmployeeMyManagerView(GenericAPIView):
    """
        Retrieve the list of all absence requests of the approver of the logged-in user.
        This is for the employees.
    """

    # define serializer for special cases
    def get_serializer_class(self):
        # if self.request.method == 'GET':
        #    return CustomUserSerializerPrivate  # private info
        # return CustomUserSerializerPublic  # PATCH -> only public patch according to the specifics
        return AbsenceSerializerAll  # simple by now

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
        return AbsenceRequest.objects.filter(requester__in=Subquery(subquery))

    # GET method
    def get(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)  # need to put many=True for it to work: boh
        # serializer_class = UserProfileSerializerAll # with this it does not work
        return Response(serializer.data)  # here it sees no data


# .............................................................
class ListAbsenceManagerMyTeamView(GenericAPIView):
    """
        Retrieve the list of all absence requests of all the users whose approver is the logged-in user.
        The logged in person is excluded by this query.
    """


    # define serializer for special cases
    def get_serializer_class(self):
        # if self.request.method == 'GET':
        #    return CustomUserSerializerPrivate  # private info
        # return CustomUserSerializerPublic  # PATCH -> only public patch according to the specifics
        return AbsenceSerializerAll  # simple by now

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
        return AbsenceRequest.objects.filter(requester__in=Subquery(subquery))

    # GET method
    def get(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)  # need to put many=True for it to work: boh
        # serializer_class = UserProfileSerializerAll # with this it does not work
        return Response(serializer.data)  # here it sees no data

# .............................................................
class ModifyAbsenceManagerMyTeamView(GenericAPIView):
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
        return AbsenceSerializerManager
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
        return AbsenceRequest.objects.filter(requester__in=Subquery(subquery))



    # I need to create a different class?
    # TODO: how to accept partial update???
    # patch status only of my team
    def patch(self, request, *args, **kwargs):
        """
            The manager (approver) can modify only the status of the absences, not the other fields
            This operation uses the primary key of AbsenceRequest as pk in the URL.
            The absenceRequests modifiable are the ones selected by the method get_query and are already
            only the ones that the approver can approve.

            Validations done:
            - the approver cannot change the status of the Sick Leave (it is approved automatically)
            - only the status can be changed, the other fields are ignored without a warning

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

