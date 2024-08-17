from django.contrib import admin
from .models import Category, Recipe, Ingredient

# Recipe model registration
class RecipeAdmin(admin.ModelAdmin):
    list_display = ('title', 'description', 'instructions', 'user', 'category', 'created_at', 'updated_at',)
    search_fields = ('title',)

# Category model registration
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name',)
    search_fields = ('name',)

# Ingredient model registration
class IngredientAdmin(admin.ModelAdmin):
    list_display = ('name', 'quantity', 'recipe')
    search_fields = ('name',)

# Registering the models with their respective ModelAdmin classes
admin.site.register(Recipe, RecipeAdmin)
admin.site.register(Category, CategoryAdmin)
admin.site.register(Ingredient, IngredientAdmin)
