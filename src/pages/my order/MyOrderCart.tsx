import { TOrder } from "../../interface/order";
import { TProduct } from "../../interface/products";

type OrderCardProps = {
    order: TOrder;
}
const MyOrderCart = ({ order, index }: OrderCardProps & { index: number }) => {
    const orderDate = new Date(order.createdAt)
    const date = orderDate.getDate();
    const month = orderDate.getMonth() + 1;
    const year = orderDate.getFullYear();
    return (
        <tr className="border-2 p-5 text-justify">

            <th>{index + 1}</th>
            <th>{order.branchName}</th>
            <th>{order?.address}</th>
            <td> {order.phone}</td>
            <td> {order.products.map((product: TProduct, index) => <li key={index} >{product.name} </li>)}</td>
            <td> {order.products.map((product: TProduct, index) => <p key={index} className="text-">{product.quantity} </p>)}</td>
            <td> {order.totalPrice}tk</td>
            <td >`{date}/{month}/{year}`</td>
            <td >{order?.status}</td>

        </tr>
    );
};

export default MyOrderCart;