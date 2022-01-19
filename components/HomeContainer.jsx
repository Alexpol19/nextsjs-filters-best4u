import { useEffect, useState } from "react";
import HomeContent from "../ui/HomeContent";

const HomeContainer = ({ cardsData }) => {
  const [categoryFilters, setCategoryFilters] = useState({})
  const [colorFilters, setcolorFilters] = useState({})
  const [minPrice, setMinPrice] = useState(null)
  const [maxPrice, setMaxPrice] = useState(null)
  const [priceRangeValues, setPriceRangeValues] = useState([0, 1]);

  const [filteredItems, setFilteredItems] = useState([])

  const updateFilters = (checkboxKey, filterKey) => {
    if (filterKey === 'category') {
      if (checkboxKey === 'All') {
        const checkedAll = categoryFilters[checkboxKey].checked
        setCategoryFilters(Object.values(categoryFilters).map(item => ({
          title: item.title,
          checked: !checkedAll
        })).reduce((a, v) => {
          if (a.title === 'All') {
            return ({ [a.title]: a, [v.title]: v })
          } else {
            return ({ ...a, [v.title]: v })
          }
        }))
      } else {
        setCategoryFilters({
          ...categoryFilters, ['All']: { title: 'All', checked: false }, [checkboxKey]: {
            title: categoryFilters[checkboxKey].title,
            checked: !categoryFilters[checkboxKey].checked,
          }
        })
      }
    } else {
      setcolorFilters({
        ...colorFilters, [checkboxKey]: {
          title: colorFilters[checkboxKey].title,
          checked: !colorFilters[checkboxKey].checked,
        }
      })
    }
  }

  useEffect(() => {
    if (cardsData.length) {
      let catSet = new Set();
      let colorSet = new Set();
      let priceSet = new Set();
      for (const card of cardsData) {
        if (card && card.node && card.node.categoryTags && card.node.categoryTags.length) {
          for (const category of card.node.categoryTags) {
            catSet.add(category)
          }
        }

        if (card && card.node && card.node.colorFamily && card.node.colorFamily.length) {
          for (const color of card.node.colorFamily) {
            if (color.name) {
              colorSet.add(color.name)
            }
          }
        }

        if (card && card.node && card.node.shopifyProductEu &&
          card.node.shopifyProductEu.variants && card.node.shopifyProductEu.variants.edges &&
          card.node.shopifyProductEu.variants.edges.length) {
          for (const priceItem of card.node.shopifyProductEu.variants.edges) {
            if (priceItem.node && priceItem.node.price) {
              priceSet.add(priceItem.node.price)
            }
          }
        }
      }

      setCategoryFilters([{
        title: 'All',
        checked: false
      }, ...Array.from(catSet).map((item) => ({
        title: item,
        checked: false
      }))])

      setCategoryFilters(['All', ...Array.from(catSet)].reduce((a, v) => ({
        ...a, [v]: {
          title: v,
          checked: false
        }
      }), {}))
      setcolorFilters(Array.from(colorSet).reduce((a, v) => ({
        ...a, [v]: {
          title: v,
          checked: false
        }
      }), {}))
      const prices = Array.from(priceSet).map(Number)
      const min = Math.min(...prices)
      const max = Math.max(...prices)

      setMinPrice(min)
      setMaxPrice(max)
      setPriceRangeValues([min, max])
    }
  }, [cardsData])

  useEffect(() => {
    if (cardsData.length) {

      let filteredByCategory = []

      if (categoryFilters['All'].checked || !Object.values(categoryFilters).find(item => item.checked)) { // if all selected, or not selected
        filteredByCategory = cardsData
      } else {
        filteredByCategory = cardsData.filter(item => {
          let matches = 0

          if (item.node.categoryTags !== null && item.node.categoryTags.length) {
            for (const category of item.node.categoryTags) {
              if (categoryFilters[category] && categoryFilters[category].checked) {
                matches++
                break;
              }
            }
          }
          if (matches > 0) return true

          return false
        })
      }

      let filteredByColorAndCategory = []

      if (!Object.values(colorFilters).find(item => item.checked) || Object.values(colorFilters).every(item => item.checked)) {
        filteredByColorAndCategory = filteredByCategory
      } else {
        filteredByColorAndCategory = filteredByCategory.filter(item => {
          let matches = 0

          if (item.node.colorFamily !== null && item.node.colorFamily.length) {
            for (const color of item.node.colorFamily) {
              if (colorFilters[color.name] && colorFilters[color.name].checked) {
                matches++
                break;
              }
            }
          }

          if (matches > 0) return true

          return false
        })
      }

      if (minPrice === priceRangeValues[0] && maxPrice === priceRangeValues[1]) {
        setFilteredItems(filteredByColorAndCategory)
      } else {
        setFilteredItems(filteredByColorAndCategory.filter(item => {
          let matches = 0

          if (item.node.shopifyProductEu.variants.edges.length) {
            for (const price of item.node.shopifyProductEu.variants.edges) {
              if ((priceRangeValues[0] <= price.node.price) && (priceRangeValues[1] >= price.node.price)) {
                matches++
              }
            }
          }

          if (matches > 0) return true

          return false
        }))
      }

    }
  }, [categoryFilters, colorFilters, priceRangeValues])

  return (
    <HomeContent
      updateFilters={updateFilters}
      categoryFilters={categoryFilters}
      colorFilters={colorFilters}
      minPrice={minPrice}
      maxPrice={maxPrice}
      priceRangeValues={priceRangeValues}
      setPriceRangeValues={setPriceRangeValues}
      filteredItems={filteredItems}
    />
  )
}

export default HomeContainer