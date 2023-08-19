import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'services/app/hooks';
import {
  EmailInput,
  PasswordInput,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import useFormData from 'hooks/useFormData';
import Entry from 'components/entry/entry';
import { ROUTES } from 'utils/constants';
import { loginUser } from 'services/features/user/api';
import { isLoading } from 'services/features/user/selectors';
import { IUserLogin } from 'services/features/user/types';
import styles from './login.module.scss';

const LoginPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { data, handleData } = useFormData();

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

  const onSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    dispatch(loginUser(data as unknown as IUserLogin))
      .then(() => navigate(location.state?.from?.pathname || ROUTES.home))
      .catch((err) => console.error(`Error: ${err}`));
  };

  return (
    <Entry heading="Вход" links={links} onSubmit={onSubmit}>
      <EmailInput
        name="email"
        value={data?.email || ''}
        onChange={handleData}
      />
      <PasswordInput
        name="password"
        autoComplete="on"
        value={data?.password || ''}
        onChange={handleData}
      />
      <Button
        htmlType="submit"
        type="primary"
        size="medium"
        disabled={useAppSelector(isLoading)}
      >
        Войти
      </Button>
    </Entry>
  );
};

export default LoginPage;
