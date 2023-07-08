import { memo } from 'react';
import PropTypes from 'prop-types';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './buttons.module.scss';

function Buttons({ onCancel }) {
  return (
    <div className={styles.buttons}>
      <Button
        htmlType="button"
        type="secondary"
        extraClass={styles.buttonCancel}
        onClick={onCancel}
      >
        Отмена
      </Button>
      <Button htmlType="submit" type="primary">
        Сохранить
      </Button>
    </div>
  );
}

Buttons.propTypes = {
  onCancel: PropTypes.func.isRequired,
};

export default memo(Buttons);
