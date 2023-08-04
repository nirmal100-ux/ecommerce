import { Textarea } from "@material-tailwind/react";

import {
  Button, Rating, Typography,
  CardHeader,
  CardBody,
  Card,
  Avatar,
} from "@material-tailwind/react";
import { useFormik } from "formik";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import * as Yup from 'yup';
import { useReviewProductMutation } from "../features/product/productApi";
import { useNavigate } from "react-router";

const Review = ({ product }) => {

  const { userInfo } = useSelector((store) => store.userInfo);


  const reviewSchema = Yup.object().shape({
    comment: Yup.string().required('Required'),
    rating: Yup.string().required('Required')
  });

  const nav = useNavigate();



  const [reviewAdd, { isLoading, isError, error, isSuccess }] = useReviewProductMutation();


  const formik = useFormik({
    initialValues: {
      comment: '',
      rating: 0

    },
    onSubmit: async (val, { resetForm }) => {
      if (userInfo === null) {
        nav('/user/login')
      } else {
        try {
          const response = await reviewAdd({
            body: {
              username: userInfo.fullname,
              comment: val.comment,
              rating: val.rating,
              user: userInfo.id
            },
            id: product._id,
            token: userInfo.token
          }).unwrap();
          resetForm();

          toast.success('successfully added');

        } catch (err) {
          console.log(val.rating);
          // formik.setFieldValue('rating', 0);
          // resetForm();
          toast.error(err.data.message);
        }
      }



    },
    validationSchema: reviewSchema
  });





  return (
    <div className="p-5 ">
      <h1 className="text-xl font-semibold tracking-wider mb-2">Add Reviews</h1>
      <form onSubmit={formik.handleSubmit} className="space-y-4 ">
        <div className="w-96">
          <Textarea

            name="comment"
            label="Comment"
            value={formik.values.comment}
            onChange={formik.handleChange}
          />
          {formik.errors.comment && formik.touched.comment && <h1 className='text-pink-700'>{formik.errors.comment}</h1>}

        </div>
        <div className="flex items-center gap-2">
          <Typography>
            Rate this item
          </Typography>
          <Rating
            name="rating"
            value={formik.values.rating}
            onChange={(v) => formik.setFieldValue('rating', v)} />
          {formik.errors.rating && formik.touched.rating && <h1 className='text-pink-700'>{formik.errors.rating}</h1>}

        </div>
        {isLoading ? <Button type='submit' size="sm" color="blue-gray" className="mt-6 w-[200px]">
          <div className='h-7 w-7 border-2 border-t-white rounded-full animate-spin mx-auto '></div>
        </Button> : <Button type="submit" className="mt-6 w-[200px] " size="sm" color="blue-gray">
          Submit
        </Button>
        }

      </form>

      <div className="my-7">
        <hr />
      </div>


      {product.reviews.map((data) => {
        return <Card key={data._id} color="transparent" shadow={false} className="w-full max-w-sm">
          <CardHeader
            color="transparent"
            floated={false}
            shadow={false}
            className="mx-0 flex items-center gap-4 pt-0 pb-2"
          >
            <Avatar
              size="lg"
              variant="circular"
              src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
              alt="tania andrew"
            />
            <div className="flex w-full flex-col ">
              <div className="flex items-center justify-between">
                <Typography variant="h5" color="blue-gray">
                  {data.username}
                </Typography>
                <div className="5 flex items-center gap-0">
                  <Rating value={data.rating} readonly />

                </div>
              </div>

            </div>
          </CardHeader>
          <CardBody className="mb-6 p-0">
            <Typography>
              {data.comment}
            </Typography>
          </CardBody>
        </Card>
      })}

    </div>
  )
}
export default Review


