// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { useEffect, useState } from "react"
import useSWR from "swr"
import { data as cardsData } from "../../data/cardData"

export default function handler(req, res) {
  res.status(200).json({cardsData: cardsData})
}

const fetcher = (...args) => fetch(...args).then(res => res.json())

export function useCards () {
  const { data, error } = useSWR(`/api/cards/`, fetcher)

  const [moreItems, setMoreItems] = useState([])

  useEffect(() => {
    const items = []
    if(data && data.cardsData && data.cardsData.length) {
      for(const index of [0,1,2,3,4,5,6]) {
        for(const item of data.cardsData) {
          items.push({...item, key: index})
        }
      }
    }
    setMoreItems(items)
  }, [data])

  return {
    cardsData: moreItems,
    isLoading: !error && !data,
    isError: error
  }
}