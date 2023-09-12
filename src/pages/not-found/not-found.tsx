import { useNavigate } from 'react-router-dom';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import AppHeader from 'components/app-header/app-header';
import styles from './not-found.module.scss';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <AppHeader />
      <main>
        <div className={styles.wrapper}>
          <div className={styles.text}>
            <h1 className={styles.heading}>404</h1>
            <p className={styles.paragraph}>
              Упс! Вы попали на несуществующую страницу
            </p>
          </div>
          <div className={styles.image} />
          <Button
            htmlType="button"
            type="primary"
            size="medium"
            onClick={() => navigate(-1)}
          >
            Вернуться назад
          </Button>
        </div>
      </main>
    </>
  );
};

export default NotFoundPage;
