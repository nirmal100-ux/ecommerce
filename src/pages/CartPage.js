import { Card, Typography } from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { baseUrl } from "../features/constant";
import { useFormik } from "formik";
import { addToCart, removeFromCart } from "../features/userInfo";
import { useNavigate } from "react-router";

const CartPage = () => {


  const { carts } = useSelector((store) => store.userInfo);
  const { userInfo } = useSelector((store) => store.userInfo);
  const nav = useNavigate();
  // const numbers = [22, 44, 55, 66];
  // console.log(numbers.reduce((a, b) => {
  //   return a + b;
  // }))

  const total = carts.reduce((a, b) => {
    return a + b.qty * b.price
  }, 0);

  const dispatch = useDispatch();



  return (
    <div className="p-4">
      <h1 className="text-2xl mb-7 font-bold">Your Carts Items</h1>


      <div className="grid grid-cols-3 gap-5 items-start ">



        <div className="col-span-2">


          {carts.map((cart, i) => {

            return <div key={i} className="grid grid-cols-3 gap-5  mb-5 max-w-xl">
              <img className="w-full h-full" src={`${baseUrl}${cart.image}`} alt="" />

              <div className="info flex flex-col justify-between">
                <h1>{cart.name}</h1>
                <p>Rs.{cart.price}</p>

                <Typography variant="small" color="blue-gray" className="font-normal">
                  <select
                    value={cart.qty}
                    onChange={(e) => {
                      dispatch(
                        addToCart({
                          name: cart.name,
                          qty: e.target.value,
                          image: cart.image,
                          price: cart.price,
                          product: cart.product,
                          countInStock: cart.countInStock
                        })

                      );
                    }


                    } className="p-2" name="" id="">

                    {[...Array(cart.countInStock).keys()].map((v, i) => {
                      return <option key={i} value={v + 1}>{v + 1}</option>
                    })}
                  </select>
                </Typography>
                {/* <p>{cart.qty}</p> */}

              </div>
              <div className="totals flex flex-col justify-between items-end">

                <button onClick={() => dispatch(removeFromCart(i))}> <i className="fa-solid fa-xmark"></i> </button>


                <p>Total: {cart.qty * cart.price}</p>
              </div>
            </div>
          })}





        </div>




        <Card className="h-full w-full overflow-scroll">
          <table className="w-full min-w-max table-auto text-left">

            <tbody>


              <tr className="text-center">
                <td className="p-4 border-b border-blue-gray-50">
                  <Typography variant="small" color="blue-gray" className="font-normal">
                    SubTotal
                  </Typography>
                </td>
                <td className="p-4 border-b border-blue-gray-50 bg-blue-gray-50/50">
                  <Typography variant="small" color="blue-gray" className="font-normal">
                    {carts.length}
                  </Typography>
                </td>



              </tr>

              <tr className="text-center">
                <td className="p-4 border-b border-blue-gray-50">
                  <Typography variant="small" color="blue-gray" className="font-normal">
                    Total Price
                  </Typography>
                </td>
                <td className="p-4 border-b border-blue-gray-50 bg-blue-gray-50/50">
                  <Typography variant="small" color="blue-gray" className="font-normal">
                    Rs.{total}
                  </Typography>
                </td>



              </tr>
              <tr className="text-center">
                <td className="p-4 border-b border-blue-gray-50">
                  <Typography variant="small" color="blue-gray" className="font-normal">
                    Status
                  </Typography>
                </td>
                <td className="p-4 border-b border-blue-gray-50 bg-blue-gray-50/50">
                  <Typography variant="small" color="blue-gray" className="font-normal">
                    Cash On Delivery
                  </Typography>
                </td>



              </tr>



              <tr className="text-center ">
                <td colSpan={2}>
                  <button onClick={() => {
                    if (userInfo.shippingAddress.isEmpty) {
                      nav('/user/shipping');
                    } else {
                      nav('/user/checkout');

                    }

                  }} className=' w-[60%] bg-black my-5 text-white mx-auto py-1 rounded-sm '>Proceed To CheckOut</button>

                </td>
              </tr>
            </tbody>






          </table>
        </Card>





      </div>




    </div>
  )
}
export default CartPage