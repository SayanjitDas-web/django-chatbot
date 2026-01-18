from rest_framework import serializers
from .models import ChatMessage


class ChatMessageSerializer(serializers.ModelSerializer):
    """Serializer for ChatMessage model"""
    class Meta:
        model = ChatMessage
        fields = ['id', 'message', 'response', 'created_at']
        read_only_fields = ['id', 'response', 'created_at']


class ChatRequestSerializer(serializers.Serializer):
    """Serializer for chat request"""
    message = serializers.CharField(required=True)
