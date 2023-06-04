import { createPortal } from 'react-dom';

import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import ModalOverlay from '../ModalOverlay/ModalOverlay';

import styles from './Modal.module.scss';

function Modal() {
  return createPortal(
    <ModalOverlay>
      <div className={styles.modal}>
        <CloseIcon type="primary" />
      </div>
    </ModalOverlay>,
    document.getElementById('react-modals')
  );
}

export default Modal;
