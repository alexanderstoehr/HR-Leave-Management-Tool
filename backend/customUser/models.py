from django.db import models

from django.contrib.auth.models import AbstractUser


def user_directory_path(instance, filename):
    return f'{instance.id}/avatars/{filename}'


# Create your models here.
class CustomUser(AbstractUser):
    # Field used for authentication
    USERNAME_FIELD = 'email'

    # Additional fields required when using createsuperuser (USERNAME_FIELD and passwords are always required)
    REQUIRED_FIELDS = ['username']

    # a single email can create only 1 account
    email = models.EmailField(unique=True)

    # avatar, but user can also be without one
    avatar = models.ImageField(upload_to=user_directory_path, blank=True, null=True)

    def __str__(self):
        return self.username

