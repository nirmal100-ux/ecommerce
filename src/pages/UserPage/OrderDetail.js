import { useSelector } from "react-redux";
import { useOrderByIdQuery } from "../../features/order/orderApi"
import { useParams } from "react-router";
import { baseUrl } from "../../features/constant";

const OrderDetail = () => {
  const { userInfo } = useSelector((store) => store.userInfo);
  const { id } = useParams();

  const { isLoading, isError, data, error } = useOrderByIdQuery({
    id,
    token: userInfo.token
  });

  console.log(data);

  if (isLoading) {
    return <div className='h-[400px] w-[400px] mx-auto mt-7'>
      <lottie-player src="https://lottie.host/01986b4b-7629-473a-8223-f06d23ec4120/LelU3WnIJp.json" background="#fff" speed="1" loop autoplay ></lottie-player>
    </div>
  }


  return (
    <div className="p-5">

      {data.orderItems.map((order) => {
        return <div key={order._id} className="grid grid-cols-2 space-y-4">

          <div className="grid grid-cols-2 gap-4 space-y-3 ">
            <div>
              <img src={`${baseUrl}${order.image}`} alt="" />
            </div>

            <div className="flex flex-col justify-between">
              <h1>{order.name}</h1>
              <p>Rs.{order.price}</p>
              <p>{order.qty}</p>
            </div>


          </div>

          <div className="justify-self-center">
            <h1 className="text-2xl font-bold mb-2">Delivery Address</h1>
            <p>{userInfo.shippingAddress.address}</p>
            <p>{userInfo.shippingAddress.city}</p>
          </div>

        </div>
      })}



      <div className="bg-black text-white flex justify-between py-2 px-5 mt-10">
        <h1 className="text-xl">Total:-</h1>
        <h1>Rs. {data.totalPrice}</h1>

      </div>

    </div>
  )
}
export default OrderDetail