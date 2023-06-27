import {
  Input,
  PasswordInput,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './user-info.module.scss';

function UserInfo() {
  return (
    <form className={styles.form}>
      <Input placeholder="Имя" icon="EditIcon" />
      <Input placeholder="Логин" icon="EditIcon" />
      <PasswordInput icon="EditIcon" />
      <div className={styles.buttons}>
        <Button htmlType="button" type="secondary" extraClass={styles.buttonCancel}>
          Отмена
        </Button>
        <Button htmlType="submit" type="primary">
          Сохранить
        </Button>
      </div>
    </form>
  );
}

export default UserInfo;
