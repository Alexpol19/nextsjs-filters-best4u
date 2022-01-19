import React from 'react'
import styles from './Card.module.css'

const Card = React.memo(({ item }) => (
  <div className={styles.wrapper}>
    <div className={styles.card}>
      <img
        src={item.node.thumbnailImage.file.url}
        alt='product'
        className={styles.image}
      />
      <div className={styles.info}>
        <h5>{item.node.name}</h5>
        <p>€{item.node.shopifyProductEu.variants.edges[0].node.price}</p>
      </div>
    </div>
  </div>
))

export default Card