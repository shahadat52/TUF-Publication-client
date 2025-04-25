import { useState } from "react";
import { useAppDispatch } from "../redux/hooks";
import { addToCart } from "../redux/features/cart/cartSlice";
import { TProd } from "../interface/TProd";
import Loading from "./Loading";

const ProductTable = ({
    products,
    searchTerm,
    setSearchTerm,
    isLoading,
}: {
    products: TProd[];
    searchTerm: string;
    setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
    isLoading: boolean;
}) => {
    const [quantities, setQuantities] = useState<{ [key: string]: number }>({});
    const dispatch = useAppDispatch();


    const handleQuantityChange = (productId: string, value: number) => {
        setQuantities((prev) => ({
            ...prev,
            [productId]: value,
        }));
    };

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const handleAddToCart = (product: TProd) => {
        const productData = {
            name: product.name,
            productId: product.productId,
            price: product.price,
            category: product.category,
            quantity: quantities[product._id] || 1,
            total: (quantities[product._id] || 1) * product?.price,
        };
        dispatch(addToCart(productData));
    };

    return (
        <div className="container mx-auto p-4">
            <div className="flex justify-between items-center ">
                <h1 className="font-bold mb-5 text-xl uppercase">Product List</h1>

                {/* search system */}
                <label className="input input-bordered mb-5 flex items-center w-[80%] gap-2">
                    <input
                        value={searchTerm}
                        onChange={handleSearch}
                        type="text"
                        className="grow"
                        placeholder="Search"
                    />
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="h-4 w-4 opacity-70"
                    >
                        <path
                            fillRule="evenodd"
                            d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                            clipRule="evenodd"
                        />
                    </svg>
                </label>
            </div>

            <table className="min-w-full bg-white">
                <thead className="bg-gray-500">
                    <tr className="text-white">
                        <th className="py-2 px-4 border-b text-start">Name</th>
                        <th className="py-2 px-4 border-b text-start">Price</th>
                        <th className="py-2 px-4 border-b text-start">Quantity</th>
                        <th className="py-2 px-4 border-b text-start">Amount</th>
                        <th className="py-2 px-4 border-b text-end">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {isLoading ? (
                        <tr>
                            <td colSpan={5} className="text-center py-4">
                                <Loading />
                            </td>
                        </tr>
                    ) : (
                        products?.map((product: TProd) => (
                            <tr key={product._id}>
                                <td className="py-1 px-4 border-b text-start font-bold">
                                    {product.name}
                                </td>
                                <td className="py-1 px-4 border-b text-start">
                                    {product.price}
                                </td>
                                <td className="py-1 px-4 border-b text-start">
                                    <input
                                        onChange={(e) =>
                                            handleQuantityChange(
                                                product._id,
                                                parseInt(e.target.value) || 1
                                            )
                                        }
                                        type="number"
                                        min={1}
                                        className="w-16 h-8 pl-2 border rounded-md border-gray-300"
                                        value={quantities[product._id] || 1}
                                    />
                                </td>
                                <td className="py-1 px-4 border-b text-start">
                                    {(quantities[product._id] || 0) * product.price}
                                </td>
                                <td className="py-1 px-1 border-b text-end">
                                    <button
                                        onClick={() => handleAddToCart(product)}
                                        className="btn btn-primary"
                                    >
                                        Add to cart
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default ProductTable;
