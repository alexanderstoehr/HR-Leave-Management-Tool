from django.urls import path

from companiesProfile.views import UserCompanyProfileView, RetrieveUpdateDeleteCompaniesProfileView, \
    ListCreateCompaniesProfileView

urlpatterns = [
    path('', ListCreateCompaniesProfileView.as_view()),
    path('<int:pk>/',  RetrieveUpdateDeleteCompaniesProfileView.as_view()),
    path('me/', UserCompanyProfileView.as_view()),
]