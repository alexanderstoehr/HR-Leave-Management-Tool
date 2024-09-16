from django.urls import path

from .views import (AbsenceGetAll, CreateListModifyAbsenceMeView,
                    CreateListModifyAbsenceEmployeeMyTeamView,
                    CreateListModifyAbsenceEmployeeMyManagerView,
                    ListAbsenceManagerMyTeamView,
                    ModifyAbsenceManagerMyTeamView
                    )

urlpatterns = [
    path('', AbsenceGetAll.as_view()),
    path('me/', CreateListModifyAbsenceMeView.as_view()),
    path('employee/myteam/', CreateListModifyAbsenceEmployeeMyTeamView.as_view()),
    path('employee/mymanager/', CreateListModifyAbsenceEmployeeMyManagerView.as_view()),
    path('manager/myteam/', ListAbsenceManagerMyTeamView.as_view()),
    path('manager/myteam/<int:pk>', ModifyAbsenceManagerMyTeamView.as_view()),
    # path('<int:pk>/', RecipeByIdView.as_view())
    # new comment
]