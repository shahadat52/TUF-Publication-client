
const Footer = () => {
    return (
        <footer className="dark:bg-gray-800 dark:text-gray-50 grid grid-cols-2 lg:grid-cols-3 bg-[#f7ebae]">

            <div className="flex items-center text-[15px] pt-5 pl-10 pb-6 text-lg font-semibold">
                <div>
                    <p>Tanzimul Ummah Foundation</p>
                    <p>House # 05, Shah Makhdum Avenue, <br /> Sector #14, Uttara Dhaka-1230, Bangladesh</p>
                </div>
            </div>
            <div className="flex items-center text-[15px] pt-5 pl-10 pb-6 text-lg font-semibold">
                <div >
                    <p className="underline">Contract us</p>
                    <p>E-Mail: mtupbd@gmail.com</p>
                    <p>
                        Mobile : +8801811473336
                    </p>
                </div>
            </div>
            <div className="pt-2 pl-10 pb-2  font-semibold">
                <p className="underline">Bank account</p>
                <p>Account title: Tanjimul ummah publications</p>
                <p>
                    Account No: 20502070200756116
                </p>
                <p>Account Type: MSA (Regular)</p>
                <span>Branch :  Uttara</span>, <span>Bank Name: IBBL</span>

            </div>
        </footer>
    );
};

export default Footer;