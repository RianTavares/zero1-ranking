import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import styles from './categorySelect.module.scss';

export default function CategorySelect() {
    const group = null;
    const handleChange = () => {console.log('none')}
    
    return (
        <div className={styles.select}>
            <FormControl>
                <InputLabel id="group-select">Ranking por Grupos</InputLabel>
                <Select
                labelId="group-select"
                id="demo-simple-select"
                value={group}
                label="Ranking por Grupos"
                onChange={handleChange}
                inputProps={{MenuProps: {disableScrollLock: true}}}
                >
                <MenuItem value={'Grupo das 18'}>Grupo das 18:00 Horas</MenuItem>
                <MenuItem value={'Grupo das 19'}>Grupo das 19:00 Horas</MenuItem>
                <MenuItem value={'Grupo das 20'}>Grupo das 20:00 Horas</MenuItem>
                <MenuItem value={'Grupo das 21'}>Grupo das 21:00 Horas</MenuItem>
                </Select>
            </FormControl>
        </div>  
    )
}