/* eslint-disable @typescript-eslint/no-explicit-any */
import { toast } from "react-toastify";
import { useOrderPlaceMutation } from "../../redux/features/order/orderApi";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import CartTable from "./CartTable";
import { TRES } from "../../interface/apiResponse";
import { useNavigate } from "react-router";
import { cartEmpty } from "../../redux/features/cart/cartSlice";
import Loading from "../../components/Loading";
import { useState } from "react";



const CartPage = () => {
    const [isLoading, setIsLoading] = useState(false)
    const user = useAppSelector(state => state.auth.auth.user) as any
    const [orderPlace] = useOrderPlaceMutation();
    const products = useAppSelector(state => state.auth.cart.products)
    const dispatch = useAppDispatch()
    const totalPrice = products.reduce((sum, product) => sum + Number(product?.total), 0);
    const navigate = useNavigate()

    console.log(user);


    const handleOrderPlace = async () => {
        setIsLoading(true)
        const orderData = {
            branchName: user?.branch,
            address: user?.address,
            phone: user?.phone,
            products,
            totalPrice: totalPrice

        }
        const res = await orderPlace(orderData) as unknown as TRES
        console.log(res);
        if (res?.data) {
            toast.success('Order successfully placed', {
                autoClose: 2000
            })
            setIsLoading(false)
            dispatch(cartEmpty())
            navigate('/')

        }
        if (res?.error) {
            setIsLoading(false)
            toast.error(`${res?.error?.data?.message}`)
        }
        console.log(res);
    }
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3">
            <div className="col-span-1 lg:col-span-2 ">
                <CartTable totalPrice={totalPrice} />
            </div>

            <div className=" flex flex-col justify-center w-full">
                <label className="text-2xl font-semibold ">Branch name</label>
                <p className="text-xl">{user?.branch}</p> <hr /> <hr />
                {
                    isLoading ? <Loading /> : <div
                        onClick={handleOrderPlace}
                        className="">
                        <button className=" btn btn-primary mt-10  text-semibold text-xl "><span>ORDER NOW</span></button>
                    </div>
                }
            </div>

        </div>
    );
};

export default CartPage;