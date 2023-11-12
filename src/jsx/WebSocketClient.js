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

const on = (event, handler) => {
  messageHandlers[event] = handler;
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
    callback(receivedData);
  };

  // Send the message to the server
  ws.send(JSON.stringify({ event, data }));
};

export { handleMessage, connectWebSocket, sendWebSocketMessage, on, ws };
