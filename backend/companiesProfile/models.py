from django.db import models


# Create your models here.
class CompaniesProfile(models.Model):

    id = models.AutoField(primary_key=True)
    companyName = models.CharField(max_length=100)
    # link to media
    # companyLogoId =

    # join to user in the UserProfile -> many is there

    def __str__(self):
        return self.companyName