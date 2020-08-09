import React from 'react';

import styles from './styles.module.scss';

type SpinnerProps = {
    message?: string;
};

const Spinner: React.FC<SpinnerProps> = ({ message }) => (
    <div className={styles.SpinnerWrapper}>
        <div className={styles.Spinner} />

        {message && message}
    </div>
);

export default Spinner;
