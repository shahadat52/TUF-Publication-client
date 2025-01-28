import { TProduct } from "../../interface/products";

const ProductOrderDetailsCart = ({ product, index }: { product: TProduct, index: number }) => {
    return (
        <tr className="border-2 p-5 text-justify">
            <th>{index + 1}</th>
            <th className="text-lg font-bold">{product?.branchName}</th>
            <td> {product?.products?.name}</td>
            <th>{product?.invoice}</th>
            <th>{product?.products?.quantity}</th>
            <th>{product?.totalPrice}</th>
            <th>{product?.products?.category}</th>



        </tr>
    );
};

export default ProductOrderDetailsCart;