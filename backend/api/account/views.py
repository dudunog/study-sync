from django.shortcuts import get_object_or_404, render
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from account.serializers import ScheduleSerializer
from account.models import Schedule

@api_view(['GET', 'POST'])
def schedules(request):
    if request.method == 'GET':
        schedules = Schedule.objects.all()
        serializer = ScheduleSerializer(schedules, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = ScheduleSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer._errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
def schedule_detail(request, pk):
    schedule = get_object_or_404(Schedule, pk=pk)
    if request.method == 'GET':
        serializer = ScheduleSerializer(schedule)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = ScheduleSerializer(schedule, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer._errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        schedule.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)