import { Suspense, lazy } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { notifyOptions } from '../shared/utils/notify';

import Layout from './components/Layout/Layout';
const DesktopPage = lazy(() => import('./pages/DesktopPage/DesktopPage'));
const PageNotFound = lazy(() => import('./pages/PageNotFound/PageNotFound'));
const OrgPage = lazy(() => import('./pages/OrgPage/OrgPage'));

function App({ ws }) {
  const handleSend = () => {
    // Check if ws is defined and the connection is open and ready to communicate
    if (ws && ws.readyState === WebSocket.OPEN) {
      // Send the message with an event name
      const messageData = {
        event: 'message',
        payload: 'updated'
      };

      try {
        // Convert the data to a JSON string before sending
        ws.send(JSON.stringify(messageData));
        // console.log('JSON.stringify(messageData): ', JSON.stringify(messageData));
      } catch (error) {
        console.error('Error sending message:', error);
        toast.error('WebSocket isn`t send message', notifyOptions);
      }
    } else {
      console.error('WebSocket connection is not open.');
      toast.error('WebSocket isn`t open', notifyOptions);
    }
  };

  const handleCreate = data => {
    // Check if ws is defined and the connection is open
    if (ws && ws.readyState === WebSocket.OPEN) {
      console.log('ws.readyState: ', ws.readyState);
      // Send the message with an event name
      toast.success('WebSocket is open', notifyOptions);
      const messageData = {
        event: 'createUser',
        payload: data
      };

      try {
        // Convert the data to a JSON string before sending
        ws.send(JSON.stringify(messageData));
        // console.log('JSON.stringify(messageData): ', JSON.stringify(messageData));
      } catch (error) {
        console.error('Error sending createUser message:', error);
        toast.error('WebSocket isn`t send message', notifyOptions);
      }
    } else {
      console.error('WebSocket connection is not open.');
      toast.error('WebSocket isn`t open', notifyOptions);
    }
  };

  return (
    <>
      <BrowserRouter basename="/test">
        <Suspense fallback={<p>...Loading</p>}>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route
                index
                element={<DesktopPage handleCreate={handleCreate} handleSend={handleSend} />}
              />
              <Route
                path="/org/:id"
                element={<OrgPage handleCreate={handleCreate} handleSend={handleSend} />}
              />
              <Route path="*" element={<PageNotFound />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
      <ToastContainer draggablePercent={60} />
    </>
  );
}

export default App;
