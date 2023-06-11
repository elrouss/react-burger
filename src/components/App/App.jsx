import { useReducer, useMemo, useEffect, useState } from 'react';

import IngredientsContext from '../../contexts/IngredientsContext';
import SelectedIngredientsContext from '../../contexts/SelectedIngredientsContext';

import {
  reducerSelectedIngredients,
  initialSelectedIngredients,
} from '../../utils/reducers/reducerSelectedIngredients';

import AppHeader from '../AppHeader/AppHeader';
import Shop from '../Shop/Shop';

import API from '../../utils/constants';

function App() {
  const [selectedIngredientsState, selectedIngredientsDispatcher] = useReducer(
    reducerSelectedIngredients,
    initialSelectedIngredients
  );

  const [ingredients, setIngredients] = useState([]);

  const contextIngredients = useMemo(() => ({ ingredients }), [ingredients]);
  const contextSelectedIngredients = useMemo(
    () => ({
      selectedIngredientsState,
      selectedIngredientsDispatcher,
    }),
    [selectedIngredientsState]
  );

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
          `Error while getting ingredient data from server: ${err}`
        );
      }
    }

    getIngredients();
  }, []);

  return (
    <>
      <AppHeader />
      <IngredientsContext.Provider value={contextIngredients}>
        <SelectedIngredientsContext.Provider value={contextSelectedIngredients}>
          <Shop />
        </SelectedIngredientsContext.Provider>
      </IngredientsContext.Provider>
    </>
  );
}

export default App;
