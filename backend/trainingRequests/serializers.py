from rest_framework import serializers
from .models import TrainingRequest  # import the model here


# import UserProfile to get all the info of the user and manager
from userProfile.serializers import UserProfileSerializerAll, UserProfileSerializerByRequester


# ........................................................................
"""
    This is to be used by the employee sending the request of the training
"""
class TrainingSerializerEmployee(serializers.ModelSerializer):

    # overwrite the serializer: nested serializer
    requester = UserProfileSerializerAll(read_only=True)

    class Meta:
        # look at the CustomUser model and give me all the fields
        model = TrainingRequest
        #fields = '__all__'
        fields = ['id', 'requester', 'trainingUrl', 'title', 'description', 'price',
                  'statusApproval', 'statusAdvancement']
        # 'completionCertificate',
        # the following ones will not modified by the POST method
        read_only_fields = ['requester', 'statusApproval', 'statusAdvancement']
        #read_only_fields = ['requester', 'statusApproval', 'completionCertificate', 'statusAdvancement']


# ........................................................................
"""
    This is to be used by the employee when updating the status of 
    statusAdvancement or (completionCertificateId -> TODO)
"""
class TrainingSerializerEmployeeUpdate(serializers.ModelSerializer):

    # TODO: completionCertificateId implement after we have the DigitalOcean

    class Meta:
        # look at the CustomUser model and give me all the fields
        model = TrainingRequest
        #fields = '__all__'
        fields = ['id', 'statusApproval', 'statusAdvancement']
        # 'completionCertificate',
        # the following ones will not modified by the POST method
        read_only_fields = ['statusApproval']
        #read_only_fields = ['requester', 'statusApproval', 'completionCertificate', 'statusAdvancement']

    # validation: can change it only if statusApproval = approved
    def validate(self, data):
        # Access the instance being updated (with all fields, also the ones not passed)
        instance = self.instance

        # If statusApproval <> 'approved' -> not possible to change
        if (instance.statusApproval != 'approved'):
            raise serializers.ValidationError('You cannot change the statusAdvancement of a training not approved by your approver yet')
        else:
            return data


# ...............................................................................
"""
    This serializer is to be used with the manager:
    PATCH only the statusApproval and not the other fields
"""
class TrainingSerializerManager(serializers.ModelSerializer):

    # export also from UserProfile:
    # customUser id, company name, dept name, requester first_name and last_name, approver name and last name
    # userData = UserProfileSerializerAll(read_only=True) # many=True, read_only=True)
    #requesterData = UserProfileSerializerByRequester(read_only=True)  # many=True, read_only=True)

    class Meta:
        model = TrainingRequest
        fields = ['id', 'statusApproval'] #, 'requester', 'reason']
        #read_only_fields = ['reason']
        # read_only_fields = ['requester', 'reason', 'status']  # cannot be modified
        #fields = '__all__'
        #fields.append('userData')  # does not work
        # why is userData not printer???
        # test for debugging
        #depth = 1

    # apparently the data selected are already the ones in the query_selected in the view
    # def validate(self, data):
        # only change the ones of my team -> already like this in get_queryset
        # only accepted 'approved' or 'rejected' not pending -> but he can change his mind -> do not do it


        # # Access the instance being updated (with all fields, also the ones not passed)
        # instance = self.instance
        #
        # # If reason = 'sick_leave' -> not possible to change
        # if (instance.reason == 'sick_leave'):
        #     raise serializers.ValidationError('You cannot change the status of Sick Leave')
        # else:
        #     return data


    #def validate(self, data):
    #    if data['startDt'] >= data['endDt']:
    #        raise serializers.ValidationError("startDt must occur before endDt")
    #    return data

