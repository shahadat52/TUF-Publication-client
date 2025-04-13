/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef, useState } from "react";
import Loading from "../../components/Loading";
import { TOrder } from "../../interface/order";
import { useGetAllOrdersQuery } from "../../redux/features/order/orderApi";
import OrderCard from "./OrderCard";
import { useReactToPrint } from "react-to-print";
import { IoMdPrint } from "react-icons/io";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const OrdersPage = () => {
  // const [startDate, setStartDate] = useState('')
  // const [endDate, setEndDate] = useState('')
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const formatDate = (date: Date | null): string => {
    return date ? date.toISOString().split("T")[0] : "";
  };

  const formattedStartDate = formatDate(startDate);
  const formattedEndDate = formatDate(endDate);
  console.log({ formattedStartDate, formattedEndDate });
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

  const { data, isLoading } = useGetAllOrdersQuery({ startDate: formattedStartDate, endDate: formattedEndDate });
  const orders = data?.data;
  if (isLoading) {
    return <Loading />
  }
  return (
    <div>

      <div className="flex gap-3 justify-center items-center mx-auto w-full mt-5">

        <div className="flex items-center  gap-2">
          <label className="text-sm text-gray-700">Start Date:</label>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            placeholderText="Start Date"
            dateFormat="yyyy-MM-dd"
            className="px-3 py-2 border border-gray-300 rounded-md text-sm"
            maxDate={endDate || undefined}
          />
        </div>

        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-700">End Date:</label>
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            placeholderText="End Date"
            dateFormat="yyyy-MM-dd"
            className="px-3 py-2 border border-gray-300 rounded-md text-sm"
            minDate={startDate || undefined}
          />
        </div>


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
                <th>Date</th>
                <th>phone</th>
                <th>Order---------------------Products</th>
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