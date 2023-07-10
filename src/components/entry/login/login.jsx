import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  EmailInput,
  PasswordInput,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import useFormData from '../../../hooks/useFormData';
import Entry from '../entry';
import { ROUTES } from '../../../utils/constants';
import { loginUser } from '../../../services/features/user/api';
import { isLoading } from '../../../services/features/user/selectors';
import styles from './login.module.scss';

function Login() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
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

  const onSubmit = (evt) => {
    evt.preventDefault();

    dispatch(loginUser(data))
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
        disabled={useSelector(isLoading)}
      >
        Войти
      </Button>
    </Entry>
  );
}

export default Login;
