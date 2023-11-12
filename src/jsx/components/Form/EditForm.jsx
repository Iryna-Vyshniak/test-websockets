import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { notifyOptions } from '../../../shared/utils/notify';

import styles from './Form.module.scss';
import initialState from './initialState';
import { ReactComponent as Icon } from './edit.svg';

import fields from './fields';
import Input from './Input/Input';
import Button from '../Button/Button';
import Spinner from '../Spinner/Spinner';
import { sendWebSocketMessage } from '../../WebSocketClient';

const EditForm = ({ onClose }) => {
  const [data, setData] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const { id } = useParams();

  const { name, orgname, datecreate } = data;

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        setError(false);

        await sendWebSocketMessage('getInfoCardById', { id }, receivedData => {
          if (data) {
            setData(receivedData.data);
          }
        });
        setIsLoading(false);
      } catch (error) {
        setError(true);
        console.log(error.message);
      } finally {
        setIsLoading(false);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const onChangeName = event => {
    setData({
      ...data,
      name: event.target.value
    });
  };

  const onChangeOrg = event => {
    setData({
      ...data,
      orgname: event.target.value
    });
  };

  const onChangeDate = event => {
    setData({
      ...data,
      datecreate: event.target.value
    });
  };

  const isInputFieldEmpty = () => {
    return data.name === '' || data.orgname === '' || data.datecreate === '';
  };

  const onClickSubmit = async () => {
    try {
      await sendWebSocketMessage('editNameCard', data, receivedData => {
        // Check if we have already received data
        if (!data) {
          setData(receivedData.data.data);
          onClose();
        }
      });
    } catch (error) {
      console.error(error);
      toast.error('Info didn`t update', notifyOptions);
    }
  };

  const handleReset = e => {
    e.preventDefault();
    setData({ ...initialState });
    onClose();
  };

  return (
    <div className={styles.wrapper}>
      {isLoading && <Spinner />}
      {error && <div>Opps, error... Please, wait or update page</div>}
      {!isLoading && !error && (
        <form onSubmit={onClickSubmit} className={styles.form} action="">
          <Input value={name} onChange={onChangeName} {...fields.name} icon={Icon} />
          <Input value={orgname} onChange={onChangeOrg} {...fields.orgname} disabled />
          <Input value={datecreate} onChange={onChangeDate} {...fields.datecreate} disabled />
          <div className={styles.wrappers}>
            <Button type="submit" text="Ok" disabled={isInputFieldEmpty()} />
            <Button type="reset" text="Cancel" onClick={handleReset} />
          </div>
        </form>
      )}
    </div>
  );
};

export default EditForm;
