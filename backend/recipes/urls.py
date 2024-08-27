from django.urls import path
from .views import (
    
    userRegisterView,LoginView,
    CategoryListCreateView, CategoryRetrieveUpdateDestroyView,
    DishListCreateView, DishRetrieveUpdateDestroyView,
    IngredientListCreateView, IngredientRetrieveUpdateDestroyView,LogoutView
)

urlpatterns = [
    
    path('login/', LoginView.as_view(), name='login'),
    path('register/', userRegisterView.as_view(), name='register'),
    path('logout/', LogoutView.as_view(), name='logout'),
    
    # URLs for Category
    path('categories/', CategoryListCreateView.as_view(), name='category-list-create'),
    path('categories/<int:pk>/', CategoryRetrieveUpdateDestroyView.as_view(), name='category-detail'),

    #URLs for Recipe
    path('dishes/', DishListCreateView.as_view(), name='dish-list-create'),
    path('dishes/<int:pk>',DishRetrieveUpdateDestroyView.as_view(), name='dish-detail'),
    
    #URLs for Ingredient
    path('ingredients/', IngredientListCreateView.as_view(), name='ingredient-list-create'),
    path('ingredients/<int:pk>',IngredientRetrieveUpdateDestroyView.as_view(), name='ingredient-detail'),
    

]

