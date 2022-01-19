import { useEffect, useState } from "react";
import { itemsPerPage } from "../constants/cards";
import CardsWrapper from "../ui/CardsWrapper";

const CardsContainer = ({ cards }) => {
  const [currentItems, setCurrentItems] = useState([]);

  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(1);

  const handlePaginationChange = (e, value) => {
    setPage(value);
  }

  useEffect(() => {
    setPage(1)
    setPageCount(Math.ceil(cards.length / itemsPerPage));
  }, [cards])

  useEffect(() => {
    const offset = (page - 1) * itemsPerPage;
    const items = cards.slice(offset, offset + itemsPerPage);
    setCurrentItems(items)
  }, [page, pageCount])

  return (
    <CardsWrapper
      items={currentItems}
      page={page}
      pageCount={pageCount}
      totalItems={cards.length}
      handlePaginationChange={handlePaginationChange}
    />
  )
}

export default CardsContainer