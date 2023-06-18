from .serializers import  UserSerializer,MyTokenObtainPairSerializer
from .models import User
from rest_framework.views import APIView
from rest_framework.generics import  ListCreateAPIView,RetrieveUpdateDestroyAPIView,CreateAPIView
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView

    
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

class UserRegister(CreateAPIView):
    serializer_class = UserSerializer

class UserList(ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class UserDetails(RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    lookup_field = 'id'



