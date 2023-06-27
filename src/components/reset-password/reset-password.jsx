import {
  Input,
  PasswordInput,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import Entry from '../entry/entry';
import styles from './reset-password.module.scss';

function ResetPassword() {
  const links = (
    <div className={styles.text}>
      <span>Вспомнили пароль?</span>
      <Button
        extraClass={styles.link}
        htmlType="button"
        type="secondary"
        size="medium"
      >
        Войти
      </Button>
    </div>
  );

  return (
    <Entry heading="Восстановление пароля" links={links}>
      <PasswordInput placeholder="Введите новый пароль" />
      <Input type="text" placeholder="Введите код из письма" />
      <Button htmlType="submit" type="primary" size="medium">
        Сохранить
      </Button>
    </Entry>
  );
}

export default ResetPassword;
