import { TProduct } from "../../interface/products";
import { useDeleteSingleProductMutation } from "../../redux/features/products/productsApi";

type OrderCardProps = {
    product: TProduct;
}
const ProductCart = ({ product, index }: OrderCardProps & { index: number }) => {





    const [deleteProduct] = useDeleteSingleProductMutation()
    const handleDelete = async (id: string) => {
        alert("Action Confirmed!");
        const result = await deleteProduct(id)
        console.log(result);
    }
    return (
        <tr className="border-2 p-5 text-justify">
            <th>{index + 1}</th>
            <th>{product.name}</th>
            <th>{product?.price}</th>
            {/* <td> {product.size}</td> */}
            {/* <td> {product.orderProducts.map((product: TProduct) => product.name)}</td> */}
            {/* <td> <img src={product.images[0]} className="h-12 w-10" alt="" /></td> */}
            {/* <td> {product.ratings}</td> */}
            {/* <td> {product.subCategory}</td> */}
            <td onClick={() => handleDelete(product._id as string)} > <button className="btn btn-primary">Delete</button></td>

        </tr>
    );
};

export default ProductCart;