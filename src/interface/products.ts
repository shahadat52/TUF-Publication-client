/* eslint-disable @typescript-eslint/no-explicit-any */


type TPro = {
    name: string;
    quantity: number;
    category: string
}


export type TProduct = {
    _id?: string
    productId: string
    name: string;
    category: string;
    price: number;
    total?: number;
    quantity?: string
    branchName?: string
    invoice?: string
    products?: TPro
    totalPrice?: number;
}

