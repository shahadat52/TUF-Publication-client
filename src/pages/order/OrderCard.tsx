/* eslint-disable @typescript-eslint/no-explicit-any */
import { TOrder } from "../../interface/order";
import { TProduct } from "../../interface/products";

type OrderCardProps = {
    order: TOrder;
}



const OrderCard = ({ order, index }: OrderCardProps & { index: number }) => {
    return (

        <tr className="border-2 p-5 text-justify">
            <th>{index + 1}</th>
            <th>{order.branchName}</th>
            <th>{order?.address}</th>
            <td> {order.phone}</td>
            <td> {order.products.map((product: TProduct) => <li>{product.name} </li>)}</td>
            <td> {order.products.map((product: TProduct) => <p className="text-">{product.quantity} </p>)}</td>
            <td> {order.totalPrice}tk</td>
            <td> {order.status}</td>
        </tr>



    );
};

export default OrderCard;