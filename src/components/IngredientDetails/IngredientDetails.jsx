import Modal from '../Modal/Modal';

import ingredientsTypes from '../../utils/types/ingredients';

import styles from './IngredientDetails.module.scss';

function IngredientDetails({
  currentIngredient: { image, name, calories, proteins, fat, carbohydrates },
  ...rest
}) {
  const list = [
    {
      param: calories,
      nameEng: 'calories',
      nameRus: 'Калории,ккал',
    },
    {
      param: proteins,
      nameEng: 'proteins',
      nameRus: 'Белки, г',
    },
    {
      param: fat,
      nameEng: 'fat',
      nameRus: 'Жиры, г',
    },
    {
      param: carbohydrates,
      nameEng: 'carbohydrates',
      nameRus: 'Углеводы, г',
    },
  ];

  return (
    <Modal {...rest}>
      <div className={styles.wrapper}>
        <h3 className={styles.heading}>Детали ингредиента</h3>
        <div className={styles.item}>
          <img
            className={styles.image}
            src={image}
            alt={`Блюдо дня: ${name}`}
          />
          <h4 className={styles.headingItem}>{name}</h4>
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
    </Modal>
  );
}

IngredientDetails.propTypes = ingredientsTypes;

export default IngredientDetails;
