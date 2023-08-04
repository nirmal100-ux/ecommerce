import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { PencilIcon, UserPlusIcon, TrashIcon } from "@heroicons/react/24/solid";
import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Tabs,
  TabsHeader,
  Tab,
  Avatar,
  IconButton,
  Tooltip,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { useGetAllProductsQuery, useRemoveProductMutation } from "../../features/product/productApi";
import { baseUrl } from "../../features/constant";
import { Fragment, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const TABLE_HEAD = ["Products", "Price", "Created At", "Edit", "Delete"];




const ProductList = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(!open);
  const nav = useNavigate();
  const { userInfo } = useSelector((store) => store.userInfo);

  const { data, isLoading, isError, error } = useGetAllProductsQuery();

  const [removeProduct, { isLoading: load, isError: isErr, error: err }] = useRemoveProductMutation();


  const handleRemove = async (query) => {
    try {
      const response = await removeProduct(query).unwrap();
    } catch (err) {
      toast.error(err);
    }
  }

  if (isLoading) {
    return <div className='h-[400px] w-[400px] mx-auto mt-7'>
      <lottie-player src="https://lottie.host/01986b4b-7629-473a-8223-f06d23ec4120/LelU3WnIJp.json" background="#fff" speed="1" loop autoplay ></lottie-player>
    </div>
  }


  return (
    <Card className="h-full w-full">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-5 flex items-center justify-between gap-8">
          <div>
            <Typography variant="h5" color="blue-gray">
              Product List
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              See information about all products
            </Typography>
          </div>
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row">

            <Button onClick={() => nav('/product/add')} className="flex items-center gap-3" color="blue" size="sm">
              <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Add Product
            </Button>
          </div>
        </div>

      </CardHeader>
      <CardBody className="overflow-scroll px-0">
        <table className="mt-4 w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th key={head} className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
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
            {data && data.map(({ product_image, product_name, createdAt, _id, product_price }, index) => {
              const isLast = index === data.length - 1;
              const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

              return <tr key={_id} >
                <td className={classes}>
                  <div className="flex items-center gap-3">
                    <Avatar src={`${baseUrl}${product_image}`} size="sm" />
                    <div className="flex flex-col">
                      <Typography variant="small" color="blue-gray" className="font-normal">
                        {product_name}
                      </Typography>

                    </div>
                  </div>
                </td>
                <td className={classes}>
                  <div className="flex flex-col">
                    <Typography variant="small" color="blue-gray" className="font-normal">
                      Rs.{product_price}
                    </Typography>
                  </div>
                </td>

                <td className={classes}>
                  <Typography variant="small" color="blue-gray" className="font-normal">
                    {createdAt}
                  </Typography>
                </td>


                <td className={classes}>
                  <Tooltip content="Edit Product">
                    <IconButton onClick={() => nav(`/product/${_id}`)} variant="text" color="blue-gray">
                      <PencilIcon className="h-4 w-4" />
                    </IconButton>
                  </Tooltip>
                </td>

                <td className={classes}>



                  <Tooltip content="Remove Product">
                    <IconButton onClick={handleOpen} variant="text" color="red">
                      <TrashIcon className="h-4 w-4" />
                    </IconButton>
                  </Tooltip>

                  <Dialog open={open} handler={handleOpen}>
                    <DialogHeader>Its a simple dialog.</DialogHeader>
                    <DialogBody divider>
                      The key to more success is to have a lot of pillows. Put it this way, it took me
                      twenty five years to get these plants, twenty five years of blood sweat and tears, and
                      I&apos;m never giving up, I&apos;m just getting started. I&apos;m up to something. Fan
                      luv.
                    </DialogBody>
                    <DialogFooter>
                      <Button
                        variant="text"
                        color="red"
                        onClick={handleOpen}
                        className="mr-1"
                      >
                        <span>Cancel</span>
                      </Button>
                      <Button variant="gradient" color="green" onClick={() => {
                        handleOpen();

                        handleRemove({
                          id: _id,
                          token: userInfo.token
                        });




                      }}>
                        <span>Confirm</span>
                      </Button>
                    </DialogFooter>
                  </Dialog>





                </td>




              </tr>

            })}
          </tbody>
        </table>
      </CardBody>
    </Card>
  )
}




export default ProductList