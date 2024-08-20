from rest_framework import generics
from .models import Category, Recipe, Ingredient
from .serializers import CategorySerializer, RecipeSerializer, IngredientSerializer

# CRUD views for Category
class CategoryListCreateView(generics.ListCreateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class CategoryRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

# CRUD views for Recipe
class RecipeListCreateView(generics.ListCreateAPIView):  # Corrected to ListCreateAPIView
    queryset = Recipe.objects.all()
    serializer_class = RecipeSerializer

class RecipeRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Recipe.objects.all()
    serializer_class = RecipeSerializer

# CRUD views for Ingredient
class IngredientListCreateView(generics.ListCreateAPIView):
    queryset = Ingredient.objects.all()
    serializer_class = IngredientSerializer

class IngredientRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):  # Corrected class name
    queryset = Ingredient.objects.all()
    serializer_class = IngredientSerializer
