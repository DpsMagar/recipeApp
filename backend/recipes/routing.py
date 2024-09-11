# routing.py
from django.urls import re_path
from .consumers import BookmarkConsumer

websocket_urlpatterns = [
    re_path(r'ws/bookmarks/$', BookmarkConsumer.as_asgi()),
]
    