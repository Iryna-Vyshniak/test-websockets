let ws;
const messageHandlers = {};

const connectWebSocket = url => {
  if (!url) {
    console.error('WebSocket URL is required');
    return;
  }

  ws = new WebSocket(url);

  ws.onopen = () => {
    console.log('WebSocket connected');
  };

  ws.onmessage = event => {
    console.log('WebSocket message received:', event.data);
    const data = JSON.parse(event.data);
    handleMessage(data);
  };

  ws.onerror = error => {
    console.error('WebSocket error:', error);
  };

  ws.onclose = event => {
    console.log('WebSocket closed:', event);
    // setTimeout(() => connectWebSocket(url), 30000);
  };

  return ws;
};

const on = (event, handler) => {
  messageHandlers[event] = handler;
};

const handleMessage = data => {
  console.log('data: ', data);
  const { event, payload } = data;

  const handler = messageHandlers[event];
  if (handler) {
    handler(payload);
  } else {
    console.log('No handler for message event:', event);
  }
};

const sendWebSocketMessage = (event, data, callback) => {
  if (!ws || ws.readyState !== WebSocket.OPEN) {
    console.error('Invalid or closed WebSocket');
    return;
  }

  const onResponse = async event => {
    console.log('WebSocket response received:', event.data);
    const receivedData = await JSON.parse(event.data);
    console.log('receivedData ON RESPONSE: ', receivedData.data);

    if (callback) {
      callback(receivedData.data);
    } else {
      handleMessage(receivedData);
    }
  };

  ws.addEventListener('message', onResponse);

  try {
    ws.send(JSON.stringify({ event, data }));
  } catch (error) {
    console.error('Error sending WebSocket message:', error);
  }

  const removeListener = () => {
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.removeEventListener('message', onResponse);
    }
  };
  return removeListener;
};

const closeWebSocket = () => {
  if (ws) {
    ws.close();
    console.log('WebSocket connection closed');
  }
};

export { connectWebSocket, sendWebSocketMessage, on, closeWebSocket, ws };
