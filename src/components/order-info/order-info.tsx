import classNames from 'classnames';
import { useParams, useLocation } from 'react-router-dom';
import { useAppSelector } from 'services/app/hooks';
import { useGetIngredientsQuery } from 'services/features/ingredients/reducer';
import { FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import Price from 'components/price/price';
import getStatusLocalLang from 'utils/calculations/get-status-local-lang';
import {
  IIngredient,
  TCardIngredientsDetails,
} from 'services/features/ingredients/types';
import { getLiveOrderFeedData } from 'services/features/live-order-feed/selectors';
import { getProfileLiveOrderFeedData } from 'services/features/profile-live-order-feed/selectors';
import { TWebsocketOrder } from 'services/types/live-order-feed';
import { ROUTES } from 'utils/constants';
import Ingredients from './components/ingredients/ingredients';
import styles from './order-info.module.scss';

interface IOrderInfoProps {
  orderNumPosition?: 'start' | 'center';
  isSinglePage?: boolean;
  hasWrapper?: boolean;
}

const OrderInfo = ({
  orderNumPosition = 'start',
  isSinglePage = false,
  hasWrapper = false,
}: IOrderInfoProps) => {
  const { pathname } = useLocation();
  const { id } = useParams();
  const { data } = useGetIngredientsQuery();

  const isRouteLiveOrderFeedRoute = pathname.includes(ROUTES.orders);

  const map = new Map<string, IIngredient>();
  data?.data.forEach(({ _id, ...rest }) => map.set(_id, rest));

  const liveFeedOrdersData = useAppSelector(
    isRouteLiveOrderFeedRoute
      ? getLiveOrderFeedData
      : getProfileLiveOrderFeedData
  );

  if (!map.size || !liveFeedOrdersData) return null;

  const { number, name, status, createdAt, ingredients } =
    liveFeedOrdersData.orders.find(
      (order) => order._id === id
    ) as TWebsocketOrder;

  const cardIngredientsDetails: TCardIngredientsDetails = {};
  let totalPrice = 0;

  ingredients.forEach((ingredientId) => {
    const {
      name: ingredientName,
      price,
      image,
    } = map.get(ingredientId) as IIngredient;
    totalPrice += price;

    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    cardIngredientsDetails[ingredientId]
      ? (cardIngredientsDetails[ingredientId].number += 1)
      : (cardIngredientsDetails[ingredientId] = {
          name: ingredientName,
          price,
          image,
          number: 1,
        });
  });

  const localLangStatus = getStatusLocalLang(status);

  return (
    <div className={classNames({ [styles.wrapper]: hasWrapper })}>
      <h3
        className={classNames('text text_type_digits-default', {
          [styles.positionCenter]: orderNumPosition === 'center',
        })}
      >{`#${number}`}</h3>
      <div
        className={classNames(styles.name, {
          [styles.nameSinglePage]: isSinglePage,
        })}
      >
        <h4 className="text text_type_main-medium">{name}</h4>
        <span
          className={classNames('text text_type_main-default', {
            [styles.green]: status === 'done',
          })}
        >
          {localLangStatus}
        </span>
      </div>
      <div className={styles.ingredients}>
        <h4 className="text text_type_main-medium">Состав:</h4>
        <Ingredients data={cardIngredientsDetails} />
      </div>
      <div className={styles.summary}>
        <FormattedDate
          className={`text text_type_main-default ${styles.date}`}
          date={new Date(createdAt)}
        />
        <Price type="total" totalPrice={totalPrice} size="small" />
      </div>
    </div>
  );
};

export default OrderInfo;
