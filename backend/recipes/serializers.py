from rest_framework import serializers
from .models import Category, Dish, Ingredient, RecipeStep
from django.contrib.auth.models import User
from django.contrib.auth import authenticate

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name']

class DishSerializer(serializers.ModelSerializer):
    isBookmarked = serializers.SerializerMethodField()
    class Meta:
        model = Dish
        fields = [ 'title', 'description','estimatedTime', 'instructions','image','video', 'user', 'category', 'created_at', 'updated_at', 'isBookmarked']
        
    def get_isBookmarked(self, obj):
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            return request.user in obj.bookmarked_by.all()
        return False

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
        
#For the steps of the recipe
class RecipeStepSerializer(serializers.ModelSerializer):
    class Meta:
        model= RecipeStep
        fields= ['id','dish', 'step_number','instruction']

#Combined Serializer for three models
class DishDetailSerializer(serializers.ModelSerializer):
    ingredients = IngredientSerializer(many=True, read_only=True, source='ingredient_set')
    steps = RecipeStepSerializer(many=True, read_only=True, source='recipestep_set')
    category = CategorySerializer(read_only=True)
    
    class Meta:
        model = Dish
        fields = ['title', 'description', 'instructions', 'estimatedTime', 'image','video', 'user', 'category', 'created_at', 'updated_at', 'public', 'ingredients', 'steps','bookmarked_by',]
    

class recipeOfTheDaySerializer(serializers.ModelSerializer):
    class Meta:
        model= Dish
        fields = [ 'title', 'description','estimatedTime','user', 'category', ]
    