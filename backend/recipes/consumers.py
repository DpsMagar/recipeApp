from channels.generic.websocket import AsyncWebsocketConsumer
import json

class BookmarkConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        await self.channel_layer.group_add(
            "bookmarks",
            self.channel_name
        )
        await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(
            "bookmarks",
            self.channel_name
        )

    async def receive(self, text_data):
        data = json.loads(text_data)
        title = data['title']
        # Broadcast the bookmark update to all connected clients
        await self.channel_layer.group_send(
            "bookmarks",
            {
                'type': 'bookmark_update',
                'title': title
            }
        )

    async def bookmark_update(self, event):
        title = event['title']
        await self.send(text_data=json.dumps({
            'title': title
        }))
