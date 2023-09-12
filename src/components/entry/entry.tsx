import { FC, ReactNode, FormEvent } from 'react';
import AppHeader from '../app-header/app-header';
import styles from './entry.module.scss';

interface IEntryProps {
  children: ReactNode;
  heading: string;
  links: ReactNode;
  onSubmit: (evt: FormEvent<HTMLFormElement>) => void;
}

const Entry: FC<IEntryProps> = ({ children, heading, links, onSubmit }) => (
  <>
    <AppHeader />
    <main>
      <div className={styles.wrapper}>
        <form className={styles.form} noValidate onSubmit={onSubmit}>
          <h1 className={styles.heading}>{heading}</h1>
          {children}
        </form>
        <div className={styles.links}>{links}</div>
      </div>
    </main>
  </>
);

export default Entry;
