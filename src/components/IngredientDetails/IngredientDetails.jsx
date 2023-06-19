import { useSelector } from 'react-redux';

import styles from './IngredientDetails.module.scss';

function IngredientDetails() {
  const currentIngredient = useSelector(
    (state) => state.currentIngredient.ingredient
  );

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
      <h3 className={styles.heading}>Детали ингредиента</h3>
      <div className={styles.item}>
        <img
          className={styles.image}
          src={currentIngredient.image}
          alt={`Блюдо дня: ${currentIngredient.name}`}
        />
        <h4 className={styles.headingItem}>{currentIngredient.name}</h4>
        <ul className={styles.list}>
          {list.map(({ param, nameEng, nameRus }) => (
            <li key={`key-${nameEng}`} className={styles.listItem}>
              <h5 className={styles.listHeading}>{nameRus}</h5>
              <span>{param}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default IngredientDetails;
