/* eslint-disable consistent-return */
import { useGetIngredientsQuery } from 'services/features/ingredients/reducer';
import mockOrders from 'components/cards/card-order/mock';
import CardOrder from 'components/cards/card-order/card-order';
import { IIngredient } from 'services/features/ingredients/types';
import styles from './orders.module.scss';

type TCardIngredientsDetails = {
  [key: string]: {
    name: string;
    type: 'bun' | 'main' | 'sauce';
    number: number;
    price: number;
    image: string;
  };
};

const Orders = () => {
  const { data } = useGetIngredientsQuery();

  const map = new Map<string, IIngredient>();
  data?.data.forEach(({ _id, ...rest }) => map.set(_id, rest));

  return (
    <section className={styles.section} aria-label="Список сделанных заказов">
      {!!map.size &&
        mockOrders.orders.map((order) => {
          const cardIngredientsDetails: TCardIngredientsDetails = {};
          const previewIcons: string[] = [];
          let totalPrice = 0;

          order.ingredients.forEach((id) => {
            const { name, type, price, image } = map.get(id) as IIngredient;
            totalPrice += type === 'bun' ? price * 2 : price;

            if (cardIngredientsDetails[id]) {
              cardIngredientsDetails[id].number += 1;
            } else {
              cardIngredientsDetails[id] = {
                name,
                type,
                price,
                image,
                number: 1,
              };

              previewIcons.push(image);
            }
          });

          return (
            <CardOrder
              key={order._id}
              typeInfo="general"
              number={order.number}
              name={order.name}
              images={previewIcons}
              timestamp={order.createdAt}
              totalPrice={totalPrice}
            />
          );
        })}
    </section>
  );
};

export default Orders;
