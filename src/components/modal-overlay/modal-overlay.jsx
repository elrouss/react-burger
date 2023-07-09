import PropTypes from 'prop-types';

import styles from './modal-overlay.module.scss';

function ModalOverlay({ children, id, isModalOpened, status = false }) {
  return (
    <div
      className={`${styles.overlay}${
        (!status && isModalOpened && ` ${styles.opened}`) || ''
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
  status: PropTypes.bool,
};

ModalOverlay.defaultProps = {
  status: false,
};

export default ModalOverlay;
