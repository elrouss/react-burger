import {
  Input,
  EmailInput,
  PasswordInput,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import Entry from '../entry/entry';
import styles from './register.module.scss';

function Register() {
  const links = (
    <div className={styles.text}>
      <span>Уже зарегистрированы?</span>
      <Button
        extraClass={styles.link}
        htmlType="button"
        type="secondary"
        size="medium"
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
