from django.urls import path

from accounts.views import RegisterView, LoginView

urlpatterns = [
    path('register/<slug:role>/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
]
