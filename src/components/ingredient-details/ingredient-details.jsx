import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useGetIngredientsQuery } from '../../services/features/ingredients/reducer';
import { SHOW_INGREDIENT_DETAILS } from '../../services/features/current-ingredient/reducer';
import getCurrentIngredient from '../../services/features/current-ingredient/selectors';
import styles from './ingredient-details.module.scss';

function IngredientDetails({ isSinglePage = false }) {
  const { id: _id } = useParams();
  const { data } = useGetIngredientsQuery();
  const dispatch = useDispatch();

  useEffect(() => {
    const res = data?.data.find((ingredient) => ingredient._id === _id);

    if (res) {
      dispatch(SHOW_INGREDIENT_DETAILS(res));
    }
  }, [data]);

  const currentIngredient = useSelector(getCurrentIngredient);

  const list = [
    {
      param: currentIngredient.calories,
      nameEng: 'calories',
      nameRus: 'Калории,ккал',
    },
    {
      param: currentIngredient.proteins,
      nameEng: 'proteins',
      nameRus: 'Белки, г',
    },
    {
      param: currentIngredient.fat,
      nameEng: 'fat',
      nameRus: 'Жиры, г',
    },
    {
      param: currentIngredient.carbohydrates,
      nameEng: 'carbohydrates',
      nameRus: 'Углеводы, г',
    },
  ];

  return (
    <div className={styles.wrapper}>
      {(isSinglePage && (
        <h1 className={styles.heading}>Детали ингредиента</h1>
      )) || <h3 className={styles.heading}>Детали ингредиента</h3>}
      <div className={styles.item}>
        <img
          className={styles.image}
          src={currentIngredient.image}
          alt={`Блюдо дня: ${currentIngredient.name}`}
        />
        {(isSinglePage && (
          <h2 className={styles.headingItem}>{currentIngredient.name}</h2>
        )) || <h4 className={styles.headingItem}>{currentIngredient.name}</h4>}
        <ul className={styles.list}>
          {list.map(({ param, nameEng, nameRus }) => (
            <li key={`key-${nameEng}`} className={styles.listItem}>
              {(isSinglePage && (
                <h3 className={styles.listHeading}>{nameRus}</h3>
              )) || <h5 className={styles.listHeading}>{nameRus}</h5>}
              <span>{param}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

IngredientDetails.propTypes = {
  isSinglePage: PropTypes.bool,
};

IngredientDetails.defaultProps = {
  isSinglePage: false,
};

export default IngredientDetails;
