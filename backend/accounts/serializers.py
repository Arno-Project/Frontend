from django.contrib.auth.hashers import make_password
from rest_framework.serializers import ModelSerializer
from accounts.models import User, Customer, Specialist, TechnicalManager, CompanyManager


class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'phone')


class UserFullSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'phone', 'first_name', 'last_name', 'date_joined', 'last_login')


class CustomerSerializer(ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = Customer
        fields = ('id', 'user')


class SpecialitySerializer(ModelSerializer):
    class Meta:
        model = Specialist
        fields = ('id', 'name')


class CustomerFullSerializer(ModelSerializer):
    user = UserFullSerializer()

    class Meta:
        model = Customer
        fields = ('id', 'user')


class SpecialistSerializer(ModelSerializer):
    user = UserSerializer()
    speciality = SpecialitySerializer()

    class Meta:
        model = Specialist
        fields = ('id', 'user','speciality')


class SpecialistFullSerializer(ModelSerializer):
    user = UserFullSerializer()

    class Meta:
        model = Specialist
        fields = ('id', 'user')


class CompanyManagerSerializer(ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = CompanyManager
        fields = ('id', 'user')


class TechnicalManagerSerializer(ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = TechnicalManager
        fields = ('id', 'user')


class RegisterSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'first_name', 'last_name', 'password', 'phone')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(
            validated_data['username'], validated_data['email'], validated_data['password'],
            phone=validated_data['phone'],
            first_name=validated_data['first_name'], last_name=validated_data['last_name'])
        user.save()
        return user


class CustomerRegisterSerializer(RegisterSerializer):
    class Meta(RegisterSerializer.Meta):
        pass

    def create(self, validated_data):
        user = super().create(validated_data)
        customer = Customer.objects.create(user=user)
        return customer


class SpecialistRegisterSerializer(RegisterSerializer):
    class Meta(RegisterSerializer.Meta):
        pass

    def create(self, validated_data):
        user = super().create(validated_data)
        specialist = Specialist.objects.create(user=user)
        return specialist
