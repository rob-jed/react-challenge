import React, { HTMLAttributes } from 'react';

import styles from './styles.module.scss';

const Button: React.FC<HTMLAttributes<HTMLButtonElement>> = ({
    children,
    ...props
}) => {
    return (
        <button className={styles.Button} type="button" {...props}>
            {children}
        </button>
    );
};

export default Button;
