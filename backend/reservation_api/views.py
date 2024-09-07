from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from .models import  RoomType, Room, Reservation
from .serializers import RoomTypeSerializer, RoomSerializer, ReservationSerializer
from django.db.models import Sum

# Create your views here.


def chechAvailability(request):

    room_type_requested = request.data.get('room_type')
    #print(room_type_requested)
    check_in_date = request.data.get('in_date')
    check_out_date = request.data.get('out_date')
    no_rooms_requested = request.data.get('number_of_rooms')
    #print(no_rooms_requested,".......................18")

    if not room_type_requested or not check_in_date or not check_out_date:
        return {'error': 'Invalid data'}

    try:
        room_type_y_n = RoomType.objects.get(type_name=room_type_requested)
    except RoomType.DoesNotExist:
        return {'error': 'Room type not found'}

    # Rooms of the requested type
    rooms_of_type = Room.objects.filter(room_type=room_type_y_n)
    
    # Counting total number of rooms of this type
    total_rooms_of_type = rooms_of_type.count()

    #print(total_rooms_of_type)

    # Reservations that overlap with the desired date range for rooms of type
    overlapping_reservations = Reservation.objects.filter(
    room_type=room_type_y_n,
    out_date__gt=check_in_date,
    in_date__lt=check_out_date,
    ).aggregate(
        total_rooms_booked_for_specific_range_date_required_by_guest = Sum('number_of_rooms')
    )

    total_rooms = overlapping_reservations['total_rooms_booked_for_specific_range_date_required_by_guest'] or 0

    #print("total_rooms_booked_for_specific_range_date_required_by_guest:", total_rooms)

    available_rooms = total_rooms_of_type - total_rooms   # from database checking availabiity
    #print("49....",available_rooms)
    if available_rooms > 0:
        no_of_room_available = available_rooms - int(no_rooms_requested)   # requested no_of_room checking availability from database
        #print("52....",no_of_room_available)
        if no_of_room_available >= 0:
            return {'available_rooms': no_of_room_available}
        else:
            return {'error': 'No Room(s) Available for Given Date Range & Room Type or IN DATE > OUT DATE '}
    else:
        return {'error': 'No Room(s) Available for Given Date Range & Room Type or IN DATE > OUT DATE '}


@api_view(['GET','POST'])
def availability(request):

    if request.method == 'GET':
        reservations = Reservation.objects.all()
        reservationSerializer = ReservationSerializer(reservations , many=True)
        return Response(reservationSerializer.data)
        #return Response({'message': 'Check Rooms Availability Accordingly To Your Dates'})

    elif request.method == 'POST':

        message = chechAvailability(request)

    try:
        if message['error']:
            return Response({'error': 'Room(s) not Available for Given Date Range & Room Type'}, status=status.HTTP_404_NOT_FOUND)
    except KeyError:
        return Response({'message': 'Reservation Available for Selected Date'}, status=status.HTTP_201_CREATED)
        


@api_view(['GET' , 'POST'])
def reservationCR(request):

    if request.method == 'GET':
        reservations = Reservation.objects.all()
        reservationSerializer = ReservationSerializer(reservations , many=True)
        return Response(reservationSerializer.data)

    elif request.method == 'POST':
 
        print(request.data.get('guest_name'))
        print(request.data.get('guest_contact'))
        
        message = chechAvailability(request)

        try:
            if message['error']:
                return Response({'error': 'No Room(s) Available for Given Date Range & Room Type'}, status=status.HTTP_404_NOT_FOUND)
        except KeyError:
            reservationSerializer = ReservationSerializer(data = request.data)
            if reservationSerializer.is_valid():
                reservationSerializer.save()
                return Response({'message': 'Reservation Booked Successfully'}, status=status.HTTP_201_CREATED)
        
            return Response(reservationSerializer.errors)



@api_view(['GET', 'PUT', 'DELETE'])
def reservationRUDs(request, pk):

    try:
        reservation = Reservation.objects.get(pk=pk)
    except Reservation.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    if request.method == 'GET':

        reservationSerializer = ReservationSerializer(reservation)
        return Response(reservationSerializer.data)

    elif request.method == 'PUT':

        message = chechAvailability(request)
        
        try:
            if message['error']:
                return Response({'error': 'No Room(s) Available for Given Date Range & Room Type'}, status=status.HTTP_404_NOT_FOUND)
        except KeyError:
            reservationSerializer = ReservationSerializer(reservation, data = request.data)
            if reservationSerializer.is_valid():
                reservationSerializer.save()
                return Response({'message': 'Reservation Updated Successufully'}, status=status.HTTP_201_CREATED)
    
            return Response(reservationSerializer.errors)


    elif request.method == 'DELETE':
        
        reservation.delete()
        return Response({'deleted successfully': "done"},status=status.HTTP_204_NO_CONTENT)

