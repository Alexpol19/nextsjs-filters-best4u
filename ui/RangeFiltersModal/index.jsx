import CloseButton from '../CloseButton';
import styles from './RangeFiltersModal.module.css'
import RangeSlider from '../RangeSlider';
import React from 'react';

const RangeFiltersModal = React.memo(({ min, max, handleClose, values, setValues }) => (
  <div className={styles.root}>
    <div className={styles.container}>
      <CloseButton handleClose={handleClose} />
      <div className={styles.content}>
        <RangeSlider
          min={min}
          max={max}
          values={values}
          setValues={setValues} />
      </div>
    </div>
  </div>
))

export default RangeFiltersModal