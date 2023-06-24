import { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import {
  ConstructorElement,
  DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

import { CHANGE_POSITION_INGREDIENT } from '../../../services/features/selected-ingredients/reducer';
import { ingredientType } from '../../../utils/types/ingredients';
import DRAG_TYPES from '../../../utils/drag-types';

import styles from './selected-burger-ingredient.module.scss';

function SelectedBurgerIngredient({ ingredient, index, removeIngredient }) {
  const ref = useRef(null);
  const dispatch = useDispatch();

  const { _id } = ingredient;

  const [{ handlerId }, drop] = useDrop({
    accept: DRAG_TYPES.INGREDIENT_SORT,
    collect: (monitor) => ({
      handlerId: monitor.getHandlerId(),
    }),
    hover(item, monitor) {
      if (!ref.current) return;

      const dragIndex = item.index;
      const hoverIndex = index;
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) return;

      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      // Determine mouse position
      const clientOffset = monitor.getClientOffset();
      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards and upwards
      if (
        (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) ||
        (dragIndex > hoverIndex && hoverClientY > hoverMiddleY)
      ) {
        return;
      }
      // Time to actually perform the action
      dispatch(CHANGE_POSITION_INGREDIENT({ dragIndex, hoverIndex }));
      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      // eslint-disable-next-line no-param-reassign
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: DRAG_TYPES.INGREDIENT_SORT,
    item: { _id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  return (
    <div
      className={`${styles.item}${
        (isDragging && ` ${styles.itemDragging}`) || ''
      }`}
      key={`container-${ingredient.key}`}
      ref={ref}
      data-handler-id={handlerId}
    >
      <DragIcon key={`icon-${ingredient.key}`} type="primary" />
      <ConstructorElement
        key={ingredient.key}
        extraClass={styles.constructorElement}
        text={ingredient.name}
        price={ingredient.price}
        thumbnail={ingredient.image}
        handleClose={removeIngredient}
      />
    </div>
  );
}

SelectedBurgerIngredient.propTypes = {
  ingredient: ingredientType.isRequired,
  index: PropTypes.number.isRequired,
  removeIngredient: PropTypes.func.isRequired,
};

export default SelectedBurgerIngredient;
