import { FC, ReactNode } from 'react';
import classNames from 'classnames';
import styles from './modal-overlay.module.scss';

export interface IModalOverlayProps {
  id: string;
  children: ReactNode;
  isModalOpened: boolean;
  isLoading?: boolean;
}

const ModalOverlay: FC<IModalOverlayProps> = ({
  id,
  children,
  isModalOpened,
  isLoading = false,
}) => (
  <div
    className={classNames(styles.overlay, {
      [styles.opened]: !isLoading && isModalOpened,
    })}
    id={id}
  >
    {children}
  </div>
);

export default ModalOverlay;
