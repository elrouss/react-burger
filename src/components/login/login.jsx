import { useNavigate } from 'react-router-dom';
import {
  EmailInput,
  PasswordInput,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import Entry from '../entry/entry';
import { ROUTES } from '../../utils/constants';
import styles from './login.module.scss';

function Login() {
  const navigate = useNavigate();

  const links = (
    <>
      <div className={styles.text}>
        <span>Вы — новый пользователь?</span>
        <Button
          extraClass={styles.link}
          htmlType="button"
          type="secondary"
          size="medium"
          onClick={() => navigate(ROUTES.sign.up)}
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
          onClick={() => navigate(ROUTES.password.forgot)}
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
