from django.urls import path

from accounts.views import RegisterView, LoginView, MyAccountView

urlpatterns = [
    path('register/<slug:role>/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('my-account/', MyAccountView.as_view(), name='my-account'),

]
