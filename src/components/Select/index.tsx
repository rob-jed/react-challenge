import React from 'react';
import ReactSelect from 'react-windowed-select';
import { Props, ValueType } from 'react-select';

export type SelectOption = { label: string; value: string | number };

type SelectProps = Props & {
    label?: string;
    name: string;
    handleSelect: (
        selectedOption: ValueType<SelectOption>,
        name: string
    ) => void;
};

const Select: React.FC<SelectProps> = ({
    label,
    name,
    handleSelect,
    ...reactSelectProps
}) => {
    const patchedOnChange = (selectedOption: ValueType<SelectOption>) => {
        handleSelect(selectedOption, name!);
    };

    return (
        <div>
            {label && <h4>{label}</h4>}
            <ReactSelect onChange={patchedOnChange} {...reactSelectProps} />
        </div>
    );
};

export default Select;
