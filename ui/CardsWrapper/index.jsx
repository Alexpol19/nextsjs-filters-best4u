import React from 'react';
import styles from './CardsWrapper.module.css'
import Cards from "../Cards";
import Pagination from "@material-ui/lab/Pagination";

const CardsWrapper = React.memo(({ page, items, pageCount, totalItems, handlePaginationChange }) => (
  <div className={styles.cardsWrapper}>
    {items.length ? <Cards items={items} /> : null}
    {totalItems ? (
      <Pagination
        count={pageCount}
        variant='outlined'
        color='primary'
        className={styles.paginationWrapper}
        page={page}
        onChange={handlePaginationChange}
      />
    ) : null}
  </div>
))

export default CardsWrapper