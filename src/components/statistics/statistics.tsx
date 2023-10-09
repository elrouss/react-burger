import { useAppSelector } from 'services/app/hooks';
import { getLiveOrderFeedData } from 'services/features/live-order-feed/selectors';
import Status from './components/status/status';
import Report from './components/report/report';
import styles from './statistics.module.scss';

const maxOrdersNum = 30; // in template there can be maximum 3 columns (with 10 nums in each)

const Statistics = () => {
  const ordersDone: number[] = [];
  const ordersInProgress: number[] = [];

  const liveFeedOrdersData = useAppSelector(getLiveOrderFeedData);

  if (!liveFeedOrdersData) return null;

  liveFeedOrdersData.orders
    .slice(0, maxOrdersNum)
    .forEach(({ status, number }) =>
      status === 'done'
        ? ordersDone.push(number)
        : ordersInProgress.push(number)
    );

  return (
    <section className={styles.section} aria-label="Статистика заказов">
      <div className={styles.statuses}>
        <Status
          heading={<h2 className="text text_type_main-medium">Готовы:</h2>}
          orders={ordersDone}
          listColor="green"
        />
        <Status
          heading={<h2 className="text text_type_main-medium">В работе:</h2>}
          orders={ordersInProgress}
          listColor="white"
        />
      </div>
      <Report
        heading={
          <h2 className="text text_type_main-medium">
            Выполнено за все время:
          </h2>
        }
        counter={liveFeedOrdersData.total}
      />
      <Report
        heading={
          <h2 className="text text_type_main-medium">Выполнено за сегодня:</h2>
        }
        counter={liveFeedOrdersData.totalToday}
      />
    </section>
  );
};

export default Statistics;
