import AppHeader from '../../components/app-header/app-header';
import IngredientDetails from '../../components/ingredient-details/ingredient-details';
import styles from './ingredient-details.module.scss';

function IngredientDetailsPage() {
  return (
    <>
      <AppHeader />
      <main className={styles.main}>
        <IngredientDetails isSinglePage />
      </main>
    </>
  );
}

export default IngredientDetailsPage;
