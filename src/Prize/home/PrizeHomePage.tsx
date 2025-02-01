import { useState } from 'react';
import { useGetProductsQuery } from '../../redux/features/products/productsApi';
import ProductTable from '../../components/ProductTable';

const PrizeHomePage = () => {
    const [category, setCategory] = useState("First");
    const [searchTerm, setSearchTerm] = useState("");
    const { data, isLoading } = useGetProductsQuery({ searchTerm, category });
    const products = data?.data;
    return (
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
            {/* Sidebar */}
            <div className="col-span-1 md:col-span-1 bg-gray-100 p-4">
                <p
                    onClick={() => {
                        setCategory('First')
                        setSearchTerm('')
                    }}
                    className="mt-2 mx-2 md:mt-8 pl-4 py-2  uppercase text-sm md:text-lg font-semibold border hover:border-gray-500 hover:bg-primary rounded-lg cursor-pointer"
                >
                    First Prize
                </p>
                <p
                    onClick={() => {
                        setCategory('Second')
                        setSearchTerm('')
                    }}
                    className="mt-2 pl-4 py-2 mx-2 uppercase text-sm md:text-lg font-semibold border hover:border-gray-500 hover:bg-primary rounded-lg cursor-pointer"
                >
                    Second Prize
                </p>
                <p
                    onClick={() => {
                        setCategory('Third')
                        setSearchTerm('')
                    }}
                    className="mt-2 pl-4 py-2 mx-2 uppercase text-sm md:text-lg font-semibold border hover:border-gray-500 hover:bg-primary rounded-lg cursor-pointer"
                >
                    Third Prize
                </p>
                <p
                    onClick={() => {
                        setCategory('sports')
                        setSearchTerm('')
                    }}
                    className="mt-2 pl-4 py-2 mx-2 uppercase text-sm md:text-lg font-semibold border hover:border-gray-500 hover:bg-primary rounded-lg cursor-pointer"
                >
                    Sports Gift
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
                {
                    products?.length === 0 ? <p className='text-center text-2xl text-red-500 font-semibold'>Products Not Available</p> : <ProductTable products={products} searchTerm={searchTerm} setSearchTerm={setSearchTerm} isLoading={isLoading} />
                }
            </div>

            {/* Optional Right Sidebar */}
            <div className="hidden md:block col-span-1 bg-gray-100 p-4">
                {/* Add content or leave it as a placeholder */}
            </div>
        </div>
    );
};

export default PrizeHomePage;