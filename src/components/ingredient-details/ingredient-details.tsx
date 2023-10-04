import { useEffect, FC, ReactElement } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'services/app/hooks';
import { useGetIngredientsQuery } from 'services/features/ingredients/reducer';
import { SHOW_INGREDIENT_DETAILS } from 'services/features/current-ingredient/slice';
import getCurrentIngredient from 'services/features/current-ingredient/selectors';
import styles from './ingredient-details.module.scss';

interface IIngredientDetailsProps {
  isSinglePage?: boolean;
}

interface IListIngredientParams {
  param?: number;
  nameEng: string;
  nameRus: string;
}

const IngredientDetails: FC<IIngredientDetailsProps> = ({
  isSinglePage = false,
}): ReactElement => {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { id: _id } = useParams();
  const { data } = useGetIngredientsQuery();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const res = data?.data.find((ingredient) => ingredient._id === _id);

    if (res) {
      dispatch(SHOW_INGREDIENT_DETAILS(res));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const currentIngredient = useAppSelector(getCurrentIngredient);

  const list: IListIngredientParams[] = [
    {
      param: currentIngredient?.calories,
      nameEng: 'calories',
      nameRus: 'Калории,ккал',
    },
    {
      param: currentIngredient?.proteins,
      nameEng: 'proteins',
      nameRus: 'Белки, г',
    },
    {
      param: currentIngredient?.fat,
      nameEng: 'fat',
      nameRus: 'Жиры, г',
    },
    {
      param: currentIngredient?.carbohydrates,
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
          src={currentIngredient?.image}
          alt={`Блюдо дня: ${currentIngredient?.name}`}
        />
        {(isSinglePage && (
          <h2 className={styles.headingItem}>{currentIngredient?.name}</h2>
        )) || <h4 className={styles.headingItem}>{currentIngredient?.name}</h4>}
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
};

export default IngredientDetails;
