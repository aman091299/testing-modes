import React from 'react'

const ProductCard = ({product}) => {
    const {name}=product
  return (
    <div className="border p-2 w-[150px]">Product Name {name}</div>
  )
}

export default ProductCard