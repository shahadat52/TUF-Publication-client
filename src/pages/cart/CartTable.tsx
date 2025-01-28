/* eslint-disable @typescript-eslint/no-explicit-any */
import { GiCancel } from "react-icons/gi";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { removeFromCart } from "../../redux/features/cart/cartSlice";
import { useReactToPrint } from "react-to-print";
import { useRef } from "react";
import { IoMdPrint } from "react-icons/io";
import { useLastOrderQuery } from "../../redux/features/order/orderApi";

const CartTable = ({ totalPrice }: { totalPrice: number }) => {

    const pageStyle = `
    @page {
      size: A4 ;
      margin: 20mm;
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
    const products = useAppSelector((state) => state.auth.cart.products);
    const user = useAppSelector((state) => state.auth.auth.user) as { branch: string } | null;
    const { data } = useLastOrderQuery(undefined)
    const invoice = data?.data?.invoice
    console.log(invoice);
    console.log(user);
    const dispatch = useAppDispatch();
    const date = new Date();
    const contentRef = useRef<HTMLDivElement>(null);
    const reactToPrintFn = useReactToPrint({ contentRef, documentTitle: '', pageStyle });

    const handleRemoveFromCart = (id: string) => {
        dispatch(removeFromCart(id));
    };

    return (
        <div>
            {/* Ensure the ref is attached to the main container you want to print */}
            <div ref={contentRef} className="p-4">
                <h1 className="text-xl text-center uppercase font-bold">Tanjimul Ummah Foundation</h1>
                <p className="text-center uppercase">Dhaka, Bangladesh</p>
                <p className="text-center">01811473336</p>
                <p className="text-center font-semibold text-xl uppercase mt-5">Order Form</p>
                <p className="text-center">Print on: {date.toLocaleDateString()} {date.toLocaleTimeString()} </p>
                <div className="flex justify-between">
                    <div>

                        <p className="ml-6 text-lg"><span className="font-semibold">Invoice no:</span> TUF-{invoice + 1}</p>
                        <p className="ml-6 text-lg"><span className=" font-semibold">Order Form:</span> {user?.branch} </p>
                    </div>
                    <div>
                        <p className="text-xl lg:text-2xl font-bold text-end uppercase mr-6">Invoice/bill</p>
                        <p className="text-lg font-bold text-end uppercase mr-6">Order Data: {date.toLocaleDateString()}</p>
                    </div>
                </div>

                <div className="container mx-auto p-4">
                    <table className="min-w-full bg-white">
                        <thead className="bg-gray-500">
                            <tr className="text-white">
                                <th className="py-2 px-4 border-b text-start">Name</th>
                                <th className="py-2 px-4 border-b text-start">Category</th>
                                <th className="py-2 px-4 border-b text-start">Price</th>
                                <th className="py-2 px-4 border-b text-start">Quantity</th>
                                <th className="py-2 px-4 border-b text-start">Amount</th>
                                <th className="no-print py-2 px-4 border-b text-start">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products?.map((product: any) => (
                                <tr key={product._id}>
                                    <td className="py-2 px-4 border-b text-start font-bold">{product?.name}</td>
                                    <td className="py-2 px-4 border-b text-start">{product?.category}</td>
                                    <td className="py-2 px-4 border-b text-start">{product?.price}</td>
                                    <td className="py-2 px-4 border-b text-start">{product?.quantity}</td>
                                    <td className="py-2 px-4 border-b text-start">{product?.total}</td>
                                    <td
                                        onClick={() => handleRemoveFromCart(product?.productId)}
                                        className="no-print py-2 px-4 border-b text-end text-red-500"
                                    >
                                        <p className="text-2xl">
                                            <GiCancel />
                                        </p>
                                    </td>
                                </tr>
                            ))}
                        </tbody>

                    </table>
                    <div className=" flex justify-between  w-full ">
                        <p className="flex  text-xl font-semibold ml-4 ">Amount:</p>
                        <p><span className="text-red-500 text-xl mr-1 "> {totalPrice}/-</span></p>
                    </div>
                    <div className="no-print">
                        <button
                            onClick={() => reactToPrintFn()}
                            className="no-print flex justify-center items-center mt-4 px-4 py-2 bg-gray-300 text-black rounded"
                        >
                            <IoMdPrint /> Print
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartTable;
