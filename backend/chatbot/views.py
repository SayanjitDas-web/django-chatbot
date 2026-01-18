from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from .models import ChatMessage
from .serializers import ChatMessageSerializer, ChatRequestSerializer
from .services import get_gemini_response


class ChatView(APIView):
    """Chat API view for sending messages and getting AI responses"""
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = ChatRequestSerializer(data=request.data)
        if serializer.is_valid():
            user_message = serializer.validated_data['message']
            
            try:
                # Get response from Gemini AI
                ai_response = get_gemini_response(user_message)
                
                # Save chat message to database
                chat_message = ChatMessage.objects.create(
                    user=request.user,
                    message=user_message,
                    response=ai_response
                )
                
                # Return serialized response
                response_serializer = ChatMessageSerializer(chat_message)
                return Response(
                    response_serializer.data,
                    status=status.HTTP_201_CREATED
                )
            except Exception as e:
                return Response(
                    {'error': str(e)},
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR
                )
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ChatHistoryView(APIView):
    """Get chat history for authenticated user"""
    permission_classes = [IsAuthenticated]

    def get(self, request):
        chat_messages = ChatMessage.objects.filter(user=request.user)
        serializer = ChatMessageSerializer(chat_messages, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
