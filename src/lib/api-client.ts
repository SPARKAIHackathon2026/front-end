/**
 * API 客户端配置
 * 统一管理后端 API 的基础 URL 和请求方法
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3001";

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  [key: string]: any;
}

/**
 * 通用 API 请求函数
 */
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  try {
    const url = `${API_BASE_URL}${endpoint}`;
    const response = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || `HTTP error! status: ${response.status}`);
    }

    return data;
  } catch (error) {
    console.error(`API request failed: ${endpoint}`, error);
    throw error;
  }
}

/**
 * GET 请求
 */
export async function apiGet<T>(endpoint: string): Promise<ApiResponse<T>> {
  return apiRequest<T>(endpoint, { method: "GET" });
}

/**
 * POST 请求
 */
export async function apiPost<T>(
  endpoint: string,
  body?: any
): Promise<ApiResponse<T>> {
  return apiRequest<T>(endpoint, {
    method: "POST",
    body: body ? JSON.stringify(body) : undefined,
  });
}

/**
 * API 端点定义
 */
export const API_ENDPOINTS = {
  // Wallet
  WALLET_BIND: "/api/wallet/bind",
  
  // Transactions
  GET_TRANSACTIONS: (userAddress: string) => `/api/transactions/${userAddress}`,
  
  // Tax Profile
  GET_TAX_PROFILE: (userAddress: string) => `/api/tax/profile/${userAddress}`,
  SAVE_TAX_PROFILE: "/api/tax/profile",
  
  // Tax Analysis
  ANALYZE_TAX: "/api/tax/analyze",
  COMPARE_STRATEGIES: "/api/tax/compare-strategies",
  
  // Tax Settlement
  SETTLE_TAX: "/api/tax/settle",
} as const;
