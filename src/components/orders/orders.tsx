/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable consistent-return */
import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from 'services/app/hooks';
import { useGetIngredientsQuery } from 'services/features/ingredients/reducer';
// import { WebsocketStatus } from 'services/types/live-order-feed';
import { connect } from 'services/features/live-order-feed/actions';
import { getLiveOrderFeedData } from 'services/features/live-order-feed/selectors';
import CardOrder from 'components/cards/card-order/card-order';
import { IIngredient } from 'services/features/ingredients/types';
import { WEBSOCKET } from 'utils/constants';
import styles from './orders.module.scss';

interface IOrdersProps {
  dynamicParentRoute: string;
  haveStatus: boolean;
}

const Orders = ({ haveStatus, dynamicParentRoute }: IOrdersProps) => {
  const dispatch = useAppDispatch();

  const { data } = useGetIngredientsQuery();
  const location = useLocation();

  const map = new Map<string, IIngredient>();
  data?.data.forEach(({ _id, ...rest }) => map.set(_id, rest));

  useEffect(() => {
    dispatch(connect(`${WEBSOCKET.baseUrl}${WEBSOCKET.endpoints.ordersAll}`));
  }, []);

  const liveFeedOrders = useAppSelector(getLiveOrderFeedData);

  return (
    <section
      className={`custom-scroll ${styles.section}`}
      aria-label="Список сделанных заказов"
    >
      {!!map.size &&
        !!liveFeedOrders &&
        liveFeedOrders.map((order) => {
          let previewIcons: string[] = [];
          let totalPrice = 0;

          order.ingredients.forEach((id) => {
            const { price, image } = map.get(id) as IIngredient;

            totalPrice += price;
            previewIcons.push(image);
          });

          previewIcons = [...new Set(previewIcons)];

          return (
            <Link
              key={order._id}
              to={`${dynamicParentRoute}/${order._id}`}
              state={{ background: location }}
            >
              <CardOrder
                typeInfo="general"
                number={order.number}
                name={order.name}
                images={previewIcons}
                timestamp={order.createdAt}
                totalPrice={totalPrice}
                status={haveStatus ? order.status : undefined}
              />
            </Link>
          );
        })}
    </section>
  );
};

export default Orders;
