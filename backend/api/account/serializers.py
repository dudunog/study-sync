from rest_framework import serializers

from account.models import Schedule, Activity

class ActivitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Activity
        fields = '__all__'
        read_only_fields = ['schedule']

class ScheduleSerializer(serializers.ModelSerializer):
    activities = ActivitySerializer(many=True)

    class Meta:
        model = Schedule
        fields = '__all__'

    def create(self, validated_data):
        activities_data = validated_data.pop('activities')
        schedule = Schedule.objects.create(**validated_data)
        for activity_data in activities_data:
            Activity.objects.create(schedule=schedule, **activity_data)
        return schedule
