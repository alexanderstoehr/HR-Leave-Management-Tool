from django.db import models


# Create your models here.
class Department(models.Model):
    id = models.AutoField(primary_key=True)
    nameDepartment = models.CharField(max_length=100)

    # link to User in the user: many there

    def __str__(self):
        return self.nameDepartment
