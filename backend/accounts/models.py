from django.contrib.auth.models import AbstractUser
from django.db import models
from django.db.models import Q
from phone_field import PhoneField


class User(AbstractUser):
    phone = PhoneField(blank=False, null=False, verbose_name=u"شماره تلفن همراه")

    @classmethod
    def search(cls, query: dict, is_customer=False, is_specialist=False, is_company_manager=False,
               is_technical_manager=False):
        result = cls.objects
        if is_customer:
            result.filter(customer__isnull=False)
        elif is_specialist:
            result.filter(specialist__isnull=False)
        elif is_company_manager:
            result.filter(company_manager__isnull=False)
        elif is_technical_manager:
            result.filter(technical_manager__isnull=False)

        for field in ['first_name', 'last_name', 'phone']:
            if query.get(field):
                result = result.filter(Q(**{field + '__icontains': query[field]}))
        if query.get('username'):
            result = result.filter(Q(username__eq=query['username']))
        # filter User objects that exist in Customer Table

        return result


class Customer(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)

    @classmethod
    def search(cls, query):
        result = User.search(query, is_customer=True)
        result =cls.objects.filter(user__in=result)
        return result


class Speciality(models.Model):
    name = models.CharField(max_length=100, verbose_name=u"نام تخصص")

    @classmethod
    def search(cls,query):
        result = cls.objects
        for field in ['name']:
            if query.get(field):
                result = result.filter(Q(**{field + '__icontains': query[field]}))


class Specialist(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    speciality = models.ManyToManyField(Speciality, blank=True, null=True)

    @classmethod
    def search(cls, query):
        result = User.search(query, is_specialist=True)
        result = cls.objects.filter(user__in=result)
        for field in ['speciality']:
            if query.get(field):
                result = result.filter(Q(**{'specialist__' + field + '__icontains': query[field]}))
        return result


class CompanyManager(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)

    @classmethod
    def search(cls, query):
        result = User.search(query, is_company_manager=True)
        result = cls.objects.filter(user__in=result)
        return result


class TechnicalManager(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)

    @classmethod
    def search(cls, query):
        result = User.search(query, is_technical_manager=True)
        result = cls.objects.filter(user__in=result)
        return result
