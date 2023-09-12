import { memo, FC } from 'react';
import { useAppSelector } from 'services/app/hooks';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { isLoading } from 'services/features/user/selectors';
import styles from './buttons.module.scss';

interface IButtonsProps {
  onCancel: () => void;
}

const Buttons: FC<IButtonsProps> = ({ onCancel }) => (
  <div className={styles.buttons}>
    <Button
      htmlType="button"
      type="secondary"
      extraClass={styles.buttonCancel}
      onClick={onCancel}
    >
      Отмена
    </Button>
    <Button
      htmlType="submit"
      type="primary"
      disabled={useAppSelector(isLoading)}
    >
      Сохранить
    </Button>
  </div>
);

export default memo(Buttons);
