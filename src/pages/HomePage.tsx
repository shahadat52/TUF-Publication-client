import { useState } from "react";
import ProductCart from "../components/ProductCart";
import { useGetProductsQuery } from "../redux/features/products/productsApi";

const HomePage = () => {
    const [category, setCategory] = useState("")
    const [searchTerm, setSearchTerm] = useState("")
    const { data } = useGetProductsQuery({ searchTerm, category });
    const products = data?.data;
    console.log(category);
    return (
        <div className="grid grid-cols-6">
            <div className="col-span-1 bg-gray-100 ">
                <p onClick={() => setCategory('Official')} className="mt-8 pl-8 mx-2 uppercase text-lg font-semibold border hover:border-gray-500 hover:bg-primary rounded-lg">Official</p>
                <p onClick={() => setCategory('Academic')} className="mt-1 pl-8 mx-2 uppercase text-lg font-semibold border hover:border-gray-500 hover:bg-primary rounded-lg">Academic</p>
                <p onClick={() => setCategory('Book')} className="mt-1 pl-8 mx-2 uppercase text-lg font-semibold border hover:border-gray-500 hover:bg-primary rounded-lg">Books</p>
                <p onClick={() => setCategory('Register')} className="mt-1 pl-8 mx-2 uppercase text-lg font-semibold border hover:border-gray-500 hover:bg-primary rounded-lg">Register</p>
                <p onClick={() => setCategory('Account')} className="mt-1 pl-8 mx-2 uppercase text-lg font-semibold border hover:border-gray-500 hover:bg-primary rounded-lg">Accounts</p>
                <p onClick={() => setCategory('Magazine')} className="mt-1 pl-8 mx-2 uppercase text-lg font-semibold border hover:border-gray-500 hover:bg-primary rounded-lg">Magazine</p>
                <p onClick={() => setCategory('Other')} className="mt-1 pl-8 mx-2 uppercase text-lg font-semibold border hover:border-gray-500 hover:bg-primary rounded-lg">Others</p>
            </div>
            <div className="col-span-4  ">
                <ProductCart products={products} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            </div>
            <div className="col-span-1 bg-gray-100  ">

            </div>

        </div>
    );
};

export default HomePage;