from django.urls import path

from .views import (TrainingGetAll,
                    CreateListModifyTrainingMeView,
                    CreateListModifyTrainingEmployeeMyTeamView,
                    CreateListModifyTrainingEmployeeMyManagerView,
                    ListTrainingManagerMyTeamView,
                    ModifyTrainingManagerMyTeamView,
                    ModifyTrainingMeView
                    )

urlpatterns = [
    path('', TrainingGetAll.as_view()),
    path('me/', CreateListModifyTrainingMeView.as_view()),
    path('me/<int:pk>', ModifyTrainingMeView.as_view()),

    path('employee/myteam/', CreateListModifyTrainingEmployeeMyTeamView.as_view()),
    path('employee/mymanager/', CreateListModifyTrainingEmployeeMyManagerView.as_view()),

    path('manager/myteam/', ListTrainingManagerMyTeamView.as_view()),
    path('manager/myteam/<int:pk>', ModifyTrainingManagerMyTeamView.as_view())

    # path('<int:pk>/', RecipeByIdView.as_view())
]