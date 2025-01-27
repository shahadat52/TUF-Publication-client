import { IoMdPrint } from "react-icons/io";
import { TOrder } from "../../interface/order";
import { useGetMyOrdersQuery } from "../../redux/features/order/orderApi";
import { useAppSelector } from "../../redux/hooks";
import MyOrderCart from "./MyOrderCart";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";

const MyOrderPage = () => {
    const pageStyle = `
        @page {
          size: A4 landscape;
          margin: 10mm;
        }
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          -webkit-print-color-adjust: exact;
        }
        h1 {
          color: black;
        }
        table {
          width: 100%;
          border-collapse: collapse;
        }
        table, th, td {
          border: 1px solid black;
        }
        th, td {
          padding: 8px;
          text-align: left;
        }
        .print-only {
          display: none;
        }
        @media print {
        .print-only {
          display: block;
          }
        }
    
        /* Hide elements with the "no-print" class when printing */
        .no-print {
          display: none;
        }
      `;
    const date = new Date();
    const contentRef = useRef<HTMLDivElement>(null);
    const reactToPrintFn = useReactToPrint({ contentRef, documentTitle: '', pageStyle });
    const user = useAppSelector((state) => state.auth.auth.user) as { branch: string } | null;

    const { data } = useGetMyOrdersQuery(user?.branch)
    console.log(data);
    const orders = data?.data
    return (

        <div ref={contentRef}>
            <div className="no-print">
                <button
                    onClick={() => reactToPrintFn()}
                    className="no-print flex justify-center items-center ml-3 mt-4 px-4 py-2 bg-blue-500 text-white rounded"
                >
                    <IoMdPrint /> Print
                </button>
            </div>
            <h1 className=" text-xl text-center uppercase font-bold">Tanzimul Ummah Foundation</h1>
            <h1 className="text-sm text-center uppercase font-bold">publication department</h1>
            <p className="text-center uppercase">Dhaka, Bangladesh</p>
            <p className="text-center font-semibold text-xl uppercase mt-5">All Orders</p>
            <p className="text-center">Print on: {date.toLocaleDateString()} {date.toLocaleTimeString()} </p>

            <div className="overflow-x-auto">
                <table className="table table-md">
                    <thead>
                        <tr className="bg-gray-200 uppercase text-sm leading-normal">
                            <th>No</th>
                            <th>Branch Name</th>
                            <th>Address</th>
                            <th>phone</th>
                            <th>Products</th>
                            <th>Quantity</th>
                            <th>Amount</th>
                            <th>Date</th>
                            <th>Status</th>

                        </tr>
                    </thead>
                    <tbody>
                        {
                            orders?.map((order: TOrder, index: number) => (<MyOrderCart key={order._id} index={index} order={order} />))
                        }
                    </tbody>

                </table>
            </div>
        </div>
    );
};

export default MyOrderPage;