import { useNavigate } from 'react-router-dom';
import {
  EmailInput,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import Entry from '../entry/entry';
import { ROUTES } from '../../utils/constants';
import styles from './forgot-password.module.scss';

function ForgotPassword() {
  const navigate = useNavigate();

  const links = (
    <div className={styles.text}>
      <span>Вспомнили пароль?</span>
      <Button
        extraClass={styles.link}
        htmlType="button"
        type="secondary"
        size="medium"
        onClick={() => navigate(ROUTES.sign.in)}
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
