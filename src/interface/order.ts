export type TOrder = {
    _id: string;
    invoice?: number;
    branchName: string;
    email: string;
    address: number;
    products: [];
    status: 'pending' | 'approved' | 'courier';
    totalPrice: number;
    phone: string;
    createdAt: Date


}