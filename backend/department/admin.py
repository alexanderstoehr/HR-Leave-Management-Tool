from django.contrib import admin

from .models import Department


# Register your models here.
@admin.register(Department)
class DepartmentAdmin(admin.ModelAdmin):
    #list_display = ('id', 'requesterId', 'reason', 'startDt', 'endDt', 'status')
    list_display = ('id', 'nameDepartment')
