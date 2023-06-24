import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import ModalOverlay from '../modal-overlay/modal-overlay';

import useCloseModal from '../../hooks/useCloseModal';

import styles from './modal.module.scss';

function Modal({ children, id, isModalOpened, onModalClose }) {
  useCloseModal(id, isModalOpened, onModalClose);

  return createPortal(
    <ModalOverlay id={id} isModalOpened={isModalOpened}>
      <div className={styles.modal}>
        <CloseIcon type="primary" onClick={onModalClose} />
        {children}
      </div>
    </ModalOverlay>,
    document.getElementById('react-modals')
  );
}

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  id: PropTypes.string.isRequired,
  isModalOpened: PropTypes.bool.isRequired,
  onModalClose: PropTypes.func.isRequired,
};

export default Modal;
