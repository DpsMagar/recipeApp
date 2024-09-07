from django.urls import path
from .views import (
    
    userRegisterView,LoginView,
    CategoryListCreateView, CategoryRetrieveUpdateDestroyView,
    DishListCreateView, DishRetrieveUpdateDestroyView,
    IngredientListCreateView, IngredientRetrieveUpdateDestroyView,LogoutView, UserListView,RecipeListCreateView, RecipeRetrieveUpdateDestroyView,
)
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    
    path('login/', LoginView.as_view(), name='login'),
    path('register/', userRegisterView.as_view(), name='register'),
    path('logout/', LogoutView.as_view(), name='logout'),
    
    # URLs for Category
    path('categories/', CategoryListCreateView.as_view(), name='category-list-create'),
    path('categories/<int:pk>/', CategoryRetrieveUpdateDestroyView.as_view(), name='category-detail'),

    #URLs for Recipe
    path('dishes/', DishListCreateView.as_view(), name='dish-list-create'),
    #For retreiving all the datas
    path('dishes/<str:title>/', DishRetrieveUpdateDestroyView.as_view(), name='dish-detail'),
    
    #URLs for Ingredient
    path('ingredients/', IngredientListCreateView.as_view(), name='ingredient-list-create'),
    path('ingredients/<int:pk>',IngredientRetrieveUpdateDestroyView.as_view(), name='ingredient-detail'),
    
     # Other URL patterns
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    
    #for retreiving the data of the user
    path('users/', UserListView.as_view(), name='user-list'),
    
    #Urls for the recipe steps
    path('steps/', RecipeListCreateView.as_view(), name='recipe-list'),
    path('steps/<int:pk>', RecipeRetrieveUpdateDestroyView.as_view(), name='recipe-detail'),
    

    
]           
    

