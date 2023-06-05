import PropTypes from 'prop-types';

import useCloseModalEscape from '../../hooks/useCloseModalEscape';

import styles from './ModalOverlay.module.scss';

function ModalOverlay({ children, isModalOpened, onModalClose }) {
  useCloseModalEscape(isModalOpened, onModalClose);

  return (
    <div
      className={`${styles.overlay}${
        (isModalOpened && ` ${styles.opened}`) || ''
      }`}
      onClick={() => onModalClose()}
      onKeyDown={(evt) => onModalClose(evt)}
    >
      {children}
    </div>
  );
}

ModalOverlay.propTypes = {
  children: PropTypes.node.isRequired,
  isModalOpened: PropTypes.bool.isRequired,
  onModalClose: PropTypes.func.isRequired,
};

export default ModalOverlay;
