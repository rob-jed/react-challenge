import React from 'react';
import { createFilter, OptionsType, ValueType } from 'react-select';

import Button from 'components/Button';
import Select, { SelectOption } from 'components/Select';

import styles from './styles.module.scss';

type FiltersProps = {
    campaignsOptions: OptionsType<SelectOption>;
    datasourcesOptions: OptionsType<SelectOption>;
    onSelect: (selectedOption: ValueType<SelectOption>, name: string) => void;
    onSubmit: () => void;
};

const Filters: React.FC<FiltersProps> = ({
    campaignsOptions,
    datasourcesOptions,
    onSelect,
    onSubmit,
}) => {
    return (
        <div className={styles.FiltersWrapper}>
            <h2 className={styles.FiltersTitle}>Filter dimension values</h2>

            <div className={styles.SelectWrapper}>
                <Select
                    className={styles.SingleFilter}
                    filterOption={createFilter({ ignoreAccents: false })}
                    isMulti
                    label="Campaign"
                    name="campaigns"
                    onSelect={onSelect}
                    options={campaignsOptions}
                />

                <Select
                    className={styles.SingleFilter}
                    filterOption={createFilter({ ignoreAccents: false })}
                    isMulti
                    label="Datasource"
                    name="datasources"
                    onSelect={onSelect}
                    options={datasourcesOptions}
                />

                <Button onClick={onSubmit}>Apply</Button>
            </div>
        </div>
    );
};

export default Filters;
