import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  EmailInput,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import Entry from '../entry';
import { ROUTES } from '../../../utils/constants';
import { rememberPassword } from '../../../utils/api';
import styles from './forgot-password.module.scss';

function ForgotPassword() {
  const [email, setEmail] = useState('');

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

  const onSubmit = (evt) => {
    evt.preventDefault();

    rememberPassword(email)
  }

  return (
    <Entry heading="Восстановление пароля" links={links} onSubmit={onSubmit}>
      <EmailInput
        name="email"
        placeholder="Укажите e-mail"
        value={email || ''}
        onChange={(evt) => setEmail(evt.target.value)}
      />
      <Button htmlType="submit" type="primary" size="medium">
        Восстановить
      </Button>
    </Entry>
  );
}

export default ForgotPassword;
