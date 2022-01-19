import { useState } from 'react'
import styles from './Filters.module.css'
import FilterModalContainer from '../FilterModalContainer'
import FiltersModal from '../FiltersModal'
import RangeFiltersModal from '../RangeFiltersModal'

const initialModals = {
  category: false,
  color: false,
  price: false
}

const Filters = ({ updateFilters, categoryFilters, colorFilters, minPrice, maxPrice, priceRangeValues, setPriceRangeValues }) => {
  const [filterModalsOpen, setFilterModalsOpen] = useState(initialModals)

  const changeFiltersModalOpen = (modal, open) => {
    setFilterModalsOpen({
      category: false,
      color: false,
      price: false,
      [modal]: open
    })
  }

  const closeModal = () => {
    setFilterModalsOpen(initialModals)
  }
  return (
    <div className={styles.filters}>
      <div className={styles.filtersContent}>
        <FilterModalContainer
          filterName="Category"
          open={filterModalsOpen.category}
          setOpen={(value) => changeFiltersModalOpen('category', value)}>
          <FiltersModal
            items={categoryFilters}
            handleChange={(key) => updateFilters(key, 'category')}
            handleClose={closeModal}
          />
        </FilterModalContainer>
        <FilterModalContainer
          filterName="Color"
          open={filterModalsOpen.color}
          setOpen={(value) => changeFiltersModalOpen('color', value)}>
          <FiltersModal
            items={colorFilters}
            handleChange={(key) => updateFilters(key, 'color')}
            handleClose={closeModal}
          />
        </FilterModalContainer>
        <FilterModalContainer
          filterName="Price"
          open={filterModalsOpen.price}
          setOpen={(value) => changeFiltersModalOpen('price', value)}>
          <RangeFiltersModal
            min={minPrice}
            max={maxPrice}
            values={priceRangeValues}
            setValues={setPriceRangeValues}
            handleClose={closeModal}
          />
        </FilterModalContainer>
      </div>
    </div>
  )
}

export default Filters