import PropTypes from 'prop-types';

import styles from './modal-overlay.module.scss';

function ModalOverlay({
  children,
  id,
  isModalOpened,
  onResetData,
  status = false,
}) {
  return (
    <div
      className={`${styles.overlay}${
        (!status && isModalOpened && ` ${styles.opened}`) || ''
      }`}
      id={id}
      onTransitionEnd={onResetData}
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
  onResetData: PropTypes.func,
};

ModalOverlay.defaultProps = {
  status: false,
  onResetData: undefined, // TODO: clear modal of order-details?
};

export default ModalOverlay;
