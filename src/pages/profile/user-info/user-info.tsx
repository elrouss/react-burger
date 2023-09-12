import { useCallback, useEffect, useState, FormEvent } from 'react';
import { useAppDispatch, useAppSelector } from 'services/app/hooks';
import {
  Input,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import useFormData from 'hooks/useFormData';
import { editUserData } from 'services/features/user/api';
import { getUserLogin, getUserName } from 'services/features/user/selectors';
import { IUserEditInfo } from 'services/features/user/types';
import Buttons from './buttons/buttons';
import styles from './user-info.module.scss';

const UserInfoPage = () => {
  const dispatch = useAppDispatch();

  const userName = useAppSelector(getUserName);
  const userEmail = useAppSelector(getUserLogin);

  const { data, setData, handleData } = useFormData();
  const [areButtonsVisible, setAreButtonsVisible] = useState(false);

  useEffect(() => {
    if (userName && userEmail) {
      setData({ ...data, name: userName, email: userEmail });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userName, userEmail]);

  useEffect(() => {
    setAreButtonsVisible(
      data?.name !== userName || data?.email !== userEmail || !!data?.password
    );
  }, [data, userName, userEmail]);

  const cancelChanges = useCallback(() => {
    if (userName && userEmail) {
      setData({ name: userName, email: userEmail, password: '' });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userName, userEmail]);

  const onSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    dispatch(editUserData(data as unknown as IUserEditInfo));
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
};

export default UserInfoPage;
