/* eslint-disable @typescript-eslint/no-explicit-any */
import { GiCancel } from "react-icons/gi";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { removeFromCart } from "../../redux/features/cart/cartSlice";

const CartTable = () => {
    const products = useAppSelector((state) => state.auth.cart.products)
    const dispatch = useAppDispatch()

    const handleRemoveFromCart = (id: string) => {
        console.log(id);
        dispatch(removeFromCart(id))
    }
    return (
        <div className="container mx-auto p-4 ">

            <table className="min-w-full bg-white">
                <thead className='bg-gray-500 '>
                    <tr className=' text-white '>
                        <th className="py-2 px-4 border-b text-start ">Name</th>
                        <th className="py-2 px-4 border-b text-start">category</th>
                        <th className="py-2 px-4 border-b text-start">Price</th>
                        <th className="py-2 px-4 border-b text-start">Quantity</th>
                        <th className="py-2 px-4 border-b text-start">Total</th>
                        <th className="py-2 px-4 border-b text-start">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {products?.map((product: any) => (
                        <tr key={product._id}>
                            <td className="py-2 px-4 border-b  text-start font-bold">{product?.name}</td>
                            <td className="py-2 px-4 border-b text-start">{product?.category}</td>
                            <td className="py-2 px-4 border-b text-start">{product?.price}</td>
                            <td className="py-2 px-4 border-b text-start">
                                {product?.quantity}
                            </td>
                            <td className="py-2 px-4 border-b text-start">
                                {product?.total}
                            </td>
                            <td onClick={() => handleRemoveFromCart(product?.productId)} className="py-2 px-4 border-b text-end text-red-500"><p className="text-2xl"><GiCancel /></p></td>

                        </tr>
                    ))}
                </tbody>

            </table>
        </div>
    );
};

export default CartTable;