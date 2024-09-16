from django.contrib import admin

from .models import CompaniesProfile

# Register your models here.
@admin.register(CompaniesProfile)
class CompaniesProfileAdmin(admin.ModelAdmin):
    #list_display = ('id', 'requesterId', 'reason', 'startDt', 'endDt', 'status')
    list_display = ('id', 'companyName')

