from django.urls import path

from timeDependentVar.views import UserProfileDetailView, LoggedInUserProfileDetailView

urlpatterns = [
    path('<str:customUser__username>/', UserProfileDetailView.as_view()),
    path('', LoggedInUserProfileDetailView.as_view()),
]