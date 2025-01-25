
const NotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-5xl font-bold text-red-600">404</h1>
            <p className="text-xl mt-4">Oops! The page you're looking for doesn't exist.</p>
            <a
                href="/"
                className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
                Go Back to Home
            </a>
        </div>
    );
};

export default NotFound;
