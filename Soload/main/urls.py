from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('login/', views.login, name='login'),
    path('signup/', views.signup, name='signup'),
    path('placeinfo/', views.placeinfo, name='placeinfo'),
    path('createreview/', views.createreview, name='createreview'),
    path('mypage/', views.mypage, name='mypage'),
    path('start/', views.start, name='start'),
]