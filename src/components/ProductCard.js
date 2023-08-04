import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Rating
} from "@material-tailwind/react";
import { baseUrl } from "../features/constant";
import { useNavigate } from "react-router";
import { Image, Shimmer } from 'react-shimmer'


const ProductCard = ({ product }) => {

  const nav = useNavigate();


  return (
    <Card className="mt-6 w-full cursor-pointer hover:shadow-2xl" onClick={() => nav(`/product/detail/${product._id}`)}>
      <CardHeader color="blue-gray" className="relative h-56 ">
        <Image
          src={`${baseUrl}${product.product_image}`}
          fallback={<Shimmer width={800} height={600} className="w-full h-full" />}
        />

      </CardHeader>
      <CardBody>
        <Typography variant="h5" color="blue-gray" className="mb-2">
          {product.product_name}
        </Typography>
        <Typography>
          {product.product_detail}
        </Typography>
        {product.numReviews > 0 && <div>
          <div className="flex justify-between">
            <Rating value={product.rating} readonly />
            <h1> Reviews {product.numReviews}</h1>
          </div>

        </div>
        }
      </CardBody>
      <CardFooter className="pt-0">
        <Button>Read More</Button>
      </CardFooter>
    </Card>
  )
}


export default ProductCard