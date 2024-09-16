from django.db import models

from userProfile.models import UserProfile


# Create your models here.
class AbsenceRequest(models.Model):
    id = models.AutoField(primary_key=True)

    # TODO:
    requester = models.ForeignKey(to=UserProfile, related_name='absenceRequest_related', on_delete=models.CASCADE, default=1)

    startDt = models.DateTimeField()
    endDt = models.DateTimeField()

    ABSENCE_REASONS = [
        ('vacation', 'Vacation'),
        ('sick_leave', 'Sick Leave'),
    ]

    #reason = models.CharField(max_length=300)
    reason =  models.CharField(max_length=11, choices=ABSENCE_REASONS, default='vacation')


    STATUS_APPROVAL = [
        ('pending', 'Pending'),
        ('approved', 'Approved'),
        ('rejected', 'Rejected'),
    ]
    status = models.CharField(max_length=11, choices=STATUS_APPROVAL, default='pending')

    # duration computed by the serializer
    durationWorkHours = models.FloatField(default=-1.0)  # duration in hours as float: only the duration in the hours of work are considered
    durationWorkTimeFormatted = models.CharField(max_length=30, default='-1d_-1h_-1m')  # duration in format 2d_3h_15m --> easy to display in front end


    # TODO: relate to the MediaLink table
    #attachmentsId =

    dtCreated = models.DateTimeField(auto_now_add=True)
    dtUpdated = models.DateTimeField(auto_now=True)
