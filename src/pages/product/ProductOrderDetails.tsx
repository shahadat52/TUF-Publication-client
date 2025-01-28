import { useParams } from "react-router";
import { useProductOrderDetailsQuery } from "../../redux/features/order/orderApi";
import { TProduct } from "../../interface/products";
import ProductOrderDetailsCart from "./ProductOrderDetailsCart";

const ProductOrderDetails = () => {
    const { id } = useParams();
    const { data } = useProductOrderDetailsQuery(id);
    const products = data?.data
    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table table-md">
                    <thead>
                        <tr className="bg-gray-200 uppercase text-sm leading-normal">
                            <th>No</th>
                            <th>Branch Name</th>
                            <th>Product</th>
                            <th>Invoice</th>
                            <th>Quantity</th>
                            <th>Amount</th>
                            <th>Category</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            products?.length <= 0 && <p className="text-center text-2xl font-semibold text-red-600">Sorry this product not sell Yet!</p>
                        }
                        {
                            products?.map((product: TProduct, index: number) => (<ProductOrderDetailsCart key={product._id} index={index} product={product} />))
                        }

                    </tbody>

                </table>
            </div>
        </div>
    );
};

export default ProductOrderDetails;