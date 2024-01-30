let ws;

const connectWebSocket = url => {
  if (!url) {
    console.error('WebSocket URL is required');
    return;
  }

  ws = new WebSocket(url);

  ws.onopen = () => {
    console.log('WebSocket connected');
    const message = {
      event: 'getAllInfo'
    };
    ws.send(JSON.stringify(message));
  };

  ws.onerror = error => {
    console.error('WebSocket error:', error);
  };

  ws.onclose = event => {
    console.log('WebSocket closed:', event);
  };

  return ws;
};

const closeWebSocket = () => {
  if (ws) {
    ws.close();
    console.log('WebSocket connection closed');
  }
};

export { connectWebSocket, closeWebSocket, ws };
