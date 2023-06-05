import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import ModalOverlay from '../ModalOverlay/ModalOverlay';

import styles from './Modal.module.scss';

function Modal({ children, ...rest }) {
  return createPortal(
    <ModalOverlay {...rest}>
      <div className={styles.modal}>
        <CloseIcon type="primary" onClick={() => rest.onModalClose()} />
        {children}
      </div>
    </ModalOverlay>,
    document.getElementById('react-modals')
  );
}

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  onModalClose: PropTypes.func.isRequired,
};

export default Modal;
