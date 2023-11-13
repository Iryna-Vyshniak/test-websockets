import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { notifyOptions } from '../../../shared/utils/notify';

import styles from './Form.module.scss';
import Input from './Input/Input';
import Button from '../Button/Button';
import fields from './fields';
import initialState from './initialState';
import { sendWebSocketMessage } from '../../../WebSocketClient';

const AddForm = ({ onClose }) => {
  const [data, setData] = useState(initialState);
  const [websocketReady, setWebsocketReady] = useState(false);

  const { name, orgname, datecreate } = data;

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

  const handleSubmit = async () => {
    try {
      await sendWebSocketMessage('addInfoCard', data, receivedData => {
        // Check if we have already received data
        if (!data) {
          setData(receivedData.data);
          setWebsocketReady(true);
          onClose();
        }
      });
    } catch (error) {
      console.error(error);
      toast.error(`Info didn't create`, notifyOptions);
    }
  };

  const handleReset = e => {
    e.preventDefault();
    setData({ ...initialState });
    onClose();
  };

  return (
    <div className={styles.wrapper}>
      <form onSubmit={handleSubmit} className={styles.form} action="">
        <Input value={name} onChange={onChangeName} {...fields.name} />
        <Input value={orgname} onChange={onChangeOrg} {...fields.orgname} />
        <Input value={datecreate} onChange={onChangeDate} {...fields.datecreate} />
        <div className={styles.wrappers}>
          <Button type="submit" text="Ok" disabled={!websocketReady && isInputFieldEmpty()} />
          <Button type="reset" text="Cancel" onClick={handleReset} />
        </div>
      </form>
    </div>
  );
};

export default AddForm;
