
import {
  Card,
  Typography,

} from "@material-tailwind/react";

import { useNavigate } from "react-router";
import { useGetAllOrdersQuery } from "../../features/order/orderApi";
import { useSelector } from "react-redux";
import { useGetAllUsersQuery } from "../../features/auth/authApi";



const AdminProfile = () => {

  const TABLE_HEAD = ["OrderId", "Total Price", "Date", ""];
  const TABLE_HEAD1 = ["fullname", "Email", "shipping Address"];


  const { userInfo } = useSelector((store) => store.userInfo);

  const { isLoading, isError, data, error } = useGetAllOrdersQuery(userInfo.token);
  const { isLoading: load, isError: err, data: userData, error: msg } = useGetAllUsersQuery(userInfo.token);
  const nav = useNavigate();

  console.log(userData);


  if (isLoading || load) {
    return <div className='h-[400px] w-[400px] mx-auto mt-7'>
      <lottie-player src="https://lottie.host/01986b4b-7629-473a-8223-f06d23ec4120/LelU3WnIJp.json" background="#fff" speed="1" loop autoplay ></lottie-player>
    </div>
  }




  return (
    <div className=" px-2 gap-4 py-4 grid grid-cols-2 items-start">


      <Card className="h-full w-full table-auto shadow-2xl ">
        <table className="w-full   text-left">
          <thead>
            <tr>
              {TABLE_HEAD1.map((head) => (
                <th key={head} className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    {head}
                  </Typography>


                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {userData.map(({ fullname, email, shippingAddress, _id }, index) => {
              const isLast = index === data.length - 1;
              const classes = isLast ? "p-2" : "p-2 border-b border-blue-gray-50";

              return (
                <tr key={_id}>
                  <td className={classes}>
                    <Typography variant="small" color="blue-gray" className="font-normal">
                      {fullname}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography variant="small" color="blue-gray" className="font-normal">
                      {email}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography variant="small" color="blue-gray" className="font-normal">
                      {`${shippingAddress?.address} ${shippingAddress?.city}`}
                    </Typography>
                  </td>

                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>





      <Card className="h-full w-full table-auto shadow-2xl ">
        <table className="w-full   text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th key={head} className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map(({ _id, totalPrice, createdAt }, index) => {
              const isLast = index === data.length - 1;
              const classes = isLast ? "p-2" : "p-2 border-b border-blue-gray-50";

              return (
                <tr key={_id}>
                  <td className={classes}>
                    <Typography variant="small" color="blue-gray" className="font-normal">
                      {_id}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography variant="small" color="blue-gray" className="font-normal">
                      {totalPrice}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography variant="small" color="blue-gray" className="font-normal">
                      {createdAt.substring(0, 10)}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <button onClick={() => nav(`/user/order/${_id}`)}>  <Typography as="a" variant="small" color="blue" className="font-normal">
                      Detail..
                    </Typography>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>


    </div>
  )
}
export default AdminProfile