from django.db import models

from userProfile.models import UserProfile


# Create your models here.
class TrainingRequest(models.Model):
    id = models.AutoField(primary_key=True)

    #
    requester = models.ForeignKey(to=UserProfile, related_name='trainingRequest', on_delete=models.CASCADE, default=1)

    title = models.CharField(max_length=300)
    trainingUrl = models.CharField(max_length=500)
    description = models.TextField(blank=True, null=True)  # 2024-07-28

    #price = models.IntegerField()
    price = models.DecimalField(max_digits=10, decimal_places=2)

    STATUS_APPROVAL = [
        ('pending', 'Pending'),
        ('approved', 'Approved'),
        ('rejected', 'Rejected'),
    ]
    statusApproval = models.CharField(max_length=11, choices=STATUS_APPROVAL, default='pending')

    # TODO: relate to MediaLink table
    # or call it AttachmentId
    # completionCertificateId =

    STATUS_ADVANCEMENT = [
        ('notStarted', 'Not Started'),
        ('ongoing', 'Ongoing'),
        ('finished', 'Finished'),
    ]
    statusAdvancement = models.CharField(max_length=11, choices=STATUS_ADVANCEMENT, default='notStarted')

    dtCreated = models.DateTimeField(auto_now_add=True)
    dtUpdated = models.DateTimeField(auto_now=True)
