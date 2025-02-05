import { TOrder } from "../../interface/order";
import { TProduct } from "../../interface/products";

const BranchOrderCart = ({ order, index }: { order: TOrder, index: number }) => {
    console.log(order);
    return (
        <tr className="border-2 p-5 text-justify">
            <th>{index + 1}</th>
            <th>{order?.invoice}</th>
            <td> {order?.products.map((product: TProduct, index) => <li key={index}>{product.name} </li>)}</td>
            <td> {order?.products.map((product: TProduct, index) => <p key={index} className="text-">{product.price} </p>)}</td>
            <td> {order?.products.map((product: TProduct, index) => <p key={index} className="text-">{product.quantity} </p>)}</td>
            <th>{order?.totalPrice}</th>
            <th>{new Date(order?.createdAt).toISOString().split('T')[0]}</th>
        </tr>
    );
};

export default BranchOrderCart;