import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Input,
  PasswordInput,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { editUserData } from '../../../services/features/user/api';
import {
  getUserLogin,
  getUserName,
} from '../../../services/features/user/selectors';
import styles from './user-info.module.scss';

function UserInfo() {
  const dispatch = useDispatch();

  const userName = useSelector(getUserName);
  const userEmail = useSelector(getUserLogin);

  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
  });

  useEffect(() => {
    if (userName && userEmail) {
      setData({ ...data, name: userName, email: userEmail });
    }
  }, [userName, userEmail]);

  const handleData = (evt) =>
    setData({ ...data, [evt.target.name]: evt.target.value });

  const onSubmit = (evt) => {
    evt.preventDefault();

    dispatch(editUserData(data));
  };

  return (
    <form className={styles.form} noValidate onSubmit={onSubmit}>
      <Input
        name="name"
        placeholder="Имя"
        value={data.name || ''}
        icon="EditIcon"
        onChange={handleData}
      />
      <Input
        name="email"
        placeholder="Логин"
        value={data.email || ''}
        icon="EditIcon"
        onChange={handleData}
      />
      <PasswordInput
        name="password"
        icon="EditIcon"
        value={data.password || ''}
        onChange={handleData}
      />
      <div className={styles.buttons}>
        <Button
          htmlType="button"
          type="secondary"
          extraClass={styles.buttonCancel}
          // onClick={() => }
        >
          Отмена
        </Button>
        <Button htmlType="submit" type="primary">
          Сохранить
        </Button>
      </div>
    </form>
  );
}

export default UserInfo;
