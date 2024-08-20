from django.urls import path
from .views import (
    CategoryListCreateView, CategoryRetrieveUpdateDestroyView,
    RecipeListCreateView, RecipeRetrieveUpdateDestroyView,
    IngredientListCreateView, IngredientRetrieveUpdateDestroyView
)

urlpatterns = [
    # URLs for Category
    path('categories/', CategoryListCreateView.as_view(), name='category-list-create'),
    path('categories/<int:pk>/', CategoryRetrieveUpdateDestroyView.as_view(), name='category-detail'),

    #URLs for Recipe
    path('recipes/', RecipeListCreateView.as_view(), name='recipe-list-create'),
    path('recipes/<int:pk>',RecipeRetrieveUpdateDestroyView.as_view(), name='recipe-detail'),
    
    #URLs for Ingredient
    path('ingredients/', IngredientListCreateView.as_view(), name='ingredient-list-create'),
    path('ingredients/<int:pk>',IngredientRetrieveUpdateDestroyView.as_view(), name='recipe-detail')

]

