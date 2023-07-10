import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Input,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import useFormData from '../../../hooks/useFormData';
import { editUserData } from '../../../services/features/user/api';
import {
  getUserLogin,
  getUserName,
} from '../../../services/features/user/selectors';
import Buttons from './buttons/buttons';
import styles from './user-info.module.scss';

function UserInfo() {
  const dispatch = useDispatch();

  const userName = useSelector(getUserName);
  const userEmail = useSelector(getUserLogin);

  const { data, setData, handleData } = useFormData();
  const [areButtonsVisible, setAreButtonsVisible] = useState(false);

  useEffect(() => {
    if (userName && userEmail) {
      setData({ ...data, name: userName, email: userEmail });
    }
  }, [userName, userEmail]);

  useEffect(() => {
    setAreButtonsVisible(
      data.name !== userName || data.email !== userEmail || data.password
    );
  }, [data, userName, userEmail]);

  const cancelChanges = useCallback(() => {
    setData({ name: userName, email: userEmail, password: '' });
  }, [userName, userEmail]);

  const onSubmit = (evt) => {
    evt.preventDefault();

    dispatch(editUserData(data));
  };

  return (
    <form className={styles.form} noValidate onSubmit={onSubmit}>
      <Input
        name="name"
        placeholder="Имя"
        value={data?.name || ''}
        icon="EditIcon"
        onChange={handleData}
      />
      <Input
        name="email"
        placeholder="Логин"
        value={data?.email || ''}
        icon="EditIcon"
        onChange={handleData}
      />
      <PasswordInput
        name="password"
        icon="EditIcon"
        value={data?.password || ''}
        onChange={handleData}
      />
      {areButtonsVisible && <Buttons onCancel={cancelChanges} />}
    </form>
  );
}

export default UserInfo;
