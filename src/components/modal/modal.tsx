import { FC, ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import useCloseModal from 'hooks/useCloseModal';
import ModalOverlay from '../modal-overlay/modal-overlay';
import styles from './modal.module.scss';

interface IModalProps {
  id: string;
  children: ReactNode;
  isLoading?: boolean;
  isModalOpened?: boolean;
  onModalClose: () => void;
}

const Modal: FC<IModalProps> = ({
  children,
  id,
  isModalOpened = true,
  onModalClose,
  ...rest
}) => {
  useCloseModal(id, isModalOpened, onModalClose);

  return createPortal(
    <ModalOverlay id={id} isModalOpened={isModalOpened} {...rest}>
      <div className={styles.modal}>
        <CloseIcon type="primary" onClick={onModalClose} />
        {children}
      </div>
    </ModalOverlay>,
    document.getElementById('react-modals') as HTMLElement
  );
};

export default Modal;
