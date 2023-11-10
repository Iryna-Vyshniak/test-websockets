import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import styles from './Form.module.scss';
import initialState from './initialState';
import { ReactComponent as Icon } from './edit.svg';

import fields from './fields';
import Input from './Input/Input';
import Button from '../Button/Button';
import { editInfoCard, editNameCard, getInfoCard } from '../../../shared/services/api';
import Spinner from '../Spinner/Spinner';

const EditForm = ({ onClose }) => {
  const [data, setData] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const { id } = useParams();
  console.log('idModal: ', id);

  const { name, orgname, datecreate } = data;

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        setError(false);

        const result = await getInfoCard(id);

        setData(result.data);
      } catch (error) {
        setError(true);
        console.log(error.message);
      } finally {
        setIsLoading(false);
      }
    })();
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
      const result = await editNameCard(data);
      console.log('RESULT: ', result.data.data);
      return result.data.data;
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
