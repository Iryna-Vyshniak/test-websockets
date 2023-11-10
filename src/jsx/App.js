import { Suspense, lazy } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Layout from './components/Layout/Layout';
const DesktopPage = lazy(() => import('./pages/DesktopPage/DesktopPage'));
const PageNotFound = lazy(() => import('./pages/PageNotFound/PageNotFound'));
const OrgPage = lazy(() => import('./pages/OrgPage/OrgPage'));

function App() {
  return (
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
  );
}

export default App;
