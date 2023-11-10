import styles from './Form.module.scss';
import Input from './Input/Input';
import Button from '../Button/Button';
import useForm from '../../../shared/hooks/useForm';
import fields from './fields';
import initialState from './initialState';

const Form = ({ onSubmit }) => {
  const { state, handleChange, handleSubmit, handleReset } = useForm({ initialState, onSubmit });
  const { name, orgname, datecreate } = state;

  return (
    <div className={styles.wrapper}>
      <form onSubmit={handleSubmit} className={styles.form} action="">
        <Input value={name} onChange={handleChange} {...fields.name} />
        <Input value={orgname} onChange={handleChange} {...fields.orgname} />
        <Input value={datecreate} onChange={handleChange} {...fields.datecreate} />
        <Button type="submit" text="Ok" />
        <Button type="reset" text="Cancel" onClick={handleReset} />
      </form>
    </div>
  );
};

export default Form;
