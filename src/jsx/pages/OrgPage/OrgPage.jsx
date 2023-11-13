import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import styles from './OrgPage.module.scss';

import { ReactComponent as Icon } from './icon.svg';
import EditForm from '../../components/Form/EditForm';
import Modal from '../../components/Modal/Modal';
import Button from '../../components/Button/Button';
import Spinner from '../../components/Spinner/Spinner';
import { sendWebSocketMessage } from '../../../WebSocketClient';

const OrgPage = () => {
  const [showModal, setShowModal] = useState(false);

  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        setError(false);

        sendWebSocketMessage('getInfoCardById', { id }, receivedData => {
          if (!data) {
            setData(receivedData.data);
          }
          setIsLoading(false);
        });
      } catch (error) {
        setError(true);
        console.log(error.message);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [id, data]);

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
          <EditForm onClose={onCloseModal} />
        </Modal>
      )}
      {isLoading && <Spinner />}
      {error && <div>Error loading data</div>}
      {!error && !isLoading && data && (
        <div className={styles.OrgPage}>
          <table className={styles.datatable}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Organization</th>
                <th>Date of create</th>
                <th>Settings</th>
              </tr>
            </thead>
            <tbody>
              <tr key={data.id}>
                <td>{data.id}</td>
                <td>
                  <span>{data.name}</span>
                </td>
                <td>{data.orgname}</td>
                <td>{data.datecreate}</td>
                <td>
                  <Button type="submit" icon={Icon} onClick={onShowModal} variant={styles.Button} />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default OrgPage;
