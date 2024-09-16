from django.db import models

from userProfile.models import UserProfile

# from jsonfield import JSONField  # testing for a json field

# Create your models here.
class TimeDependentVar(models.Model):
    id = models.AutoField(primary_key=True)

    startDate = models.DateField()
    endDate = models.DateField()

    POSSIBLE_VAR = [
        ('nr_tot_vacation_days', 'Total Vacation Days'),
        ('pensum_perc', 'Pensum %'),
        ('maternity_leave', 'Maternity Leave'),
        ('nr_working_hours_per_week', 'Working Hours per Week'),
        ('nr_working_hours_per_day_at100PercPensum', 'Nr of Working Hours per Day at 100% pensum to compute conversion of hours into days'),
        ('day_Monday_startTime', 'Monday Start Time of Work (HH:MM)'),
        ('day_Monday_endTime', 'Monday End Time of Work (HH:MM)'),
        ('day_Tuesday_startTime', 'Tuesday Start Time of Work (HH:MM)'),
        ('day_Tuesday_endTime', 'Tuesday End Time of Work (HH:MM)'),
        ('day_Wednesday_startTime', 'Wednesday Start Time of Work (HH:MM)'),
        ('day_Wednesday_endTime', 'Wednesday End Time of Work (HH:MM)'),
        ('day_Thursday_startTime', 'Thursday Start Time of Work (HH:MM)'),
        ('day_Thursday_endTime', 'Thursday End Time of Work (HH:MM)'),
        ('day_Friday_startTime', 'Friday Start Time of Work (HH:MM)'),
        ('day_Friday_endTime', 'Friday End Time of Work (HH:MM)'),
        ('day_Saturday_startTime', 'Saturday Start Time of Work (HH:MM)'),
        ('day_Saturday_endTime', 'Saturday End Time of Work (HH:MM)'),
        ('day_Sunday_startTime', 'Sunday Start Time of Work (HH:MM)'),
        ('day_Sunday_endTime', 'Sunday End Time of Work (HH:MM)'),
        # ('variousJSON', 'Various JSON'),  # added as test
    ]
    variable = models.CharField(max_length=50, choices=POSSIBLE_VAR, default='nr_tot_vacation_days')

    #value = models.FloatField() # done as float temporarily
    value = models.CharField(max_length=40)

    # value_json = JSONField()  # insert various values here

    # link to user profile: here it is many
    user = models.ForeignKey(to=UserProfile, related_name='timeDepVars', on_delete=models.CASCADE, default=1)
