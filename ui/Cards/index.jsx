import React from "react";
import Card from "../Card";
import styles from './Cards.module.css'

const Cards = React.memo(({ items }) => (
  <div className={styles.cards}>
    {items.map(item => <Card item={item} key={`${item.node.name}-${item.key}`} />)}
  </div>
))

export default Cards