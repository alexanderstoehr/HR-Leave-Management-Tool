from django.contrib import admin

from django.contrib.auth import get_user_model
from django.contrib.auth.admin import UserAdmin

# Register your models here.
CustomUser = get_user_model()


class CustomUserAdmin(UserAdmin):
    # fields shown when creating a new instance
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'username', 'password1', 'password2')}
         ),
    )

    # fields when reading / updating an instance (GET/PATCH)
    fieldsets = (
        (None, {'fields': ('email', 'username', 'password')}),
        ('Personal info', {'fields': ('first_name', 'last_name', 'avatar')}),
        ('Permissions', {'fields': ('is_active', 'is_staff', 'is_superuser', 'user_permissions')}),
        ('Important dates', {'fields': ('last_login', 'date_joined')}),
        ('Groups', {'fields': ('groups',)}),
    )


# registering this model -> possible also via a decorator (see notes week 16)
# admin.site.register(User, UserAdmin)
admin.site.register(CustomUser, CustomUserAdmin)
