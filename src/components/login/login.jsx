import {
  EmailInput,
  PasswordInput,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import Entry from '../entry/entry';
import styles from './login.module.scss';

function Login() {
  const links = (
    <>
      <div className={styles.text}>
        <span>Вы — новый пользователь?</span>
        <Button
          extraClass={styles.link}
          htmlType="button"
          type="secondary"
          size="medium"
        >
          Зарегистрироваться
        </Button>
      </div>

      <div className={styles.text}>
        <span>Забыли пароль?</span>
        <Button
          extraClass={styles.link}
          htmlType="button"
          type="secondary"
          size="medium"
        >
          Восстановить пароль
        </Button>
      </div>
    </>
  );

  return (
    <Entry heading="Вход" links={links}>
      <EmailInput />
      <PasswordInput />
      <Button htmlType="submit" type="primary" size="medium">
        Войти
      </Button>
    </Entry>
  );
}

export default Login;
