from .models import Employee
from .serializers import EmployeeSerializer
from rest_framework.views import APIView
from rest_framework.response import Response

class EmployeeView(APIView):

    def get(self,request):
        output = [
            {"name":output.name,
             "department":output.department} 
            for output in Employee.objects.all()
            ]
        return Response(output)
    
    def post(self,request):
        serializer = EmployeeSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True): 
            serializer.save()
        return Response(serializer.data)

    