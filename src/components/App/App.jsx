import Preloader from '../Preloader/Preloader';
import AppHeader from '../AppHeader/AppHeader';
import Shop from '../Shop/Shop';

import { useGetIngredientsQuery } from '../../services/features/ingredients/reducer';

function App() {
  const { isLoading, error } = useGetIngredientsQuery();

  if (error) {
    throw new Error(
      `При загрузке страницы произошла непредвиденная ошибка: ${error.error} (${error.status} - ${error.originalStatus})`
    );
  }

  return (
    <>
      <AppHeader />
      {(isLoading && <Preloader />) || <Shop />}
    </>
  );
}

export default App;
