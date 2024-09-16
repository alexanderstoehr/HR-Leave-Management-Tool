from django.contrib import admin

from .models import TimeDependentVar

# Register your models here.
@admin.register(TimeDependentVar)
class TimeDependentVarAdmin(admin.ModelAdmin):
    #list_display = ('id', 'requesterId', 'reason', 'startDt', 'endDt', 'status')
    list_display = ('id', 'user', 'startDate', 'endDate', 'variable', 'value')


