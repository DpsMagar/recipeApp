from rest_framework import serializers
from .models import Category, Dish, Ingredient
from django.contrib.auth.models import User
from django.contrib.auth import authenticate

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name']

class DishSerializer(serializers.ModelSerializer):
    class Meta:
        model = Dish
        fields = [ 'title', 'description','estimatedTime', 'instructions','image', 'user', 'category', 'created_at', 'updated_at']

class IngredientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ingredient
        fields = ['id', 'name', 'quantity', 'dish']
        
#For registration
class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User    
        fields = ('id','username', 'password', 'email')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user
#For Login
class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        raise serializers.ValidationError("Invalid credentials")
    

#For the info of the user
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username']  # Include 'id' and other fields as needed
        

#Combined Serializer for three models
class DishDetailSerializer(serializers.ModelSerializer):
    ingredients = serializers.SerializerMethodField()
    category = CategorySerializer(read_only=True)

    class Meta:
        model = Dish  # Specifies the model being serialized
        fields = ['title', 'description', 'instructions', 'estimatedTime', 'image', 'user', 'category', 'created_at', 'updated_at', 'public', 'ingredients']

    def get_ingredients(self, obj):
        # Fetches and serializes the related ingredients
        ingredients = Ingredient.objects.filter(dish=obj.title)
        return IngredientSerializer(ingredients, many=True).data

    
    