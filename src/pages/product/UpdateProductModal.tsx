/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm, SubmitHandler } from "react-hook-form";
import { useUpdateProductDataMutation } from "../../redux/features/products/productsApi";
import { toast } from "react-toastify";
import Loading from "../../components/Loading";
import { useState } from "react";
import { TProd } from "../../interface/TProd";



const UpdateProductModal = ({ isOpen, onClose, product }: { isOpen: boolean; product: any; onClose: () => void }) => {
    const [isLoading, setIsLoading] = useState(false)
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<TProd>();
    const [updateProductData] = useUpdateProductDataMutation()

    const onSubmit: SubmitHandler<TProd> = async (data) => {
        setIsLoading(true)
        const productData = {
            _id: product._id,
            name: data.name,
            price: data.price,
            productId: data.productId,
            category: data.category
        };

        const result = await updateProductData(productData) as any
        if (result?.data) {
            setIsLoading(false)
            toast.success("Update successfully")
            reset();
            onClose();
        }
        if (result?.error) {
            setIsLoading(false)
            toast.error("Update failed")
        };
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg w-[50%]">
                <div className="flex justify-between items-center px-4 py-3 border-b">
                    <h2 className="text-lg font-bold">Add Product</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-red-500">
                        ✕
                    </button>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className="p-4 space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="block text-sm font-medium">Product Name</label>
                            <input
                                defaultValue={product.name}
                                type="text"
                                {...register("name", { required: "Product name is required" })}
                                className="w-full px-3 py-2 border rounded-md focus:ring focus:ring-blue-500 focus:outline-none"
                            />
                            {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
                        </div>


                        <div>
                            <label className="block text-sm font-medium">Product ID</label>
                            <input
                                defaultValue={product.productId}
                                type="text"
                                {...register("productId", { required: "productId is required" })}
                                className="w-full px-3 py-2 border rounded-md focus:ring focus:ring-blue-500 focus:outline-none"
                            />
                            {errors.productId && <p className="text-sm text-red-500">{errors.productId.message}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium">Price</label>
                            <input
                                defaultValue={product.price}
                                type="number"
                                step="0.01"
                                {...register("price", { required: "Price is required", min: 0 })}
                                className="w-full px-3 py-2 border rounded-md focus:ring focus:ring-blue-500 focus:outline-none"
                            />
                            {errors.price && <p className="text-sm text-red-500">{errors.price.message}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Category</label>
                            <input
                                defaultValue={product.category}
                                type="text"
                                {...register("category", { required: "Category is required" })}
                                className="w-full px-3 py-2 border rounded-md focus:ring focus:ring-blue-500 focus:outline-none"
                            />
                            {errors.category && <p className="text-sm text-red-500">{errors.category.message}</p>}
                        </div>







                    </div>
                    <div className="flex justify-end">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-gray-500 border rounded-md hover:bg-gray-100"
                        >
                            Cancel
                        </button>
                        {
                            isLoading ? <Loading /> : <button
                                type="submit"
                                className="ml-2 px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
                            >
                                Update
                            </button>
                        }
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateProductModal;


