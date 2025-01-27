import { TOrder } from "../../interface/order";
import { useGetMyOrdersQuery } from "../../redux/features/order/orderApi";
import { useAppSelector } from "../../redux/hooks";
import MyOrderCart from "./MyOrderCart";

const MyOrderPage = () => {
    const user = useAppSelector((state) => state.auth.auth.user) as { branch: string } | null;

    const { data } = useGetMyOrdersQuery(user?.branch)
    console.log(data);
    const orders = data?.data
    return (

        <div className="overflow-x-auto">
            <table className="table table-md">
                <thead>
                    <tr className="bg-gray-200 uppercase text-sm leading-normal">
                        <th>No</th>
                        <th>Branch Name</th>
                        <th>Address</th>
                        <th>phone</th>
                        <th>Products</th>
                        <th>Quantity</th>
                        <th>Amount</th>
                        <th>Date</th>
                        <th className="no-print">Status</th>

                    </tr>
                </thead>
                <tbody>
                    {
                        orders?.map((order: TOrder, index: number) => (<MyOrderCart key={order._id} index={index} order={order} />))
                    }

                </tbody>

            </table>
        </div>
    );
};

export default MyOrderPage;