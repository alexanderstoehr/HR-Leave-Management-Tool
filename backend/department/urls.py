from django.urls import path

from department.views import UserDepartmentView, ListCreateDepartmentsView, RetrieveUpdateDeleteDepartmentsView

urlpatterns = [
    path('', ListCreateDepartmentsView.as_view()),
    path('<int:pk>/', RetrieveUpdateDeleteDepartmentsView.as_view()),
    path('me/', UserDepartmentView.as_view()),
]