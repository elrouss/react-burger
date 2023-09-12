import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Input,
  PasswordInput,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import useFormData from 'hooks/useFormData';
import Entry from 'components/entry/entry';
import { ROUTES } from 'utils/constants';
import { resetPassword } from 'utils/api';
import styles from './reset-password.module.scss';

const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const { data, handleData } = useFormData();

  let hasForgottenPassword: string | null | boolean =
    localStorage.getItem('forgotPassword');

  if (hasForgottenPassword) {
    hasForgottenPassword = JSON.parse(hasForgottenPassword) as boolean;
  }

  if (!hasForgottenPassword) navigate(ROUTES.sign.in);

  const onSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    resetPassword(data as unknown as { password: string; token: string })
      .then((res) => {
        if (res.success) {
          navigate(ROUTES.sign.in);
          localStorage.removeItem('forgotPassword');
        }
      })
      .catch((err) => console.error(`Error: ${err}`));
  };

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

  return !hasForgottenPassword ? null : (
    <Entry heading="Восстановление пароля" links={links} onSubmit={onSubmit}>
      <PasswordInput
        name="password"
        placeholder="Введите новый пароль"
        value={data?.password || ''}
        onChange={handleData}
      />
      <Input
        type="text"
        name="token"
        placeholder="Введите код из письма"
        value={data?.token || ''}
        onChange={handleData}
      />
      <Button htmlType="submit" type="primary" size="medium">
        Сохранить
      </Button>
    </Entry>
  );
};

export default ResetPasswordPage;
