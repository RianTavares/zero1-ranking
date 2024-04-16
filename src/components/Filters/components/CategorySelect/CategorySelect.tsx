import React, { useEffect } from 'react';
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { useFilter } from '@/contexts/CategoryFilterContext';
import styles from './categorySelect.module.scss';

type OptionType = {
    value: string;
    label: string;
};

type CategorySelectProps = {
    options: OptionType[];
    initialValue: string;
};

export default function CategorySelect({ options, initialValue }: CategorySelectProps) {
    const { selectedCategory, setSelectedCategory } = useFilter();

    const handleChange = (event: SelectChangeEvent<string>) => {
        setSelectedCategory(event.target.value);
    };

    useEffect(() => {
        setSelectedCategory(initialValue);
      }, [initialValue, setSelectedCategory]);
    

    return (
        <div className={styles.select}>
            <FormControl fullWidth>
                <InputLabel id="group-select-label">Ranking por Grupos</InputLabel>
                <Select
                    labelId="group-select-label"
                    id="group-select"
                    value={selectedCategory}
                    label="Ranking por Grupos"
                    onChange={handleChange}
                    MenuProps={{ disableScrollLock: true }}
                >
                    {options.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}
