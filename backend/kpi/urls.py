from django.urls import path


from .views import ComputeKpiYearlyMe, ComputeKpiYearlyManagerMyTeam, ComputeKpiYearlyMyCompany


urlpatterns = [
    #path('me/', calculate_kpi, name='calculate_kpi'),
    path('yearly/me/', ComputeKpiYearlyMe.as_view()),
    path('yearly/manager/myteam/', ComputeKpiYearlyManagerMyTeam.as_view()),
    path('yearly/mycompany/', ComputeKpiYearlyMyCompany.as_view()),
]