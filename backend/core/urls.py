from django.urls import path

from .views import RequestSearchView

urlpatterns = [
    path('request/serach/', RequestSearchView.as_view(), name='request_search'),
]
