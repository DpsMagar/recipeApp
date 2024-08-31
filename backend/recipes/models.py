from django.db import models
from django.contrib.auth.models import User

class Category(models.Model):
    name = models.CharField(max_length=100)
    def __str__(self):
        return self.name

class Dish(models.Model):
    title = models.CharField(max_length=200, primary_key=True)
    description = models.TextField()
    instructions = models.TextField()
    estimatedTime= models.TextField()
    image= models.ImageField()
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    def __str__(self):
        return f"{self.title}"

class Ingredient(models.Model):
    name = models.CharField(max_length=100)
    quantity = models.CharField(max_length=50)
    dish = models.ForeignKey(Dish, on_delete=models.CASCADE, to_field='title')
    def __str__(self):
        return self.name
    
    