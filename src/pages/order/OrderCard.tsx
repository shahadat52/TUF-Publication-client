import { IoMdPrint } from "react-icons/io";
import { TOrder } from "../../interface/order";
import { TProduct } from "../../interface/products";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { useUpdateStatusMutation } from "../../redux/features/order/orderApi";
import { NavLink } from "react-router";


type OrderCardProps = {
  order: TOrder;
}



const OrderCard = ({ order, index }: OrderCardProps & { index: number }) => {
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
  const contentRef = useRef<HTMLTableRowElement>(null);
  const reactToPrintFn = useReactToPrint({ contentRef, documentTitle: '', pageStyle });
  const [updateStatus] = useUpdateStatusMutation();

  const handleStatusUpdate = (id: string) => {
    updateStatus(id)
  };
  const date = new Date(order?.createdAt);
  const formattedDate = date?.toLocaleDateString("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  });

  console.log(formattedDate);
  return (
    <>
      <tr ref={contentRef} className="border-2 p-5 text-justify">
        <th>{index + 1}</th>
        <th><NavLink to={`/dashboard/order/branch/${order?.email}`}>{order.branchName}</NavLink></th>
        <th>{order?.address}</th>
        <th>{formattedDate}</th>
        <td> {order.phone}</td>
        <td> {order.products.map((product: TProduct, index) => <li key={index}>{product.name} </li>)}</td>
        <td> {order.products.map((product: TProduct, index) => <p key={index} className="text-">{product.quantity} </p>)}</td>
        <td> {order.totalPrice}tk</td>
        <td className="no-print"><button onClick={() => handleStatusUpdate(order?._id)} className="btn btn-primary" disabled={order.status === 'courier'}> {order.status}</button></td>
        <td className="no-print"> <button
          onClick={() => reactToPrintFn()}
          className="no-print mt-1 px-1 py-1 text-2xl text-black rounded"
        >
          <IoMdPrint />
        </button></td>
      </tr>

    </>

  );
};

export default OrderCard;