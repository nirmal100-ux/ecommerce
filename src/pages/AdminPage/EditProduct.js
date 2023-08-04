import React from 'react'
import { useParams } from 'react-router'
import { useGetProductByIdQuery } from '../../features/product/productApi';
import EditForm from './EditForm';

const EditProduct = () => {
  const { id } = useParams();

  const { data, isLoading, isError, error } = useGetProductByIdQuery(id);

  if (isLoading) {
    return <div className='h-[400px] w-[400px] mx-auto mt-7'>
      <lottie-player src="https://lottie.host/01986b4b-7629-473a-8223-f06d23ec4120/LelU3WnIJp.json" background="#fff" speed="1" loop autoplay ></lottie-player>
    </div>
  }

  return (
    <>
      <EditForm product={data} />

    </>
  )
}

export default EditProduct