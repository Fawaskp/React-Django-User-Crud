from django.urls import path
from .views import EmployeeView

urlpatterns = [
    path('',EmployeeView.as_view(),name="EmployeeLIst")
]