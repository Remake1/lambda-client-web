import Cookies from 'js-cookie';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api/v1';

interface FetchOptions extends RequestInit {
    headers?: Record<string, string>;
}

// Inject the store later to avoid circular dependency during initialization
let store: any = null;

export const injectStore = (_store: any) => {
    store = _store;
};

export const fetchClient = async (endpoint: string, options: FetchOptions = {}) => {
    const accessToken = localStorage.getItem('access_token');

    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        ...options.headers,
    };

    if (accessToken) {
        headers['Authorization'] = `Bearer ${accessToken}`;
    }

    const config = {
        ...options,
        headers,
    };

    let response = await fetch(`${BASE_URL}${endpoint}`, config);

    if (response.status === 401) {
        // Attempt refresh
        const newAccessToken = await refreshAccessToken();
        if (newAccessToken) {
            // Retry original request with new token
            headers['Authorization'] = `Bearer ${newAccessToken}`;
            response = await fetch(`${BASE_URL}${endpoint}`, {
                ...options,
                headers,
            });
        } else {
            handleLogout();
        }
    }

    return response;
};

export const refreshAccessToken = async (): Promise<string | null> => {
    const refreshToken = Cookies.get('refresh_token');
    if (!refreshToken) return null;

    try {
        const refreshResponse = await fetch(`${BASE_URL}/auth/refresh`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ refresh_token: refreshToken }),
        });

        if (refreshResponse.ok) {
            const data = await refreshResponse.json();
            const newAccessToken = data.access_token;
            localStorage.setItem('access_token', newAccessToken);
            return newAccessToken;
        }
    } catch (error) {
        console.error('Token refresh failed:', error);
    }
    return null;
};

const handleLogout = () => {
    localStorage.removeItem('access_token');
    Cookies.remove('refresh_token');
    if (store) {
        store.dispatch({ type: 'auth/logout' });
    }
    // Redirect to login if not handled by state change
    if (window.location.pathname !== '/auth/login' && window.location.pathname !== '/auth/register') {
        window.location.href = '/auth/login';
    }
};

export interface AnalyzeRequest {
    screenshot_ids: string[];
    type: string;
    language: string;
    model: string;
}

export interface AnalyzeResponse {
    result: string;
}

export async function analyzeScreenshots(params: AnalyzeRequest): Promise<AnalyzeResponse> {
    const response = await fetchClient('/ai/analyze', {
        method: 'POST',
        body: JSON.stringify(params),
    });
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Analysis failed');
    }
    return response.json();
}

