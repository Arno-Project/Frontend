from django.contrib.auth import login
from django.views import View
from rest_framework import response
from knox.auth import TokenAuthentication
from rest_framework.permissions import IsAuthenticated

from .models import User, Specialist, Customer

from .serializers import SpecialistRegisterSerializer, CustomerRegisterSerializer, RegisterSerializer, \
    SpecialistFullSerializer, CustomerFullSerializer, UserFullSerializer

from rest_framework.authtoken.serializers import AuthTokenSerializer
from knox.models import AuthToken
from knox.views import LoginView as KnoxLoginView
from rest_framework import generics, permissions, status
from rest_framework.response import Response


# Create your views here.
class RegisterView(generics.GenericAPIView):

    def get_serializer_class(self):
        role = self.kwargs.get('role')
        if role == 'specialist':
            return SpecialistRegisterSerializer
        elif role == 'customer':
            return CustomerRegisterSerializer
        else:
            return RegisterSerializer

    def post(self, request, *args, **kwargs):
        role = self.kwargs.get('role')
        self.serializer_class = self.get_serializer_class()
        serializer = self.get_serializer(data=request.data)

        if User.objects.filter(email=request.data['email']).exists():
            return Response({
                'email': ['user with this email address already exists.']
            }, status=status.HTTP_400_BAD_REQUEST)

        serializer.is_valid(raise_exception=True)
        user = serializer.save()

        return Response({
            'user': (SpecialistFullSerializer if role == 'specialist' else CustomerFullSerializer)(user).data,
            'role': role,
            'token': AuthToken.objects.create(user.user)[1]
        })


class LoginView(KnoxLoginView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        serializer = AuthTokenSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        login(request, user)

        res = super(LoginView, self).post(request, format=None)
        if res.status_code == 200:
            return Response({
                **res.data,
                'user': UserFullSerializer(user).data,
            })
        return res
