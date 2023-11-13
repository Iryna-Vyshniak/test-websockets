let ws;
const messageHandlers = {};

const connectWebSocket = url => {
  ws = new WebSocket(url);

  ws.onopen = () => {
    console.log('WebSocket connected');
  };

  ws.onmessage = event => {
    const data = JSON.parse(event.data);
    handleMessage(data);
  };

  ws.onerror = error => {
    console.error('WebSocket error:', error);
  };

  ws.onclose = event => {
    console.log('WebSocket closed:', event);
  };
};

const on = (event, handler) => {
  messageHandlers[event] = handler;
};

const handleMessage = data => {
  const { event, payload } = data;

  const handler = messageHandlers[event];
  if (handler) {
    handler(payload);
  } else {
    console.log('No handler for message event:', event);
  }
};

const sendWebSocketMessage = (event, data, callback) => {
  if (ws.readyState !== WebSocket.OPEN) {
    console.error('WebSocket not open');
    return;
  }

  // Set up the onmessage event to handle the response
  ws.onmessage = event => {
    const receivedData = JSON.parse(event.data);
    // Invoke the callback with the received data
    if (callback) {
      callback(receivedData);
    } else {
      handleMessage(receivedData);
    }
  };

  // Send the message to the server
  ws.send(JSON.stringify({ event, data }));
};

const closeWebSocket = () => {
  if (ws) {
    ws.close();
    console.log('WebSocket connection closed');
  }
};

export { connectWebSocket, sendWebSocketMessage, on, closeWebSocket, ws };
