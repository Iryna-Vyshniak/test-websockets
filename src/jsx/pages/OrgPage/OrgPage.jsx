/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-expressions */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import styles from './OrgPage.module.scss';

import { ReactComponent as Icon } from './icon.svg';
import EditForm from '../../components/Form/EditForm';
import Modal from '../../components/Modal/Modal';
import Button from '../../components/Button/Button';

const OrgPage = ({ data, getData, onData }) => {
  console.log('data: ', data);
  const [showModal, setShowModal] = useState(false);

  const { id: infoId } = useParams();

  const onShowModal = () => {
    setShowModal(true);
  };

  const onCloseModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    (async () => {
      try {
        getData({ id: infoId });
      } catch (error) {
        console.error(error);
      }
    })();
  }, [infoId]);

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <>
      {showModal && (
        <Modal close={onCloseModal}>
          <EditForm onClose={onCloseModal} data={data[0]} onData={onData} />
        </Modal>
      )}

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
            <tr key={data[0]?.id}>
              <td>{data[0]?.id}</td>
              <td>
                <span>{data[0]?.name}</span>
              </td>
              <td>{data[0]?.orgname}</td>
              <td>{data[0]?.datecreate}</td>
              <td>
                <Button type="submit" icon={Icon} onClick={onShowModal} variant={styles.Button} />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default OrgPage;
