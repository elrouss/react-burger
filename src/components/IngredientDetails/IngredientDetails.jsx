import Modal from '../Modal/Modal';

import ingredientsTypes from '../../utils/types/ingredients';

import styles from './IngredientDetails.module.scss';

function IngredientDetails({
  currentIngredient: { image, name, calories, proteins, fat, carbohydrates },
  ...rest
}) {
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
            <li className={styles.listItem}>
              <h5 className={styles.listHeading}>Калории,ккал</h5>
              <span>{calories}</span>
            </li>
            <li className={styles.listItem}>
              <h5 className={styles.listHeading}>Белки, г</h5>
              <span>{proteins}</span>
            </li>
            <li className={styles.listItem}>
              <h5 className={styles.listHeading}>Жиры, г</h5>
              <span>{fat}</span>
            </li>
            <li className={styles.listItem}>
              <h5 className={styles.listHeading}>Углеводы, г</h5>
              <span>{carbohydrates}</span>
            </li>
          </ul>
        </div>
      </div>
    </Modal>
  );
}

IngredientDetails.propTypes = ingredientsTypes;

export default IngredientDetails;
