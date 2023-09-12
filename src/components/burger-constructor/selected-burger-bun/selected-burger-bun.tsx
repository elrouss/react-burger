import { FC } from 'react';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { IIngredient } from 'services/features/ingredients/types';
import styles from './selected-burger-bun.module.scss';

interface IBurgerBunProps {
  selectedBun: IIngredient | null;
  positionRu: 'верх' | 'низ';
  positionEng: 'top' | 'bottom';
  ingredientTypeDrop: string;
  isOver: boolean;
}

const BurgerBun: FC<IBurgerBunProps> = ({
  selectedBun,
  isOver,
  ingredientTypeDrop,
  positionRu,
  positionEng,
}) =>
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
  );

export default BurgerBun;
