from rest_framework import serializers
from .models import RoomType, Room, Reservation





class RoomTypeSerializer(serializers.ModelSerializer):

    class Meta:
        model = RoomType
        fields = ['type_name', 'rate']



class RoomSerializer(serializers.ModelSerializer):

    class Meta:
        model = Room
        fields = ['room_id', 'room_type', 'room_number' ]


class ReservationSerializer(serializers.ModelSerializer):

    class Meta:
        model = Reservation
        fields = ['reservation_id', 'guest_name', 'guest_contact', 'room_type', 'in_date', 'out_date', 'number_of_rooms']
