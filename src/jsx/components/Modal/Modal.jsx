import { useEffect } from 'react';
import { createPortal } from 'react-dom';

import styles from './Modal.module.scss';

const modalRoot = document.getElementById('modal-root');

const Modal = ({ close, children }) => {
  const handleClose = ({ target, currentTarget, code }) => {
    if (target === currentTarget || code === 'Escape') {
      close();
    }
  };

  useEffect(() => {
    document.body.addEventListener('keydown', handleClose);

    return () => document.body.removeEventListener('keydown', handleClose);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return createPortal(
    <div onClick={handleClose} className={styles.overlay}>
      <div className={styles.modal}>
        <span onClick={close} className={styles.close}>
          X
        </span>
        {children}
      </div>
    </div>,
    modalRoot
  );
};

export default Modal;
