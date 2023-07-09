import { useNavigate } from 'react-router-dom';
import {
  EmailInput,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import useFormData from '../../../hooks/useFormData';
import Entry from '../entry';
import { ROUTES } from '../../../utils/constants';
import { rememberPassword } from '../../../utils/api';
import styles from './forgot-password.module.scss';

function ForgotPassword() {
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

    rememberPassword(data)
      .then((res) => {
        if (res.success) {
          localStorage.setItem('forgotPassword', JSON.stringify(true));
          navigate(ROUTES.password.reset);
        }
      })
      .catch((err) => console.error(`Error: ${err}`));
  };

  return (
    <Entry heading="Восстановление пароля" links={links} onSubmit={onSubmit}>
      <EmailInput
        name="email"
        placeholder="Укажите e-mail"
        value={data?.email || ''}
        onChange={handleData}
      />
      <Button htmlType="submit" type="primary" size="medium">
        Восстановить
      </Button>
    </Entry>
  );
}

export default ForgotPassword;
