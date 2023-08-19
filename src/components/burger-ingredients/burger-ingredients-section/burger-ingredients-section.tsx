import {
  forwardRef,
  ForwardRefExoticComponent,
  RefAttributes,
  ReactElement,
} from 'react';
import { useGetIngredientsQuery } from 'services/features/ingredients/reducer';
import { IIngredientsTable } from 'services/features/ingredients/types';
import BurgerIngredient from './burger-ingredient/burger-ingredient';
import styles from './burger-ingredients-section.module.scss';

const BurgerIngredientsSection: ForwardRefExoticComponent<
  Omit<IIngredientsTable, 'ref'> & RefAttributes<HTMLDivElement>
> = forwardRef(({ typeRus, typeEng }, ref): ReactElement => {
  const { data } = useGetIngredientsQuery();
  const ingredients = data?.data || [];

  return (
    <section aria-label={typeRus} ref={ref}>
      <h2 className={styles.heading}>{typeRus}</h2>
      <div className={styles.content}>
        {ingredients
          .filter(({ type }) => type === typeEng)
          .map((ingredient) => (
            <BurgerIngredient key={ingredient._id} ingredient={ingredient} />
          ))}
      </div>
    </section>
  );
});

export default BurgerIngredientsSection;
