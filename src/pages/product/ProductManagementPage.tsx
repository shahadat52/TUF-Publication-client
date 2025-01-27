import { useState } from "react";
import Loading from "../../components/Loading";
import AddProductModal from "./AddProductModal";
import { TProduct } from "../../interface/products";
import ProductCart from "./ProductCart";
import { useGetAllProductsQuery } from "../../redux/features/products/productsApi";

const ProductManagementPage = () => {
    const [isModalOpen, setModalOpen] = useState(false);
    const { data, isLoading } = useGetAllProductsQuery(undefined);
    const products = data?.data;
    if (isLoading) {
        return <Loading />
    }
    return (
        <div>
            <h1 className="text-xl font-semibold text-center  mb-10">Total  <span className="text-green-500 text-4xl mx-2">{products?.length}</span> items product are available in inventory</h1>
            <div className="p-4">
                <button
                    onClick={() => setModalOpen(true)}
                    className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
                >
                    Add Product
                </button>
                <AddProductModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 ">

            </div>


            <div className="overflow-x-auto">
                <table className="table table-md">
                    <thead>
                        <tr className="bg-gray-200 uppercase text-sm leading-normal">
                            <th>No</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>ProductId</th>
                            <th>Category</th>
                            <th>Update</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            products?.map((product: TProduct, index: number) => (<ProductCart key={product._id} index={index} product={product} />))
                        }

                    </tbody>

                </table>
            </div>
        </div>
    );
};

export default ProductManagementPage;