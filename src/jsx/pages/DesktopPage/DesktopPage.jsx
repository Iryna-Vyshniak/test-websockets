import { useState } from 'react';

import Card from '../../components/Card/Card';
import Button from '../../components/Button/Button';
import Modal from '../../components/Modal/Modal';
import AddForm from '../../components/Form/AddForm';

import { useWebsocket } from '../../WebsocketContext';

const DesktopPage = ({ info, onData }) => {
  const [showModal, setShowModal] = useState(false);

  const { ws } = useWebsocket();

  console.log(ws);

  const onShowModal = () => {
    setShowModal(true);
  };

  const onCloseModal = () => {
    setShowModal(false);
  };

  console.log('INFO', info);
  return (
    <>
      {showModal && (
        <Modal close={onCloseModal}>
          <AddForm onClose={onCloseModal} onData={onData} />
        </Modal>
      )}
      <Button text="Add" onClick={onShowModal} disabled={ws?.readyState !== WebSocket.OPEN} />

      <Card data={info} />
    </>
  );
};

export default DesktopPage;
