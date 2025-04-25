import { useState } from "react";
import { TProduct } from "../../interface/products";
import { useDeleteSingleProductMutation } from "../../redux/features/products/productsApi";
import UpdateProductModal from "./UpdateProductModal";
import { NavLink } from "react-router";

type OrderCardProps = {
    product: TProduct;
}
const ProductCart = ({ product, index }: OrderCardProps & { index: number }) => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [deleteProduct] = useDeleteSingleProductMutation()

    const handleDelete = async (id: string) => {
        alert("Action Confirmed!");
        const result = await deleteProduct(id)
        console.log(result);
    }


    return (
        <tr className="border-2 p-5 text-justify">
            <th>{index + 1}</th>
            <th className="text-lg font-bold"><NavLink to={`/dashboard/products/${product.productId}`} >{product.name}</NavLink></th>
            <th>{product?.price}</th>
            <th>{product?.productId}</th>
            <td> {product.category}</td>
            <td >

                <button
                    onClick={() => setModalOpen(true)}
                    className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
                >
                    Update Product
                </button>
                <UpdateProductModal isOpen={isModalOpen} product={product} onClose={() => setModalOpen(false)} />

            </td>
            <td onClick={() => handleDelete(product._id as string)} > <button className="btn btn-primary">Delete</button></td>

        </tr>
    );
};

export default ProductCart;