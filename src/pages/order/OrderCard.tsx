import { IoMdPrint } from "react-icons/io";
import { TOrder } from "../../interface/order";
import { TProduct } from "../../interface/products";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { useUpdateDeliveryStatusMutation, useUpdateStatusMutation } from "../../redux/features/order/orderApi";
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
    }
    /* Hide elements with the "no-print" class when printing */
    .no-print {
      display: none;
    }
  `;
  const contentRef = useRef<HTMLTableRowElement>(null);
  const reactToPrintFn = useReactToPrint({ contentRef, documentTitle: '', pageStyle });
  const [updateStatus] = useUpdateStatusMutation();
  const [updateDeliveryStatus] = useUpdateDeliveryStatusMutation();

  const handleStatusUpdate = (id: string) => {
    updateStatus(id)
  };
  const date = new Date(order?.createdAt);
  const formattedDate = date?.toLocaleDateString("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  });

  const handleDeliveryStatus = async (productId: string | undefined, previousStatus: string | undefined) => {
    const newStatus = previousStatus === 'pending' ? 'confirm' : 'pending'
    updateDeliveryStatus({ productId, newStatus })
  }
  return (
    <>
      <tr ref={contentRef} className="border-2 p-5 text-justify">
        <th>{index + 1}</th>
        <th><NavLink to={`/dashboard/order/branch/${order?.email}`}>{order.branchName}</NavLink></th>
        <th>{order?.address}</th>
        <th>{formattedDate}</th>
        <td>{order?.phone}</td>
        <td>
          {order?.products?.map((product: TProduct, index) =>
            <p className="my-2 py-1" key={index}>
              {index + 1}) {product.name}
            </p>
          )}
        </td>

        <td>
          <ol>
            {order?.products?.map((product: TProduct, index) => (
              <p
                key={index}
                onClick={() => handleDeliveryStatus(product?._id, product?.deliveryStatus)}
                className=" cursor-pointer hover:text-blue-600 font-medium mb-2"
                title="Click to toggle delivery status"
              >
                {product?.deliveryStatus === 'pending' ?
                  <span className="bg-red-500 flex flex-col  text-white rounded-md px-2 py-1 my-2  ">{product?.deliveryStatus}</span> :
                  <span className="bg-green-500 flex flex-col px-2 py-1 my-2  rounded-md text-white  ">{product?.deliveryStatus}</span>
                }
              </p>
            ))}
          </ol>
        </td>

        <td>
          <ol className="list-inside">
            {order?.products?.map((product: TProduct, index) =>
              <li className="my-2 py-1" key={index}>
                {index + 1}) {" "} {product.quantity}

              </li>
            )}
          </ol>
        </td>


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