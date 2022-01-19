import Filters from "../Filters";
import CardsContainer from "../../components/CardsContainer";
import React from "react";

const HomeContent = React.memo(({
  updateFilters,
  categoryFilters,
  colorFilters,
  minPrice,
  maxPrice,
  priceRangeValues,
  setPriceRangeValues,
  filteredItems
}) => (
  <>
    <Filters
      updateFilters={updateFilters}
      categoryFilters={categoryFilters}
      colorFilters={colorFilters}
      minPrice={minPrice}
      maxPrice={maxPrice}
      priceRangeValues={priceRangeValues}
      setPriceRangeValues={setPriceRangeValues}
    />
    <CardsContainer
      cards={filteredItems} />
  </>
))

export default HomeContent