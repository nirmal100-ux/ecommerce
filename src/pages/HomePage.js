import React from 'react'
import { useGetAllProductsQuery } from '../features/product/productApi'
import ProductCard from '../components/ProductCard';

const HomePage = () => {

  const { data, isLoading, isError, error } = useGetAllProductsQuery();

  if (isLoading) {
    return <div className='h-[400px] w-[400px] mx-auto mt-7'>
      <lottie-player src="https://lottie.host/01986b4b-7629-473a-8223-f06d23ec4120/LelU3WnIJp.json" background="#fff" speed="1" loop autoplay ></lottie-player>
    </div>
  }


  return (
    <div className='p-5 grid grid-cols-3 gap-2 items-start'>
      {data && data.map((product) => {
        return <ProductCard key={product._id} product={product} />
      })}

    </div>
  )
}

export default HomePage
