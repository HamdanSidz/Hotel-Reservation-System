from django.contrib import admin
from .models import RoomType, Room, Reservation



@admin.register(RoomType)
class RoomTypeAdmin(admin.ModelAdmin):
    list_display = ('type_name', 'rate')

@admin.register(Room)
class RoomAdmin(admin.ModelAdmin):
    list_display = ('room_id', 'room_type', 'room_number')

@admin.register(Reservation)
class ReservationAdmin(admin.ModelAdmin):
    list_display = ('reservation_id', 'guest_name', 'guest_contact' ,'room_type' , 'in_date', 'out_date', 'number_of_rooms')
