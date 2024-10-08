"""
Definition of urls for FeedSite.
"""

from datetime import datetime
from django.urls import path
from django.contrib import admin
from django.contrib.auth.views import LoginView, LogoutView
from django.utils.translation import gettext_lazy as _
from app import forms, views



urlpatterns = [
    #path('', views.home, name='home'),
    #path('contact/', views.contact, name='contact'),
    #path('about/', views.about, name='about'),
    #path('login/',views.login, name='login'),
    
    path('admin/', admin.site.urls),
    path("", views.login, name="login"),
    
    path('adminsys/', views.adminsys,name="adminsys"),
    path('admingroup/',views.admingroup, name="admingroup"),
    path('operator/', views.operator, name="operator"),



    path("loginuser/", views.loginuser),
    path('logoutuser/',views.logoutuser),
    path('checkauth/',views.checkauth),
    
    path("addgroup/", views.addgroup),
    path("adduser/", views.adduser),
    path("deluser/", views.deluser),
    path("getuserscount/", views.getuserscount),
    path("checkauthform/",views.checkauthform),
    path('getcatprod/',views.getcatprod),
    path('getparsestate/',views.getparsestate),
    path('startstoppars/',views.startstoppars),
]
