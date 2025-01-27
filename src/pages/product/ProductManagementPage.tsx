import { useState } from "react";
import Loading from "../../components/Loading";
import AddProductModal from "./AddProductModal";
import { TProduct } from "../../interface/products";
import ProductCart from "./ProductCart";
import { useGetAllProductsQuery } from "../../redux/features/products/productsApi";

const ProductManagementPage = () => {

    const [searchTerm, setSearchTerm] = useState("");
    const [isModalOpen, setModalOpen] = useState(false);
    const { data, isLoading } = useGetAllProductsQuery(searchTerm);
    const products = data?.data;


    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value)
    }

    console.log(searchTerm);
    if (isLoading) {
        return <Loading />
    }
    return (
        <div>
            <h1 className="text-xl font-semibold text-center  mb-10">Total  <span className="text-green-500 text-4xl mx-2">{products?.length}</span> items product are available in inventory</h1>
            <div className="flex items-center">
                <div className="p-4">
                    <button
                        onClick={() => setModalOpen(true)}
                        className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
                    >
                        Add Product
                    </button>
                    <AddProductModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
                </div>
                <label className="input input-bordered   flex items-center w-[80%] gap-2">
                    <input
                        value={searchTerm}
                        onChange={handleSearch}
                        type="text" className="grow" placeholder="Search" />
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="h-4 w-4 opacity-70">
                        <path
                            fillRule="evenodd"
                            d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                            clipRule="evenodd" />
                    </svg>
                </label>
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