import { useNavigate } from 'react-router-dom';
import {
  Input,
  EmailInput,
  PasswordInput,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import Entry from '../entry/entry';
import { ROUTES } from '../../utils/constants';
import styles from './register.module.scss';

function Register() {
  const navigate = useNavigate();

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

  return (
    <Entry heading="Регистрация" links={links}>
      <Input type="text" placeholder="Имя" />
      <EmailInput />
      <PasswordInput />
      <Button htmlType="submit" type="primary" size="medium">
        Зарегистрироваться
      </Button>
    </Entry>
  );
}

export default Register;
