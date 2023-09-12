import styles from './preloader.module.scss';

const Preloader = () => (
  <div className={styles.section}>
    <div className={styles.wrapper}>
      <div className={styles.preloader} />
      <span className={styles.loading}>Подождите</span>
    </div>
  </div>
);

export default Preloader;
