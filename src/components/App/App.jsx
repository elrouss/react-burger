import { useEffect, useState } from 'react';

import AppHeader from '../AppHeader/AppHeader';
import Shop from '../Shop/Shop';
import Modal from '../Modal/Modal';

import API from '../../utils/constants';

import './App.module.scss';

function App() {
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    (async function getIngredients() {
      try {
        const res = await fetch(API.ingredients);
        const success = await res.json();

        if (success) {
          setIngredients(success.data);
        } else {
          throw new Error();
        }
      } catch (err) {
        console.error(
          `Ошибка в процессе получения данных об ингредиентах с сервера: ${err}`
        );
      }
    })();
  }, []);

  return (
    <>
      <AppHeader />
      <Shop data={ingredients} />

      <Modal />
    </>
  );
}

export default App;
