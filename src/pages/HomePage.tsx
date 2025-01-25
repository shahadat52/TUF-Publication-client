import ProductCart from "../components/ProductCart";

const HomePage = () => {


    return (
        <div className="grid grid-cols-6">
            <div className="col-span-1 bg-gray-100 ">
                <p className="mt-8 pl-8 mx-2 uppercase text-lg font-semibold border hover:border-gray-500 hover:bg-primary rounded-lg">Official</p>
                <p className="mt-1 pl-8 mx-2 uppercase text-lg font-semibold border hover:border-gray-500 hover:bg-primary rounded-lg">Academic</p>
                <p className="mt-1 pl-8 mx-2 uppercase text-lg font-semibold border hover:border-gray-500 hover:bg-primary rounded-lg">Books</p>
                <p className="mt-1 pl-8 mx-2 uppercase text-lg font-semibold border hover:border-gray-500 hover:bg-primary rounded-lg">Register</p>
                <p className="mt-1 pl-8 mx-2 uppercase text-lg font-semibold border hover:border-gray-500 hover:bg-primary rounded-lg">Accounts</p>
                <p className="mt-1 pl-8 mx-2 uppercase text-lg font-semibold border hover:border-gray-500 hover:bg-primary rounded-lg">Magazine</p>
                <p className="mt-1 pl-8 mx-2 uppercase text-lg font-semibold border hover:border-gray-500 hover:bg-primary rounded-lg">Others</p>
            </div>
            <div className="col-span-4  ">
                <ProductCart />
            </div>
            <div className="col-span-1 bg-gray-100  ">

            </div>

        </div>
    );
};

export default HomePage;