from django.contrib import admin

from .models import TrainingRequest


# Register your models here.
@admin.register(TrainingRequest)
class TrainingRequestsAdmin(admin.ModelAdmin):
    #list_display = ('id', 'requesterId', 'reason', 'startDt', 'endDt', 'status')
    list_display = ('id', 'requester', 'title', 'trainingUrl', 'price', 'statusApproval', 'statusAdvancement')

