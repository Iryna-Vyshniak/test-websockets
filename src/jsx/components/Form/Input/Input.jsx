import { useState } from 'react';
import styles from './Input.module.scss';

const Input = ({ value, disabled, ...props }) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleFocus = () => {
    setIsEditing(true);
  };

  const handleBlur = () => {
    setIsEditing(false);
  };

  return (
    <label className={styles.Label}>
      {props.label}
      <div className={styles.InputContainer}>
        <input
          required
          value={value}
          {...props}
          className={styles.Input}
          onFocus={handleFocus}
          onBlur={handleBlur}
          disabled={disabled}
        />
        {!isEditing && props.icon && <props.icon className={styles.Icon} width={20} height={20} />}
      </div>
    </label>
  );
};

export default Input;
