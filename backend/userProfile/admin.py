from django.contrib import admin

from .models import UserProfile

# Register your models here.
@admin.register(UserProfile)
class UserProfileAdmin(admin.ModelAdmin):
    #list_display = ('id', 'requesterId', 'reason', 'startDt', 'endDt', 'status')
    list_display = ('id', 'customUser', 'company', 'department', 'approver', 'isCompanyAdmin')

