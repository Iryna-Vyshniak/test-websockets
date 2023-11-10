import React, { useState } from 'react';

import styles from './Form.module.scss';
import Input from './Input/Input';
import Button from '../Button/Button';
import fields from './fields';
import initialState from './initialState';
import { addInfoCard } from '../../../shared/services/api';

const AddForm = ({ onClose }) => {
  const [data, setData] = useState(initialState);

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
      const result = await addInfoCard({ data });

      onClose();
      return result;
    } catch (error) {
      console.error(error);
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
          <Button type="submit" text="Ok" disabled={isInputFieldEmpty()} />
          <Button type="reset" text="Cancel" onClick={handleReset} />
        </div>
      </form>
    </div>
  );
};

export default AddForm;
