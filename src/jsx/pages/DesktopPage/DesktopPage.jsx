import { useState } from 'react';

import Card from '../../components/Card/Card';
import Button from '../../components/Button/Button';
import Modal from '../../components/Modal/Modal';
import AddForm from '../../components/Form/AddForm';

// import Spinner from '../../components/Spinner/Spinner';
import { useWebsocket } from '../../WebsocketContext';

const DesktopPage = ({ info, onData }) => {
  const [showModal, setShowModal] = useState(false);
  // const [info, setInfo] = useState({});

  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState(false);

  const { ws } = useWebsocket();
  // const { sendWebSocketMessage, ws, on } = useWebsocket();
  console.log(ws);

  const onShowModal = () => {
    setShowModal(true);
  };

  const onCloseModal = () => {
    setShowModal(false);
  };

  // const message = {
  //   event: 'getAllInfo'
  // };

  // ws.onopen = () => {
  //   ws.send(JSON.stringify(message));
  // };

  // ws.onmessage = e => {
  //   const message = JSON.parse(e.data);
  //   setInfo(message.value);
  // };

  // useEffect(() => {
  //   (async () => {
  //     try {
  //       setIsLoading(true);
  //       setError(false);

  //       if (ws.readyState === WebSocket.OPEN) {
  //         await on('getAllInfo', data => {
  //           console.log('Received all info:', data);
  //           console.log('Type of data:', typeof data);
  //         });

  //         await sendWebSocketMessage('getAllInfo', null, receivedData => {
  //           console.log('Data before setting:', receivedData);

  //           setInfo(receivedData);
  //           console.log('Data after setting:', receivedData);

  //           setIsLoading(false);
  //         });

  //         setIsLoading(false);
  //       }
  //     } catch (error) {
  //       setError(true);
  //       console.log(error.message);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   })();
  // }, [on, sendWebSocketMessage, ws]);

  console.log('INFO', info);
  return (
    <>
      {showModal && (
        <Modal close={onCloseModal}>
          <AddForm onClose={onCloseModal} onData={onData}/>
        </Modal>
      )}
      <Button text="Add" onClick={onShowModal} disabled={ws?.readyState !== WebSocket.OPEN} />
      {/* {isLoading && <Spinner />}
      {error && <div>Opps, error... Please, wait or update page</div>}
      {!error && !isLoading && info?.length > 0 && ( */}
      <>
        <Card data={info} />
      </>
      {/* )} */}
    </>
  );
};

export default DesktopPage;
