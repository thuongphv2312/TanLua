// ==================== KiotViet Admin Types ====================

export interface KiotCustomer {
    id: string | number;
    code: string;
    name: string;
    contactNumber: string;
    email: string;
    address: string;
    ward: string;
    district: string;
    city: string;
    organization: string;
    group: string;
    debt: number;
    totalRevenue: number;
    totalPoint: number;
    createdDate: string;
    modifiedDate: string;
    isNew: string;
}

export interface KiotOrder {
    orderId: string | number;
    code: string;
    customerId: string | number;
    customerName: string;
    phone: string;
    products: string;
    totalAmount: number;
    discount: number;
    status: string;
    statusValue: string;
    purchaseDate: string;
    modifiedDate: string;
}

export interface KiotDebt {
    customerId: string | number;
    customerName: string;
    phone: string;
    totalDebt: number;
    totalPaid: number;
    remaining: number;
    lastTransactionDate: string;
    note: string;
}

export interface KiotStats {
    totalCustomers: number;
    totalOrders: number;
    totalDebts: number;
    totalDebtAmount: number;
    totalRevenue: number;
    lastSyncTime: string;
    retailerName: string;
}

export interface PaginatedResponse<T> {
    success: boolean;
    data: T[];
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
    error?: string;
}

export interface SetupPayload {
    action: 'setup';
    clientId: string;
    clientSecret: string;
    retailerName: string;
}

export interface SyncResult {
    success: boolean;
    message?: string;
    customers?: number;
    orders?: number;
    newCustomers?: number;
    updatedCustomers?: number;
    newOrders?: number;
    syncTime?: string;
    error?: string;
}

export interface NewEventsResponse {
    success: boolean;
    newEvents: number;
    lastSyncTime: string;
    totalCustomers: number;
}

export type AdminTab = 'customers' | 'orders' | 'debts';
