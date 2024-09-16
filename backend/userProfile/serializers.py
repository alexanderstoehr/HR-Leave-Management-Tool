from rest_framework import serializers

from timeDependentVar.serializers import TimeDependentVarSerializer
from .models import UserProfile

# other serializers for other fields
from customUser.serializers import CustomUserSerializerPrivate
from companiesProfile.serializers import CompaniesProfileSerializer
from department.serializers import DepartmentSerializer

# get custom model
# customUser = get_user_model()


#  ..........................................................
# this serializer below is needed to fetch the data of the approver
class UserProfileSerializerByApprover(serializers.ModelSerializer):
    # nest here from CustomUser: first_name, last_name
    customUser = CustomUserSerializerPrivate(read_only=True)
    class Meta:
        model = UserProfile
        fields = [ 'customUser' ]


# ..........................................................
class UserProfileSerializerAll(serializers.ModelSerializer):

    # nest here from CustomUser: first_name, last_name -> DONE
    # nest here from companiesProfile: nameCompany -> DONE
    # nest here from department: nameDepartment -> DONE
    # nest from UserProfile: first_name e last_name of the approver -> DONE

    # NB: in order for it to work we need the SAME NAMES as one of the fields
    customUser = CustomUserSerializerPrivate(read_only=True)
    company = CompaniesProfileSerializer(read_only=True)
    department = DepartmentSerializer(read_only=True)
    approver = UserProfileSerializerByApprover(read_only=True)  #  test
    timeDepVars = TimeDependentVarSerializer(many=True, read_only=True)

    class Meta:
        model = UserProfile
        fields = ['id', 'customUser', 'approver',\
                  'company', 'department',\
                  'canton', 'city', 'street', 'postcode', 'phone', \
                  'birthdayDate', 'firstDayAtWork',\
                  'gender', 'timeDepVars'\
                  ]


#  ..........................................................
# this serializer below is needed to fetch the data of the approver of
# AbsenceRequest and TrainingRequest
# MAYBE NOT NEEDED
class UserProfileSerializerByRequester(serializers.ModelSerializer):

    #pass

    """
    # nest here from CustomUser: first_name, last_name
    customUser = CustomUserSerializerPrivate(read_only=True)
    """

    class Meta:
        model = UserProfile
        #fields = '__all__'
        fields = [ 'id' ]
