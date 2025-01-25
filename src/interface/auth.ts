export type TAuth = {
    auth: {
        token: string | null;
        user: {
            email: string
            name: string;
            phone: string
            role: 'admin' | 'superAdmin' | 'customer'
        } | null
    }
}