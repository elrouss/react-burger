import { useNavigate } from 'react-router-dom';
import {
  Input,
  PasswordInput,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import useFormData from '../../../hooks/useFormData';
import Entry from '../entry';
import { ROUTES } from '../../../utils/constants';
import { resetPassword } from '../../../utils/api';
import styles from './reset-password.module.scss';

function ResetPassword() {
  const navigate = useNavigate();
  const { data, handleData } = useFormData();

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

    resetPassword(data);
  };

  return (
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
}

export default ResetPassword;
