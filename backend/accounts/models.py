from django.contrib.auth.models import AbstractUser
from django.db import models
from phone_field import PhoneField


class User(AbstractUser):
    phone = PhoneField(blank=False, null=False, verbose_name=u"شماره تلفن همراه")
    pass


class Customer(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)


class Specialist(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)


class CompanyManager(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)


class TechnicalManager(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
