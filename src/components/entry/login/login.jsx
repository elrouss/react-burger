import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  EmailInput,
  PasswordInput,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import Entry from '../entry';
import { ROUTES } from '../../../utils/constants';
import styles from './login.module.scss';

function Login() {
  const [data, setData] = useState({
    email: '',
    password: '',
  });

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

  const handleData = (evt) =>
    setData({ ...data, [evt.target.name]: evt.target.value });

  const onSubmit = (evt) => {
    evt.preventDefault();

    console.log(data);
    // dispatch(registerUser(data));
  };

  return (
    <Entry heading="Вход" links={links} onSubmit={onSubmit}>
      <EmailInput name="email" value={data.email || ''} onChange={handleData} />
      <PasswordInput
        name="password"
        value={data.password || ''}
        onChange={handleData}
      />
      <Button
        htmlType="submit"
        type="primary"
        size="medium"
        // disabled={isLoading}
      >
        Войти
      </Button>
    </Entry>
  );
}

export default Login;
