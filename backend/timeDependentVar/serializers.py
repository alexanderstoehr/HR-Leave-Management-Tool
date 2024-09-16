from rest_framework import serializers

from timeDependentVar.models import TimeDependentVar


class TimeDependentVarSerializer(serializers.ModelSerializer):
    class Meta:
        model = TimeDependentVar
        fields = '__all__'