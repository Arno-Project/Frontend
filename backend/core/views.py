import json

from django.http import JsonResponse
from knox.auth import TokenAuthentication
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated

from core.models import Request
from core.serializers import RequestSerializer


# Create your views here.


class RequestSearchView(generics.GenericAPIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):

        print(request.GET)
        requests = Request.search(json.loads(request.GET.get('q')))
        serialized = RequestSerializer(requests, many=True)
        return JsonResponse(serialized.data, safe=False)
