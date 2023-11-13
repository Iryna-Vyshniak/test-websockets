import { useEffect, useState } from 'react';

import Card from '../../components/Card/Card';
import Button from '../../components/Button/Button';
import Modal from '../../components/Modal/Modal';
import AddForm from '../../components/Form/AddForm';

import Spinner from '../../components/Spinner/Spinner';
import { sendWebSocketMessage } from '../../../WebSocketClient';

const DesktopPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [websocketReady, setWebsocketReady] = useState(false);

  const onShowModal = () => {
    setShowModal(true);
  };

  const onCloseModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        setError(false);

        // Send a message to the WebSocket server to get all info
        sendWebSocketMessage('getAllInfo', null, receivedData => {
          // Check if we have already received data
          if (!data) {
            setData(receivedData.data);
          }
          setWebsocketReady(true);
          setIsLoading(false);
        });
      } catch (error) {
        setError(true);
        console.log(error.message);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [data, websocketReady]);

  return (
    <>
      {showModal && (
        <Modal close={onCloseModal}>
          <AddForm onClose={onCloseModal} />
        </Modal>
      )}
      <Button text="Add" onClick={onShowModal} disabled={!websocketReady} />
      {isLoading && <Spinner />}
      {error && <div>Opps, error... Please, wait or update page</div>}
      {!error && !isLoading && data?.length > 0 && (
        <>
          <Card data={data} />
        </>
      )}
    </>
  );
};

export default DesktopPage;
