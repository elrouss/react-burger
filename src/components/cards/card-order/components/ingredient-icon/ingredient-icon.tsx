import classNames from 'classnames';
import styles from './ingredient-icon.module.scss';

interface IIngredientIconProps {
  image: string;
  position?: number;
  imagesMore?: number;
}

const IngredientIcon = ({
  image,
  position,
  imagesMore,
}: IIngredientIconProps) => {
  if (typeof position !== 'undefined') {
    return (
      <div
        className={styles.wrapper}
        style={{ left: `${-16 * position}px`, zIndex: 10 - position }}
      >
        <img
          className={classNames(styles.image, { [styles.limit]: !!imagesMore })}
          src={image}
          alt="Превью ингредиента"
        />
        {!!imagesMore && (
          <span className={styles.additional}>{`+${imagesMore}`}</span>
        )}
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <img
        className={classNames(styles.image)}
        src={image}
        alt="Превью ингредиента"
      />
    </div>
  );
};

export default IngredientIcon;
