import {
  Card,
  Typography,
  Input,

  Button,

} from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { useUserUpdateMutation } from "../../features/auth/authApi";
import { useFormik } from "formik";
import * as Yup from 'yup';
import { toast } from "react-toastify";
import { userUpdate } from "../../features/userInfo";

const UpdateForm = ({ user }) => {

  const userSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    fullname: Yup.string().min(5).max(20).required('Required')

  });

  const { userInfo } = useSelector((store) => store.userInfo);

  const dispatch = useDispatch();

  const [userUpdates, { isLoading, isError, error, isSuccess }] = useUserUpdateMutation();


  const formik = useFormik({
    initialValues: {
      email: user?.email,
      fullname: user?.fullname

    },
    onSubmit: async (val) => {

      try {

        const response = await userUpdates({
          email: val.email,
          fullname: val.fullname,
          token: userInfo.token
        }).unwrap();

        dispatch(userUpdate({
          email: val.email,
          fullname: val.fullname

        }))
        toast.success('successfully updated');

      } catch (err) {
        console.log(err);

        toast.error(err.data.message);
      }

    },
    validationSchema: userSchema
  });


  return (
    <>


      <Card color="transparent" shadow={false}>
        <Typography variant="h4" color="blue-gray">
          Profile
        </Typography>
        <form onSubmit={formik.handleSubmit} className="mt-8 mb-2 ">
          <div className="mb-4 flex flex-col gap-6">
            <Input
              name='email'
              onChange={formik.handleChange}
              value={formik.values.email}
              size="lg" label="Email" />

            {formik.errors.email && formik.touched.email && <h1 className='text-pink-700'>{formik.errors.email}</h1>}


            <Input
              name='fullname'
              onChange={formik.handleChange}
              value={formik.values.fullname}
              type="text" size="lg" label="Username" />
            {formik.errors.fullname && formik.touched.fullname && <h1 className='text-pink-700'>{formik.errors.fullname}</h1>}

          </div>

          {isLoading ? <Button type='submit' className="mt-6" fullWidth>
            <div className='h-7 w-7 border-2 border-t-blue-gray-900 rounded-full animate-spin mx-auto '></div>
          </Button> : <Button type='submit' className="mt-6" fullWidth>
            Update
          </Button>
          }


        </form>
      </Card>






    </>
  )
}
export default UpdateForm