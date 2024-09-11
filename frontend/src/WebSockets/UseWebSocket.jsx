import { useEffect, useState } from 'react';

const UseWebSocket = (url) => {
  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const ws = new WebSocket(url);
    setSocket(ws);

    ws.onmessage = (event) => {
        console.log(event.data);
        
      setMessage(JSON.parse(event.data));
    };

    return () => {
      ws.close();
    };
  }, [url]);

  return { socket, message };
};

export default UseWebSocket;
