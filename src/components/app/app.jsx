import Preloader from '../preloader/preloader';
import AppHeader from '../app-header/app-header';
import Shop from '../shop/shop';

import { useGetIngredientsQuery } from '../../services/features/ingredients/reducer';

function App() {
  const { isLoading, error } = useGetIngredientsQuery();

  if (error) {
    throw new Error(
      `An unexpected error occurred while loading the page: ${error.error} (${error.status} - ${error.originalStatus})`
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
