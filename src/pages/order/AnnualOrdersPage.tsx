import { useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print';
import { useAnnualPrizeOrdersQuery } from '../../redux/features/order/orderApi';
import Loading from '../../components/Loading';
import DatePicker from 'react-datepicker';
import { IoMdPrint } from 'react-icons/io';
import { TOrder } from '../../interface/order';
import OrderCard from './OrderCard';

const AnnualOrdersPage = () => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const formatDate = (date: Date | null): string => {
    return date ? date.toISOString().split("T")[0] : "";
  };

  const formattedStartDate = formatDate(startDate);
  const formattedEndDate = formatDate(endDate);
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
  table {
    width: 100%;
    border-collapse: collapse;
    table-layout: fixed;
  }
  table, th, td {
    border: 1px solid black;
  }
  th, td {
    padding: 2px;
    text-align: left;
    vertical-align: top;
    word-wrap: break-word;
    overflow-wrap: break-word;
    font-size: 11px;
  }
  th:nth-child(1), td:nth-child(1) { width: 20px; }
  th:nth-child(2), td:nth-child(2) { width: 100px; }
  th:nth-child(3), td:nth-child(3) { width: 90px; }
  th:nth-child(4), td:nth-child(4) { width: 90px; }
  th:nth-child(5), td:nth-child(5) { width: 95px; }
  th:nth-child(6), td:nth-child(6) { width: 280px; }
  th:nth-child(7), td:nth-child(7) { width: 90px; }
  th:nth-child(8), td:nth-child(8) { width: 90px; }
  th:nth-child(9), td:nth-child(9) { width: 70px; }
  .print-only {
    display: none;
  }
  @media print {
    .print-only {
      display: block;
    }
    .no-print {
      display: none;
    }
  }
`;
  const date = new Date();
  const contentRef = useRef<HTMLDivElement>(null);
  const reactToPrintFn = useReactToPrint({ contentRef, documentTitle: '', pageStyle });

  const { data, isLoading } = useAnnualPrizeOrdersQuery({ startDate: formattedStartDate, endDate: formattedEndDate });
  const annualPrizeOrders = data?.data;
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


      <h1 className="text-xl font-semibold text-center  mb-10">Total  <span className="text-green-500 text-4xl mx-2">{annualPrizeOrders?.length}</span> orders placed</h1> <hr /> <hr />
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
                <th>Customer</th>
                <th>Address</th>
                <th>Date</th>
                <th>phone</th>
                <th>Order----------------------------Products</th>
                <th>Stock</th>
                <th>Quantity</th>
                <th >Amount</th>
                <th className="no-print">Status</th>
                <th className="no-print">Print</th>

              </tr>
            </thead>
            <tbody>
              {
                annualPrizeOrders?.map((order: TOrder, index: number) => (<OrderCard key={order._id} index={index} order={order} />))
              }

            </tbody>

          </table>
        </div>


      </div>
    </div>
  );
};

export default AnnualOrdersPage;