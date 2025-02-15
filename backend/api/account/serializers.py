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

    def update(self, instance, validated_data):
        activities_data = validated_data.pop('activities', [])

        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        existing_activities = {activity.id: activity for activity in instance.activities.all()}
        received_activity_ids = {activity.get('id') for activity in activities_data if 'id' in activity}

        for activity_id in set(existing_activities.keys()) - received_activity_ids:
            existing_activities[activity_id].delete()

        for activity_data in activities_data:
            activity_id = activity_data.get('id')
            if activity_id and activity_id in existing_activities:
                activity = existing_activities[activity_id]
                for attr, value in activity_data.items():
                    setattr(activity, attr, value)
                activity.save()
            else:
                Activity.objects.create(schedule=instance, **activity_data)

        return instance
