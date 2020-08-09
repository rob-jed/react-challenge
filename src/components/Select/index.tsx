import React from 'react';
import ReactSelect from 'react-windowed-select';
import { Props, ValueType } from 'react-select';

import styles from './styles.module.scss';

export type SelectOption = { label: string; value: string };

type SelectProps = Props & {
    className?: string;
    label?: string;
    name: string;
    onSelect: (selectedOption: ValueType<SelectOption>, name: string) => void;
};

const Select: React.FC<SelectProps> = ({
    className,
    label,
    name,
    onSelect,
    ...reactSelectProps
}) => {
    const patchedOnChange = (selectedOption: ValueType<SelectOption>) => {
        onSelect(selectedOption, name!);
    };

    return (
        <div className={className}>
            {label && <h4 className={styles.SelectLabel}>{label}</h4>}
            <ReactSelect onChange={patchedOnChange} {...reactSelectProps} />
        </div>
    );
};

export default Select;
