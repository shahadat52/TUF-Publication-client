import { useReactToPrint } from "react-to-print";
import { useRef } from "react";
const CartInvoice = () => {
    const contentRef = useRef<HTMLDivElement>(null);
    const reactToPrintFn = useReactToPrint({ contentRef });
    return (
        <div>
            <button onClick={() => reactToPrintFn()}>Print</button>
            <div ref={contentRef}>
                <h1 className="text-xl font-bold">Invoice</h1>
                <p>Order ID: 12345</p>
                <p>Date: 2025-01-24</p>
                <p>Customer Name: Parvez Hossain</p>
                <p>Total: $200</p>
                <p>Everything is ready to print</p>
            </div>
        </div>
    );
};

export default CartInvoice;