# Create your models here.
from django.utils.translation import gettext_lazy as _

from accounts.models import *


class Request(models.Model):
    class Status(models.TextChoices):
        PENDING = 'PEND', _('pending')
        WAIT = 'WAIT', _('Waiting for acceptance of the specialist from customer')
        IN_PROGRESS = 'PROG', _('In Progress')
        DONE = 'DONE', _('done')
        CANCELED = 'CNCL', _('Canceled')
        REJECTED = 'REJC', _('Rejected')

    customer = models.ForeignKey(Customer, null=False, blank=False, on_delete=models.DO_NOTHING)
    specialist = models.ForeignKey(Specialist, null=True, blank=True, on_delete=models.DO_NOTHING)
    requested_speciality = models.ForeignKey(Speciality, null=False, blank=False, on_delete=models.DO_NOTHING)
    requested_date = models.DateField(null=False, blank=False)
    description = models.TextField(null=True, blank=True)
    address = models.TextField(null=True, blank=True)
    status = models.CharField(max_length=4, choices=Status.choices, default=Status.PENDING)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    @classmethod
    def search(cls, query: dict):
        result = cls.objects

        if query.get('customer'):
            print(query.get('customer'))
            users = Customer.search(query.get('customer'))
            result = cls.objects.filter(customer__in=users)
        if query.get('specialist'):
            users = Specialist.search(query.get('specialist'))
            result = cls.objects.filter(specialist__in=users)
        if query.get('speciality'):
            specialities = Speciality.search(query.get('speciality'))
            result = cls.objects.filter(requested_speciality__in=specialities)
        for field in ['address', 'description']:
            if query.get(field):
                result = result.filter(**{field + "__icontains": query.get(field)})
        if query.get('date_from'):
            result = result.filter(requested_date__gte=query.get('date_from'))
        if query.get('date_to'):
            result = result.filter(requested_date__lte=query.get('date_to'))

        return result
