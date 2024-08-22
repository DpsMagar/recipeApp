from rest_framework import generics,permissions
from django.contrib.auth.models import User
from rest_framework.permissions import AllowAny
from rest_framework.views import APIView
from .models import Category, Recipe, Ingredient
from .serializers import CategorySerializer, RecipeSerializer, IngredientSerializer, RegisterSerializer, LoginSerializer
from rest_framework.authtoken.models import Token
from rest_framework.response import Response

# For user registration
class userRegisterView(generics.CreateAPIView):
    queryset= User.objects.all()
    serializer_class= RegisterSerializer
    permission_classes=(AllowAny,)
    
# For the login view
class LoginView(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request, *args, **kwargs):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.validated_data
            token, created = Token.objects.get_or_create(user=user)
            return Response({"token": token.key})
        return Response(serializer.errors, status=400)
# CRUD views for Category
class CategoryListCreateView(generics.ListCreateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class CategoryRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

# CRUD views for Recipe
class RecipeListCreateView(generics.ListCreateAPIView):  
    queryset = Recipe.objects.all()
    serializer_class = RecipeSerializer

class RecipeRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Recipe.objects.all()
    serializer_class = RecipeSerializer

# CRUD views for Ingredient
class IngredientListCreateView(generics.ListCreateAPIView):
    queryset = Ingredient.objects.all()
    serializer_class = IngredientSerializer

class IngredientRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):  
    queryset = Ingredient.objects.all()
    serializer_class = IngredientSerializer
