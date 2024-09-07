from django.db import models
from django.utils import timezone
from django.core.validators import RegexValidator


class RoomType(models.Model):
    type_name = models.CharField(max_length=25, unique=True, primary_key=True)
    rate = models.DecimalField(max_digits=10, decimal_places=2)


class Room(models.Model):
    room_id = models.AutoField(primary_key=True)
    room_type = models.ForeignKey(RoomType, on_delete=models.CASCADE, default="Single")  # Using type_name as ForeignKey
    room_number = models.CharField(max_length=12)


class Reservation(models.Model):
    reservation_id = models.AutoField(primary_key=True)
    guest_name = models.CharField(max_length=50,default="Manager")
    guest_contact = models.CharField(
        max_length=12,
        validators=[RegexValidator(regex=r'^\d{4}-\d{7}$', message='Phone number must be in the format: 0300-8108108')]
    )
    room_type = models.ForeignKey(RoomType, on_delete=models.CASCADE, default="Single")  # Using type_name as ForeignKey
    in_date = models.DateField(default=timezone.now)
    out_date = models.DateField()
    number_of_rooms = models.IntegerField()



"""
{
    "guest": 1,
    "room_type":1,
    "in_date": "2024-07-01",
    "out_date": "2024-07-10",
    "number_of_rooms": 2
}
"""


