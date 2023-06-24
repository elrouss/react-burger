import PropTypes from 'prop-types';

import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './selected-burger-bun.module.scss';

function BurgerBun({
  selectedBun,
  isOver,
  ingredientTypeDrop,
  positionRu,
  positionEng,
}) {
  return (
    (selectedBun && (
      <ConstructorElement
        extraClass={styles.bun}
        type={positionEng}
        isLocked
        text={`${selectedBun?.name} (${positionRu})`}
        price={selectedBun?.price}
        thumbnail={selectedBun?.image}
      />
    )) || (
      <div
        className={`${styles.containerBun} ${
          (positionEng === 'top' && styles.containerBunTop) ||
          styles.containerBunBottom
        }${
          (isOver &&
            ingredientTypeDrop === 'bun' &&
            ` ${styles.containerEmptyDrop}`) ||
          ''
        }`}
      >
        <span>Перетащите булку</span>
      </div>
    )
  );
}

BurgerBun.propTypes = {
  selectedBun: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    key: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }),
  isOver: PropTypes.bool,
  ingredientTypeDrop: PropTypes.string,
  positionRu: PropTypes.string.isRequired,
  positionEng: PropTypes.string.isRequired,
};

BurgerBun.defaultProps = {
  selectedBun: null,
  isOver: undefined,
  ingredientTypeDrop: undefined,
};

export default BurgerBun;
