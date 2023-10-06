import { v4 as uuidv4 } from 'uuid';
import {
  FormattedDate,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientIcon from './components/ingredient-icon/ingredient-icon';
import styles from './card-order.module.scss';

const iconsLimit = 6;

interface ICardOrderMutual {
  number: number;
  name: string;
  totalPrice: number;
  images: string[];
  timestamp: string;
  status?: 'created' | 'pending' | 'done';
}

interface ICardOrderGeneral extends ICardOrderMutual {
  typeInfo: 'general';
}

interface ICardOrderDetails extends ICardOrderMutual {
  typeInfo: 'details';
  ingredientPrice: number;
  ingredientNum: number;
}

type TCardOrderProps = ICardOrderGeneral | ICardOrderDetails;

const CardOrder = (props: TCardOrderProps) => {
  const { typeInfo, number, name, totalPrice, images, timestamp, status } =
    props;

  if (typeInfo === 'general') {
    const imagesNum = images.length;
    const imagesMore = imagesNum - iconsLimit;

    const preview =
      imagesNum > iconsLimit
        ? images
            .slice(0, iconsLimit)
            .map((image, i) => (
              <IngredientIcon
                key={uuidv4()}
                image={image}
                position={i}
                imagesMore={i + 1 === iconsLimit ? imagesMore : 0}
              />
            ))
        : images.map((image, i) => (
            <IngredientIcon key={uuidv4()} image={image} position={i} />
          ));

    return (
      <article className={styles.card}>
        <div className={styles.wrapper}>
          <div className={styles.info}>
            <h2 className={styles.number}>{`#${number}`}</h2>
            <FormattedDate className={styles.date} date={new Date(timestamp)} />
          </div>
          <h3 className={styles.name}>{name}</h3>
          {!!status && <span>{status}</span>}
          <div className={styles.info}>
            <div className={styles.ingredients}>{preview}</div>
            <span className={`text text_type_digits-default ${styles.price}`}>
              {totalPrice}
              <CurrencyIcon type="primary" />
            </span>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className={styles.card}>
      <div className={styles.wrapper}>тест</div>
    </article>
  );
};

export default CardOrder;
