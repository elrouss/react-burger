import { useEffect, useState } from 'react';

import AppHeader from '../AppHeader/AppHeader';
import Shop from '../Shop/Shop';

import API from '../../utils/constants';

import './App.module.scss';

function App() {
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    // eslint-disable-next-line consistent-return
    async function getIngredients() {
      try {
        const res = await fetch(API.ingredients);

        if (res.ok) {
          const success = await res.json();

          return setIngredients(success.data);
        }

        return Promise.reject(new Error(`Ошибка ${res.status}`));
      } catch (err) {
        console.error(
          `Ошибка в процессе получения данных об ингредиентах с сервера: ${err}`
        );
      }
    }

    getIngredients();
  }, []);

  return (
    <>
      <AppHeader />
      <Shop data={ingredients} />
    </>
  );
}

export default App;
