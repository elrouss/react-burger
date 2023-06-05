import PropTypes from 'prop-types';

import useCloseModal from '../../hooks/useCloseModal';

import styles from './ModalOverlay.module.scss';

function ModalOverlay({ id, children, isModalOpened, onModalClose }) {
  useCloseModal(id, isModalOpened, onModalClose);

  return (
    <div
      className={`${styles.overlay}${
        (isModalOpened && ` ${styles.opened}`) || ''
      }`}
      id={id}
    >
      {children}
    </div>
  );
}

ModalOverlay.propTypes = {
  id: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  isModalOpened: PropTypes.bool.isRequired,
  onModalClose: PropTypes.func.isRequired,
};

export default ModalOverlay;
