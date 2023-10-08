import { FC, ReactNode } from 'react';
import classNames from 'classnames';
import styles from './modal-overlay.module.scss';

export interface IModalOverlayProps {
  id: string;
  children: ReactNode;
  isModalOpened: boolean;
}

const ModalOverlay: FC<IModalOverlayProps> = ({
  id,
  children,
  isModalOpened,
}) => (
  <div
    className={classNames(styles.overlay, {
      [styles.opened]: isModalOpened,
    })}
    id={id}
  >
    {children}
  </div>
);

export default ModalOverlay;
