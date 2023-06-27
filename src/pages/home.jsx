import Preloader from '../components/preloader/preloader';
import AppHeader from '../components/app-header/app-header'
import Shop from '../components/shop/shop';

import { useGetIngredientsQuery } from '../services/features/ingredients/reducer';

function HomePage() {
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

export default HomePage;
