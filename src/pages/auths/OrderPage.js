import { useDispatch, useSelector } from "react-redux";
import { useAddOrderMutation } from "../../features/order/orderApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { replace } from "formik";
import { Button } from "@material-tailwind/react";
import { clearCart } from "../../features/userInfo";

const OrderPage = () => {

  const { userInfo, carts } = useSelector((store) => store.userInfo);
  const totals = carts.reduce((a, b) => {
    return a + b.qty * b.price
  }, 0);

  const dispatch = useDispatch();
  const [addOrder, { isLoading, isError, error }] = useAddOrderMutation();

  const nav = useNavigate();


  const orderAdd = async (total, orderItems) => {
    try {

      const response = await addOrder({
        body: {
          totalPrice: totals,
          orderItems: carts
        },
        token: userInfo.token
      }).unwrap();
      dispatch(clearCart());

      toast.success('succesfully added');
      nav(0);
    } catch (err) {
      console.log(err);
      toast.error(err.data);
    }
  }

  return (
    <div className="p-10 space-y-10">
      <h1>Delivery Address</h1>

      <p className="text-gray-700">{userInfo.shippingAddress.address}, {userInfo.shippingAddress.city}</p>

      <p>Total Amount is {totals}</p>




      {isLoading ? <Button type='submit' className="mt-6 max-w-lg" fullWidth>
        <div className='h-7 w-7 border-2 border-t-blue-gray-900 rounded-full animate-spin mx-auto '></div>
      </Button> : <Button onClick={() => orderAdd(totals, carts)} className="mt-6 max-w-lg" >
        CheckOut
      </Button>
      }
    </div>
  )
}
export default OrderPage