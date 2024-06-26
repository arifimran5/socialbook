from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from .serializers import (
    UserSerializer,
    LoginSerializer,
    UserProfileSerializer,
    GetUserProfileSerializer,
)
from rest_framework import status
from rest_framework.authtoken.models import Token
import datetime
from django.contrib.auth.models import User
from .models import UserProfile


class RegisterView(APIView):
    permission_classes = [AllowAny]
    http_method_names = ["post"]

    def post(self, request):
        user_serializer = UserSerializer(data=request.data)
        if user_serializer.is_valid():
            user_serializer.save()
            return Response(
                {"status": True, "message": "user created"},
                status=status.HTTP_201_CREATED,
            )
        return Response(
            {"status": False, "message": user_serializer.errors},
            status=status.HTTP_400_BAD_REQUEST,
        )


class LoginView(APIView):
    permission_classes = [AllowAny]
    http_method_names = ["post"]

    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.validated_data
            token, created = Token.objects.get_or_create(user=user)

            utc_now = datetime.datetime.now(datetime.timezone.utc)
            if not created and token.created < utc_now - datetime.timedelta(hours=24):
                token.delete()
                token = Token.objects.create(user)
                token.created = datetime.datetime.now()
                token.save()

            user_profile = UserProfile.objects.get(user=user)
            user_profile_serializer = GetUserProfileSerializer(user_profile)
            user_profile_data = user_profile_serializer.data
            return Response(
                {
                    "status": True,
                    "message": "Login success",
                    "token": token.key,
                    "user": user_profile_data,
                },
                status=status.HTTP_200_OK,
            )

        return Response(
            {"status": False, "message": serializer.errors},
            status=status.HTTP_400_BAD_REQUEST,
        )
