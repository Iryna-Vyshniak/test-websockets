import { createContext, useContext, useEffect, useState } from 'react';
import { connectWebSocket, on, sendWebSocketMessage, closeWebSocket } from '../WebSocketClient';

const WebsocketContext = createContext();

export const useWebsocket = () => {
  const context = useContext(WebsocketContext);

  if (!context) {
    throw new Error('useWebsocket must be used within a WebsocketProvider');
  }
  return context;
};

const WebsocketProvider = ({ url, children }) => {
  const [ws, setWs] = useState(null);

  useEffect(() => {
    const websocket = connectWebSocket(url);

    setWs(websocket);

    return () => {
      closeWebSocket(websocket);
    };
  }, [url]);

  const contextValue = {
    ws,
    connectWebSocket,
    on,
    sendWebSocketMessage,
    closeWebSocket
  };

  return <WebsocketContext.Provider value={contextValue}>{children}</WebsocketContext.Provider>;
};

export default WebsocketProvider;
