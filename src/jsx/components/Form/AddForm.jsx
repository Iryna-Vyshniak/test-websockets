import React, { useState } from 'react';

import styles from './Form.module.scss';
import Input from './Input/Input';
import Button from '../Button/Button';
import fields from './fields';
import initialState from './initialState';

const AddForm = ({ onClose, onData }) => {
  const [data, setData] = useState(initialState);

  const { name, orgname, datecreate } = data;

  const onChange = ({ target }) => {
    const { name: inputName, value, checked, type } = target;
    const newValue = type === 'checkbox' ? checked : value;
    setData(prev => ({
      ...prev,
      [inputName]: newValue
    }));
  };

  const isInputFieldEmpty = () => {
    return data.name === '' || data.orgname === '' || data.datecreate === '';
  };

  const handleSubmit = async e => {
    e.preventDefault();
    onData(data);
    onClose();
  };

  const handleReset = e => {
    e.preventDefault();
    setData({ ...initialState });
    onClose();
  };

  return (
    <div className={styles.wrapper}>
      <form onSubmit={handleSubmit} className={styles.form} action="">
        <Input value={name} onChange={onChange} {...fields.name} />
        <Input value={orgname} onChange={onChange} {...fields.orgname} />
        <Input value={datecreate} onChange={onChange} {...fields.datecreate} />
        <div className={styles.wrappers}>
          <Button type="submit" text="Ok" disabled={isInputFieldEmpty()} />
          <Button type="reset" text="Cancel" onClick={handleReset} />
        </div>
      </form>
    </div>
  );
};

export default AddForm;
