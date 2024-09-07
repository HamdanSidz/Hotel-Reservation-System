from django.urls import path
from .import views


urlpatterns = [
    
    path('reservation',views.reservationCR),
    path('reservation/<int:pk>',views.reservationRUDs),
    path('reservation/availability',views.availability),

    
]
