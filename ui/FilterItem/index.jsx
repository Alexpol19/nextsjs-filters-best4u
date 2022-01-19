import React from 'react';
import styles from './FilterItem.module.css'
import Checkbox from '@material-ui/core/Checkbox';
import { FormControlLabel } from '@material-ui/core';

const FilterItem = React.memo(({ item, handleChange }) => (
  <div className={styles.filterItem}>
    <FormControlLabel
      key={item.title}
      control={
        <Checkbox
          checked={item.checked}
          onChange={() => handleChange(item.title)}
          name="checkedB"
          color="primary"
        />
      }
      label={item.title}
    />
  </div>
))

export default FilterItem