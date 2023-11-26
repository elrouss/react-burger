import { useRef, useState, RefObject } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { IIngredientsTable } from 'services/features/ingredients/types';
import BurgerIngredientsSection from './burger-ingredients-section/burger-ingredients-section';
import styles from './burger-ingredients.module.scss';

interface ITable extends IIngredientsTable {
  value: string;
}

const BurgerIngredients = () => {
  const [currentTab, setCurrentTab] = useState('one');

  const tabsRef = useRef<HTMLDivElement>(null);
  const bunsRef = useRef<HTMLDivElement>(null);
  const saucesRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);

  const table: ITable[] = [
    { typeRus: 'Булки', typeEng: 'bun', value: 'one', ref: bunsRef },
    { typeRus: 'Соусы', typeEng: 'sauce', value: 'two', ref: saucesRef },
    { typeRus: 'Начинки', typeEng: 'main', value: 'three', ref: mainRef },
  ];

  const scrollTabIntoView = (ref: RefObject<HTMLDivElement>) => {
    ref.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
    });
  };

  const handleTabsScroll = () => {
    const DESIRED_SPACE_DIFFERENCE_START = 112;

    const TABS_BOTTOM_EDGE_VALUE =
      tabsRef.current?.getBoundingClientRect().bottom;
    const BUNS_TOP_EDGE_VALUE = bunsRef.current?.getBoundingClientRect().top;
    const SAUCES_TOP_EDGE_VALUE =
      saucesRef.current?.getBoundingClientRect().top;
    const MAIN_TOP_EDGE_VALUE = mainRef.current?.getBoundingClientRect().top;

    const [buns, sauces, main] = table;

    const setTabValue = (sectionValue: number, selectedTab: string) => {
      if (
        TABS_BOTTOM_EDGE_VALUE &&
        sectionValue - TABS_BOTTOM_EDGE_VALUE <= DESIRED_SPACE_DIFFERENCE_START
      ) {
        setCurrentTab(selectedTab);
      }
    };

    if (BUNS_TOP_EDGE_VALUE) setTabValue(BUNS_TOP_EDGE_VALUE, buns.value);
    if (SAUCES_TOP_EDGE_VALUE) setTabValue(SAUCES_TOP_EDGE_VALUE, sauces.value);
    if (MAIN_TOP_EDGE_VALUE) setTabValue(MAIN_TOP_EDGE_VALUE, main.value);
  };

  return (
    <section aria-label="Ингредиенты бургера">
      <div className={styles.wrapper}>
        <div className={styles.tabs} ref={tabsRef}>
          {table.map(({ typeRus, typeEng, value, ref }) => (
            <Tab
              key={`tab-${typeEng}`}
              active={currentTab === value}
              value={value}
              onClick={() => scrollTabIntoView(ref)}
            >
              {typeRus}
            </Tab>
          ))}
        </div>
        <div
          className={`custom-scroll ${styles.ingredients}`}
          onScroll={handleTabsScroll}
        >
          {table.map(({ typeRus, typeEng, ref }) => (
            <BurgerIngredientsSection
              key={typeEng}
              ref={ref}
              typeRus={typeRus}
              typeEng={typeEng}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BurgerIngredients;
