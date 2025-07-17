import { useParams } from "react-router";
import { useBranchOrdersQuery } from "../../redux/features/order/orderApi";
import BranchOrderCart from "./BranchOrderCart";
import { TOrder } from "../../interface/order";

const BranchOrderPage = () => {
    const { id } = useParams();
    const { data } = useBranchOrdersQuery(id);
    const products = data?.data;
    return (
        <div className="overflow-x-auto">
            <h1 className="text-xl font-semibold text-center  mb-10">Total  <span className="text-green-500 text-4xl mx-2">{products?.length}</span> order makes from {products?.length ? products[0]?.branchName : ''}  </h1>

            <table className="table table-md">
                <thead>
                    <tr className="bg-gray-200 uppercase text-sm leading-normal">
                        <th>No</th>
                        <th>Invoice</th>
                        <th>Product</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Amount</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        products?.length <= 0 && <p className="text-center text-2xl font-semibold text-red-600">Sorry This Branch Not Make Order Yet!</p>
                    }
                    {
                        products?.map((product: TOrder, index: number) => (<BranchOrderCart key={product._id} index={index} order={product} />))
                    }

                </tbody>

            </table>
        </div>
    );
};

export default BranchOrderPage;