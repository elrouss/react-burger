import React from 'react';
import styles from './report.module.scss';

interface IReportProps {
  heading: React.ReactElement<
    React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLHeadingElement>,
      HTMLHeadingElement
    >
  >;
  counter: number;
}

const Report = ({ heading, counter }: IReportProps) => (
  <div>
    {heading}
    <span className={`text text_type_digits-large ${styles.counter}`}>
      {counter}
    </span>
  </div>
);

export default Report;
