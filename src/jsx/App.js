import { Suspense, lazy } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { on } from './WebSocketClient';

import Layout from './components/Layout/Layout';
const DesktopPage = lazy(() => import('./pages/DesktopPage/DesktopPage'));
const PageNotFound = lazy(() => import('./pages/PageNotFound/PageNotFound'));
const OrgPage = lazy(() => import('./pages/OrgPage/OrgPage'));

function App() {
  on('getAllInfo', data => {
    console.log('Received all info:', data);
  });

  on('addInfoCard', data => {
    console.log('Added info card:', data);
  });

  on('editInfoCard', data => {
    console.log('Edited info card:', data);
  });

  on('editNameCard', data => {
    console.log('Edited name card:', data);
  });

  on('getInfoCardById', data => {
    console.log('Received info card by ID:', data);
  });

  return (
    <>
      <BrowserRouter basename="/test">
        <Suspense fallback={<p>...Loading</p>}>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<DesktopPage />} />
              <Route path="/org/:id" element={<OrgPage />} />
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
