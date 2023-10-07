import CardOrder from 'components/cards/card-order/card-order';
import { TCardIngredientsDetails } from 'services/features/ingredients/types';
import styles from './ingredients.module.scss';

interface IIngredientsProps {
  data: TCardIngredientsDetails;
}

const Ingredients = ({ data }: IIngredientsProps) => (
  <div className={`custom-scroll ${styles.ingredients}`}>
    {Object.keys(data).map((id) => {
      const { name, image, number, price } = data[id];

      return (
        <CardOrder
          key={id}
          typeInfo="details"
          ingredientName={name}
          ingredientImage={image}
          ingredientNum={number}
          ingredientPrice={price}
        />
      );
    })}
  </div>
);

export default Ingredients;
