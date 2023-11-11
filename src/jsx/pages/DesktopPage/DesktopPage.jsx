import { useEffect, useState } from 'react';

import Card from '../../components/Card/Card';
import Button from '../../components/Button/Button';
import Modal from '../../components/Modal/Modal';
import AddForm from '../../components/Form/AddForm';

import Spinner from '../../components/Spinner/Spinner';
import { getALL } from '../../../shared/services/api';

const DesktopPage = ({ handleCreate, handleSend }) => {
  // console.log('ws: ', ws);
  const [showModal, setShowModal] = useState(false);

  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        setError(false);

        const data = await getALL();

        setData(data);
      } catch (error) {
        setError(true);
        console.log(error.message);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  const onShowModal = () => {
    setShowModal(true);
  };

  const onCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      {showModal && (
        <Modal close={onCloseModal}>
          <AddForm onClose={onCloseModal} handleCreate={handleCreate} handleSend={handleSend} />
        </Modal>
      )}
      <Button text="Add" onClick={onShowModal} />
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
