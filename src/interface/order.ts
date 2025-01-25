export type TOrder = {
    _id: string;
    branchName: string;
    address: number;
    products: [];
    status: 'pending' | 'approved' | 'courier';
    totalPrice: number;
    phone: string;


}