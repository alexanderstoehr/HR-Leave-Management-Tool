from django.contrib import admin

from .models import AbsenceRequest

# Register your models here.
@admin.register(AbsenceRequest)
class AbsenceRequestsAdmin(admin.ModelAdmin):
    #list_display = ('id', 'requesterId', 'reason', 'startDt', 'endDt', 'status')
    list_display = ('id', 'requester', 'reason', 'startDt', 'endDt', 'status')

