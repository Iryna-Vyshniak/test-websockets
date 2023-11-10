import styles from './Button.module.scss';

const Button = ({ text, onClick, disabled, icon: Icon, variant }) => (
  <button onClick={onClick} className={variant ? variant : styles.Button} disabled={disabled}>
    {Icon && (
      <div className={styles.iconWrapper}>
        <Icon width={20} height={20} />
      </div>
    )}
    {text}
  </button>
);

export default Button;
