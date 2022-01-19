import React from 'react'
import styles from './FilterModalContainer.module.css'

const FilterModalContainer = React.memo(({ filterName, open, setOpen, children }) => (
  <div
    className={styles.filter}
  >
    <p
      className={styles.title}
      onClick={() => setOpen(!open)}>
      {filterName}
    </p>
    {open ? children : null}
  </div>
))

export default FilterModalContainer