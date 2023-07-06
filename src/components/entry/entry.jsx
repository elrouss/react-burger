import PropTypes from 'prop-types';
import AppHeader from '../app-header/app-header';
import styles from './entry.module.scss';

function Entry({ children, heading, links, onSubmit }) {
  return (
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
}

Entry.propTypes = {
  children: PropTypes.node.isRequired,
  heading: PropTypes.string.isRequired,
  links: PropTypes.node.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default Entry;
