import {
  forwardRef,
  ForwardRefExoticComponent,
  RefAttributes,
  ReactElement,
} from 'react';
import { useGetIngredientsQuery } from 'services/features/ingredients/reducer';
import { IIngredientsTable } from 'services/features/ingredients/types';
import BurgerIngredient from '../../cards/burger-ingredient/burger-ingredient';
import styles from './burger-ingredients-section.module.scss';

const BurgerIngredientsSection: ForwardRefExoticComponent<
  Omit<IIngredientsTable, 'ref'> & RefAttributes<HTMLDivElement>
> = forwardRef(({ typeRus, typeEng }, ref): ReactElement => {
  const { data } = useGetIngredientsQuery();
  const ingredients = data?.data || [];

  return (
    <section aria-label={typeRus} ref={ref} data-test={typeEng}>
      <h2 className={styles.heading}>{typeRus}</h2>
      <div className={styles.content} data-test="content">
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
