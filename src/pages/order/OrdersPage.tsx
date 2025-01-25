/* eslint-disable @typescript-eslint/no-explicit-any */
import Loading from "../../components/Loading";
import { TOrder } from "../../interface/order";
import { useGetAllOrdersQuery } from "../../redux/features/order/orderApi";
import OrderCard from "./OrderCard";

const OrdersPage = () => {
    const { data, isLoading } = useGetAllOrdersQuery(undefined);
    const orders = data?.data;
    console.log(orders);
    if (isLoading) {
        return <Loading />
    }
    return (
        <div>
            <h1 className="text-xl font-semibold text-center  mb-10">Total  <span className="text-green-500 text-4xl mx-2">{orders?.length}</span> orders placed</h1> <hr /> <hr />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 ">

            </div>


            <div className="overflow-x-auto">
                <table className="table table-md">
                    <thead>
                        <tr className="bg-gray-200 uppercase text-sm leading-normal">
                            <th>No</th>
                            <th>Customer Name</th>
                            <th>Address</th>
                            <th>phone</th>
                            <th>Products</th>
                            <th>Quantity</th>
                            <th>Amount</th>
                            <th>Status</th>

                        </tr>
                    </thead>
                    <tbody>
                        {
                            orders?.map((order: TOrder, index: number) => (<OrderCard key={order._id} index={index} order={order} />))
                        }

                    </tbody>

                </table>
            </div>
        </div>
    );
};

export default OrdersPage;