import { createContext, useContext } from 'react';

import { closeWebSocket } from '../WebSocketClient';

const WebsocketContext = createContext();

export const useWebsocket = () => {
  const context = useContext(WebsocketContext);

  if (!context) {
    throw new Error('useWebsocket must be used within a WebsocketProvider');
  }
  return context;
};

const WebsocketProvider = ({ ws, children }) => {
  const contextValue = {
    ws,
    closeWebSocket
  };

  return <WebsocketContext.Provider value={contextValue}>{children}</WebsocketContext.Provider>;
};

export default WebsocketProvider;
