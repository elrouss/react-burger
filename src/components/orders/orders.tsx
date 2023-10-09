/* eslint-disable consistent-return */
import { Link, useLocation } from 'react-router-dom';
import { useGetIngredientsQuery } from 'services/features/ingredients/reducer';
import CardOrder from 'components/cards/card-order/card-order';
import { IIngredient } from 'services/features/ingredients/types';
import { TWebsocketOrders } from 'services/types/live-order-feed';
import styles from './orders.module.scss';

interface IOrdersProps {
  ordersData: TWebsocketOrders;
  dynamicParentRoute: string;
  haveStatus: boolean;
}

const Orders = ({
  ordersData,
  haveStatus,
  dynamicParentRoute,
}: IOrdersProps) => {
  const { data } = useGetIngredientsQuery();
  const location = useLocation();

  const map = new Map<string, IIngredient>();
  data?.data.forEach(({ _id, ...rest }) => map.set(_id, rest));

  return (
    <section
      className={`custom-scroll ${styles.section}`}
      aria-label="Список сделанных заказов"
    >
      {!!map.size &&
        ordersData.orders.map((order) => {
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
