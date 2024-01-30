import { useEffect, useState } from 'react';

import styles from './Form.module.scss';

import initialState from './initialState';
import { ReactComponent as Icon } from './edit.svg';

import fields from './fields';
import Input from './Input/Input';
import Button from '../Button/Button';

const EditForm = ({ data, onClose, onData }) => {
  console.log('data: ', data);
  const [dataForm, setDataForm] = useState(data ? data : initialState);

  const { name, orgname, datecreate } = dataForm;

  useEffect(() => {
    data ? setDataForm(data) : setDataForm(initialState);
  }, [data]);

  const onChange = ({ target }) => {
    const { name: inputName, value, checked, type } = target;
    const newValue = type === 'checkbox' ? checked : value;

    setDataForm(prev => ({
      ...prev,
      [inputName]: newValue
    }));
  };

  const isInputFieldEmpty = () => {
    return data.name === '' || data.orgname === '' || data.datecreate === '';
  };

  console.log('dataForm: ', dataForm);

  const onClickSubmit = () => {
    onData(dataForm);
    onClose();
  };

  const handleReset = e => {
    e.preventDefault();
    setDataForm({ ...initialState });
    onClose();
  };

  return (
    <div className={styles.wrapper}>
      <form onSubmit={onClickSubmit} className={styles.form} action="">
        <Input value={name} onChange={onChange} {...fields.name} icon={Icon} />
        <Input value={orgname} onChange={onChange} {...fields.orgname} disabled />
        <Input value={datecreate} onChange={onChange} {...fields.datecreate} disabled />
        <div className={styles.wrappers}>
          <Button type="submit" text="Ok" disabled={isInputFieldEmpty()} />
          <Button type="reset" text="Cancel" onClick={handleReset} />
        </div>
      </form>
    </div>
  );
};

export default EditForm;
