import { Outlet } from 'react-router';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { FaWhatsappSquare } from 'react-icons/fa';

const MainLayout = () => {

    const phoneNumber = "8801811473336"
    const message = "Hello, I would like to our products."

    const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    return (
        <div className='max-w-[1550px] mx-auto'>
            <Navbar />
            <div className="max-w-[1550px] mx-auto min-h-screen ">
                <Outlet />
            </div>
            <div >
                <a
                    href={whatsappLink}
                    target="_blank"

                >
                    <p className="text-green-700 fixed bottom-4 right-4 text-[60px] "><FaWhatsappSquare /></p>
                </a>
            </div>

            <Footer />
        </div>

    );
};

export default MainLayout;