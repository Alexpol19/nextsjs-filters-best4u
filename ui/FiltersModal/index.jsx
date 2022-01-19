import React from 'react';
import styles from './FiltersModal.module.css'
import CloseButton from '../CloseButton';
import FilterItem from '../FilterItem';

const FiltersModal = React.memo(({ items, handleClose, handleChange }) => (
  <div className={styles.root}>
    <div className={styles.container}>
      <CloseButton handleClose={handleClose} />
      <div className={styles.filters}>
        {Object.values(items).length ? Object.values(items).map((item, i) =>
        (
          <FilterItem
            key={item.title}
            handleChange={() => handleChange(item.title)}
            item={item} />
        )
        ) : null}
      </div>
    </div>
  </div>
))

export default FiltersModal