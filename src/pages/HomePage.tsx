import { useState } from "react";
import { useGetProductsQuery } from "../redux/features/products/productsApi";
import ProductTable from "../components/ProductTable";

const HomePage = () => {
    const [category, setCategory] = useState("Official");
    const [searchTerm, setSearchTerm] = useState("");
    const { data, isLoading } = useGetProductsQuery({ searchTerm, category });
    const products = data?.data;



    return (
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
            {/* Sidebar */}
            <div className="col-span-1 md:col-span-1 bg-gray-100 p-4">
                <p
                    onClick={() => {
                        setCategory('Official')
                        setSearchTerm('')
                    }}
                    className="mt-2 mx-2 md:mt-8 pl-4 py-2  uppercase text-sm md:text-lg font-semibold border hover:border-gray-500 hover:bg-primary rounded-lg cursor-pointer"
                >
                    Official
                </p>
                <p
                    onClick={() => {
                        setCategory('Academic')
                        setSearchTerm('')
                    }}
                    className="mt-2 pl-4 py-2 mx-2 uppercase text-sm md:text-lg font-semibold border hover:border-gray-500 hover:bg-primary rounded-lg cursor-pointer"
                >
                    Academic
                </p>
                <p
                    onClick={() => {
                        setCategory('Books')
                        setSearchTerm('')
                    }}
                    className="mt-2 pl-4 py-2 mx-2 uppercase text-sm md:text-lg font-semibold border hover:border-gray-500 hover:bg-primary rounded-lg cursor-pointer"
                >
                    Books
                </p>
                <p
                    onClick={() => {
                        setCategory('Register')
                        setSearchTerm('')
                    }}
                    className="mt-2 pl-4 py-2 mx-2 uppercase text-sm md:text-lg font-semibold border hover:border-gray-500 hover:bg-primary rounded-lg cursor-pointer"
                >
                    Register
                </p>
                <p
                    onClick={() => {
                        setCategory('Accounts')
                        setSearchTerm('')
                    }}
                    className="mt-2 pl-4 py-2 mx-2 uppercase text-sm md:text-lg font-semibold border hover:border-gray-500 hover:bg-primary rounded-lg cursor-pointer"
                >
                    Accounts
                </p>
                <p
                    onClick={() => {
                        setCategory('Magazine')
                        setSearchTerm('')
                    }}
                    className="mt-2 pl-4 py-2 mx-2 uppercase text-sm md:text-lg font-semibold border hover:border-gray-500 hover:bg-primary rounded-lg cursor-pointer"
                >
                    Magazine
                </p>
                <p
                    onClick={() => {
                        setCategory('Other')
                        setSearchTerm('')
                    }}
                    className="mt-2 pl-4 py-2 mx-2 uppercase text-sm md:text-lg font-semibold border hover:border-gray-500 hover:bg-primary rounded-lg cursor-pointer"
                >
                    Others
                </p>
            </div>

            {/* Product Section */}
            <div className="col-span-1 md:col-span-4 p-4">
                <ProductTable products={products} searchTerm={searchTerm} setSearchTerm={setSearchTerm} isLoading={isLoading} />
            </div>

            {/* Optional Right Sidebar */}
            <div className="hidden md:block col-span-1 bg-gray-100 p-4">
                {/* Add content or leave it as a placeholder */}
            </div>
        </div>
    );
};

export default HomePage;
