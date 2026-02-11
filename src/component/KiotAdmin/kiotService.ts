// ==================== KiotViet API Service ====================
// Tất cả các API calls đều thông qua Google Apps Script

import type {
    KiotCustomer,
    KiotOrder,
    KiotDebt,
    KiotStats,
    PaginatedResponse,
    SetupPayload,
    SyncResult,
    NewEventsResponse,
} from './types';

// URL Google Apps Script Web App - SẼ ĐƯỢC CẤU HÌNH SAU
const STORAGE_KEY = 'kiot_apps_script_url';
const SESSION_KEY = 'kiot_admin_session';

export function getAppsScriptUrl(): string {
    return localStorage.getItem(STORAGE_KEY) || '';
}

export function setAppsScriptUrl(url: string): void {
    localStorage.setItem(STORAGE_KEY, url);
}

export function isSessionActive(): boolean {
    const session = sessionStorage.getItem(SESSION_KEY);
    if (!session) return false;
    try {
        const data = JSON.parse(session);
        return data.active === true;
    } catch {
        return session === 'active'; // support legacy
    }
}

export function setSessionActive(retailerName: string): void {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify({ active: true, retailer: retailerName }));
    window.dispatchEvent(new Event('kiot_session_changed'));
}

export function clearSession(): void {
    sessionStorage.removeItem(SESSION_KEY);
    window.dispatchEvent(new Event('kiot_session_changed'));
}

// ==================== API Helpers ====================

async function apiGet<T>(action: string, params: Record<string, string> = {}): Promise<T> {
    const baseUrl = getAppsScriptUrl();
    if (!baseUrl) throw new Error('Chưa cấu hình URL Google Apps Script');

    const searchParams = new URLSearchParams({ action, ...params });
    const url = `${baseUrl}?${searchParams.toString()}`;

    const response = await fetch(url, {
        method: 'GET',
        redirect: 'follow',
    });

    if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
    }

    return response.json();
}

async function apiPost<T>(body: Record<string, unknown>): Promise<T> {
    const baseUrl = getAppsScriptUrl();
    if (!baseUrl) throw new Error('Chưa cấu hình URL Google Apps Script');

    const response = await fetch(baseUrl, {
        method: 'POST',
        redirect: 'follow',
        headers: {
            'Content-Type': 'text/plain;charset=utf-8',
        },
        body: JSON.stringify(body),
    });

    if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
    }

    return response.json();
}

// ==================== Auth & Setup ====================

export async function login(password: string): Promise<{ success: boolean; message?: string; error?: string }> {
    return apiGet('login', { password });
}

export async function resetConfig(password: string): Promise<{ success: boolean; message?: string; error?: string }> {
    return apiPost({ action: 'reset_config', password });
}

export async function checkSetup(): Promise<{
    success: boolean;
    isConfigured: boolean;
    retailerName: string;
}> {
    return apiGet('check_setup');
}

export async function setupKiotViet(payload: Omit<SetupPayload, 'action'>): Promise<{
    success: boolean;
    message?: string;
    error?: string;
}> {
    return apiPost({ action: 'setup', ...payload });
}

// ==================== Sync ====================

export async function fullSync(): Promise<SyncResult> {
    return apiPost({ action: 'full_sync' });
}

export async function incrementalSync(): Promise<SyncResult> {
    return apiPost({ action: 'incremental_sync' });
}

// ==================== Data Retrieval ====================

export async function getCustomers(
    page: number = 1,
    pageSize: number = 20
): Promise<PaginatedResponse<KiotCustomer>> {
    return apiGet('get_customers', {
        page: String(page),
        pageSize: String(pageSize),
    });
}

export async function getOrders(
    page: number = 1,
    pageSize: number = 20,
    customerId?: string,
    fromDate?: string,
    toDate?: string,
    status?: string,
    search?: string
): Promise<PaginatedResponse<KiotOrder>> {
    const params: Record<string, string> = {
        page: String(page),
        pageSize: String(pageSize),
    };
    if (customerId) params.customerId = customerId;
    if (fromDate) params.fromDate = fromDate;
    if (toDate) params.toDate = toDate;
    if (status) params.status = status;
    if (search) params.search = search;
    return apiGet('get_orders', params);
}

export async function getDebts(
    page: number = 1,
    pageSize: number = 20,
    search?: string
): Promise<PaginatedResponse<KiotDebt>> {
    const params: Record<string, string> = {
        page: String(page),
        pageSize: String(pageSize),
    };
    if (search) params.search = search;
    return apiGet('get_debts', params);
}

export async function searchCustomer(query: string): Promise<{
    success: boolean;
    data: KiotCustomer[];
    total: number;
    error?: string;
}> {
    return apiGet('search_customer', { query });
}

export async function getStats(): Promise<{
    success: boolean;
    stats: KiotStats;
}> {
    return apiGet('get_stats');
}

// ==================== Polling ====================

export async function checkNewEvents(): Promise<NewEventsResponse> {
    return apiGet('check_new_events');
}
