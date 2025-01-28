/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef, useState } from "react";
import Loading from "../../components/Loading";
import { TOrder } from "../../interface/order";
import { useGetAllOrdersQuery } from "../../redux/features/order/orderApi";
import OrderCard from "./OrderCard";
import { useReactToPrint } from "react-to-print";
import { IoMdPrint } from "react-icons/io";

const OrdersPage = () => {
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
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

  const { data, isLoading } = useGetAllOrdersQuery({ startDate, endDate });
  const orders = data?.data;
  console.log({ startDate, endDate });
  if (isLoading) {
    return <Loading />
  }
  return (
    <div>
      <div className=" flex mt-5 justify-around">
        <input
          onChange={(e) => setStartDate(e.target.value)}
          type="text"
          placeholder="yyyy-mm-dd     start date"
          className="input input-bordered input-sm w-full max-w-xs" />
        <input
          onChange={(e) => setEndDate(e.target.value)}
          type="text"
          placeholder="yyyy-mm-dd     end date"
          className="input input-bordered input-sm w-full max-w-xs" />
      </div>
      <h1 className="text-xl font-semibold text-center  mb-10">Total  <span className="text-green-500 text-4xl mx-2">{orders?.length}</span> orders placed</h1> <hr /> <hr />
      <button
        onClick={() => reactToPrintFn()}
        className="no-print flex justify-center items-center ml-3 mt-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        <IoMdPrint /> Print
      </button>
      <div ref={contentRef} className="p-4">

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
                <th>Customer Name</th>
                <th>Address</th>
                <th>phone</th>
                <th>Products</th>
                <th>Quantity</th>
                <th>Amount</th>
                <th className="no-print">Status</th>
                <th className="no-print">Print</th>

              </tr>
            </thead>
            <tbody>
              {
                orders?.map((order: TOrder, index: number) => (<OrderCard key={order._id} index={index} order={order} />))
              }

            </tbody>

          </table>
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;