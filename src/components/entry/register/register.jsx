import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  Input,
  EmailInput,
  PasswordInput,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import Entry from '../entry';
import { ROUTES } from '../../../utils/constants';
import { registerUser } from '../../../services/features/user/api';
// import { isLoading } from '../../../services/features/user/selectors';
import styles from './register.module.scss';

function Register() {
  const [data, setData] = useState({
    email: '',
    password: '',
    name: '',
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

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

  const handleData = (evt) =>
    setData({ ...data, [evt.target.name]: evt.target.value });

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
        value={data.name || ''}
        onChange={handleData}
      />
      <EmailInput name="email" value={data.email || ''} onChange={handleData} />
      <PasswordInput
        name="password"
        autoComplete="on"
        value={data.password || ''}
        onChange={handleData}
      />
      <Button
        htmlType="submit"
        type="primary"
        size="medium"
        // disabled={isLoading} TODO
      >
        Зарегистрироваться
      </Button>
    </Entry>
  );
}

export default Register;
