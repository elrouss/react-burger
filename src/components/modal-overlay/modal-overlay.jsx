import PropTypes from 'prop-types';

import styles from './modal-overlay.module.scss';

function ModalOverlay({ children, id, isModalOpened }) {
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
  children: PropTypes.node.isRequired,
  id: PropTypes.string.isRequired,
  isModalOpened: PropTypes.bool.isRequired,
};

export default ModalOverlay;
