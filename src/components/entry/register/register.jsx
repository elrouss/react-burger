import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Input,
  EmailInput,
  PasswordInput,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import useFormData from '../../../hooks/useFormData';
import Entry from '../entry';
import { ROUTES } from '../../../utils/constants';
import { registerUser } from '../../../services/features/user/api';
import { isLoading } from '../../../services/features/user/selectors';
import styles from './register.module.scss';

function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data, handleData } = useFormData();

  const links = (
    <div className={styles.text}>
      <span>Уже зарегистрированы?</span>
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

    dispatch(registerUser(data));
  };

  return (
    <Entry heading="Регистрация" links={links} onSubmit={onSubmit}>
      <Input
        type="text"
        name="name"
        placeholder="Имя"
        value={data?.name || ''}
        onChange={handleData}
      />
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
        Зарегистрироваться
      </Button>
    </Entry>
  );
}

export default Register;
