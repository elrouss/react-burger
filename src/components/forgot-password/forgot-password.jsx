import {
  EmailInput,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import Entry from '../entry/entry';
import styles from './forgot-password.module.scss';

function ForgotPassword() {
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
      <EmailInput placeholder="Укажите e-mail" />
      <Button htmlType="submit" type="primary" size="medium">
        Восстановить
      </Button>
    </Entry>
  );
}

export default ForgotPassword;
