# from rest_framework import serializers
#
#
# # import models
# from absenceRequests.models import AbsenceRequest
#
#
# # ......................................................................................
# # this is a TEST
# class KPISerializer(serializers.ModelSerializer):
#
#     # export also from UserProfile:
#     # customUser id, company name, dept name, requester first_name and last_name, approver name and last name
#     #userData = UserProfileSerializerAll(read_only=True) # many=True, read_only=True)
#     #requester = UserProfileSerializerByRequester(read_only=True)  # many=True, read_only=True)
#
#     # maybe there is more than 1 join and does not know which to use
#     # requester_id
#
#     # overwrite the serializer: nested serializer
#     #requester = UserProfileSerializerAll(read_only=True)
#
#     class Meta:
#         model = AbsenceRequest
#
#         pass
#
#         fields = ['id', 'requester',
#                   'startDt', 'endDt',
#                   'reason', 'status',
#                   'durationWorkHours', 'durationWorkTimeFormatted', # these are computed either in the view or in the serializer
#                   'dtCreated', 'dtUpdated'
#                   ]
#         read_only_fields = ['requester', 'status',
#                             'durationWorkHours', 'durationWorkTimeFormatted'  # uploaded in the phase of POST
#                             ]  # cannot be modified
#
#         pass
#
#         #fields = '__all__'
#         #fields.append('userData')  # does not work
#         # why is userData not printer???
#
#         # test for debugging
#         #depth = 1
#
#     def validate(self, data):
#
#         # check if start < end
#         if data['startDt'] >= data['endDt']:
#             raise serializers.ValidationError("startDt must occur before endDt")
#         return data
#
#         # check if durationWorkHour is > 0 and give feedback if wrong or in views??
#
