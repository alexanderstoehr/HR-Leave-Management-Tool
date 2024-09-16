from rest_framework import serializers
from .models import CustomUser  # import the model here

class CustomUserSerializerPrivate(serializers.ModelSerializer):
    class Meta:
        # look at the CustomUser model and give me all the fields
        model = CustomUser
        #fields = '__all__'
        fields = ['id', 'username', 'email',\
                  'first_name', 'last_name', 'avatar'\
                  ]
        #exclude = ['password']

    pass
