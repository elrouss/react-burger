import PropTypes from 'prop-types';

import styles from './ModalOverlay.module.scss';

function ModalOverlay({ children }) {
  return (
    <div className={styles.overlay}>
      {children}
    </div>
  )
}

ModalOverlay.propTypes = {
  children: PropTypes.node.isRequired
}

export default ModalOverlay;
