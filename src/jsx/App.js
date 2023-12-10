import { Suspense, lazy, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Layout from './components/Layout/Layout';
import { useWebsocket } from './WebsocketContext';
const DesktopPage = lazy(() => import('./pages/DesktopPage/DesktopPage'));
const PageNotFound = lazy(() => import('./pages/PageNotFound/PageNotFound'));
const OrgPage = lazy(() => import('./pages/OrgPage/OrgPage'));

function App() {
  const [info, setInfo] = useState([]);
  const [data, setData] = useState([]);
  const { ws } = useWebsocket();

  const message = {
    event: 'getAllInfo'
  };

  ws.onopen = () => {
    ws.send(JSON.stringify(message));
  };

  ws.onmessage = e => {
    const message = JSON.parse(e.data);
    //console.log('message: ', message);

    if (message.event === 'getInfoCardById' || message.event === 'editNameCard') {
      setData(message.data.data);
    }
    setInfo(message.data.data);
  };

  const onData = data => {
    //console.log('data: ', data);
    const insert = {
      event: 'addInfoCard',
      data: data
    };

    const update = {
      event: 'editNameCard',
      data: [data]
    };

    data.id ? ws.send(JSON.stringify(update)) : ws.send(JSON.stringify(insert));
    ws.send(JSON.stringify(message));
  };

  const getData = data => {
    //console.log('id data: ', data);
    const getById = {
      event: 'getInfoCardById',
      data: data
    };
    ws.send(JSON.stringify(getById));
    ws.send(JSON.stringify(message));
  };

  // console.log('info: ', info);
  // console.log('dataAPP: ', data);
  return (
    <>
      <BrowserRouter basename="/test">
        <Suspense fallback={<p>...Loading</p>}>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<DesktopPage info={info} onData={onData} />} />
              <Route
                path="/org/:id"
                element={<OrgPage onData={onData} getData={getData} data={data} />}
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
