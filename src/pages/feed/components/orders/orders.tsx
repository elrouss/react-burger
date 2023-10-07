/* eslint-disable consistent-return */
import { Link, useLocation } from 'react-router-dom';
import { useGetIngredientsQuery } from 'services/features/ingredients/reducer';
import mockOrders from 'components/cards/card-order/mock';
import CardOrder from 'components/cards/card-order/card-order';
import { IIngredient } from 'services/features/ingredients/types';
import { ROUTES } from 'utils/constants';
import styles from './orders.module.scss';

const Orders = () => {
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
        mockOrders.orders.map((order) => {
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
              to={`${ROUTES.orders}/${order._id}`}
              state={{ background: location }}
            >
              <CardOrder
                typeInfo="general"
                number={order.number}
                name={order.name}
                images={previewIcons}
                timestamp={order.createdAt}
                totalPrice={totalPrice}
              />
            </Link>
          );
        })}
    </section>
  );
};

export default Orders;
