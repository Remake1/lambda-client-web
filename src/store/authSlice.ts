import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import { fetchClient } from '../lib/api';
import Cookies from 'js-cookie';

interface User {
    id?: string;
    username: string;
    email: string;
}

interface AuthState {
    user: User | null;
    accessToken: string | null;
    isAuthenticated: boolean;
    loading: boolean;
    error: string | null;
}

const initialState: AuthState = {
    user: null,
    accessToken: localStorage.getItem('access_token'),
    isAuthenticated: !!localStorage.getItem('access_token'),
    loading: false,
    error: null,
};

function parseJwt(token: string) {
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        return JSON.parse(jsonPayload);
    } catch (e) {
        return null;
    }
}

export const loginUser = createAsyncThunk(
    'auth/login',
    async (payload: any, { rejectWithValue }) => {
        try {
            const response = await fetchClient('/auth/login', {
                method: 'POST',
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                const errorData = await response.json();
                return rejectWithValue(errorData.message || 'Login failed');
            }

            const data = await response.json();
            return data;
        } catch (error: any) {
            return rejectWithValue(error.message || 'Login failed');
        }
    }
);

export const registerUser = createAsyncThunk(
    'auth/register',
    async (payload: any, { rejectWithValue }) => {
        try {
            const response = await fetchClient('/auth/register', {
                method: 'POST',
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                const errorData = await response.json();
                return rejectWithValue(errorData.message || 'Registration failed');
            }

            const data = await response.json();
            return data;
        } catch (error: any) {
            return rejectWithValue(error.message || 'Registration failed');
        }
    }
);

export const fetchUserProfile = createAsyncThunk(
    'auth/me',
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetchClient('/auth/me');
            if (!response.ok) {
                return rejectWithValue('Failed to fetch user profile');
            }
            const user = await response.json();

            // Extract ID from token if available
            const token = localStorage.getItem('access_token');
            if (token) {
                const decoded = parseJwt(token);
                if (decoded && decoded.sub) {
                    user.id = decoded.sub;
                }
            }

            return user;
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

export const refreshSession = createAsyncThunk(
    'auth/refreshSession',
    async (_, { rejectWithValue }) => {
        const { refreshAccessToken } = await import('../lib/api');
        const token = await refreshAccessToken();
        if (!token) {
            return rejectWithValue('Session refresh failed');
        }
        return token;
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.accessToken = null;
            state.isAuthenticated = false;
            state.error = null;
            localStorage.removeItem('access_token');
            Cookies.remove('refresh_token');
        },
    },
    extraReducers: (builder) => {
        // Login
        builder.addCase(loginUser.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(loginUser.fulfilled, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.accessToken = action.payload.access_token;
            state.isAuthenticated = true;
            localStorage.setItem('access_token', action.payload.access_token);
            if (action.payload.refresh_token) {
                Cookies.set('refresh_token', action.payload.refresh_token, { expires: 2 });
            }
        });
        builder.addCase(loginUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });

        // Register
        builder.addCase(registerUser.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(registerUser.fulfilled, (state) => {
            state.loading = false;
            // Registration doesn't auto-login
        });
        builder.addCase(registerUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });

        // Fetch Profile
        builder.addCase(fetchUserProfile.fulfilled, (state, action: PayloadAction<User>) => {
            state.user = action.payload;
        });
        builder.addCase(fetchUserProfile.rejected, (state) => {
            // api client handles 401 logout
            // clear user data if needed.
            state.user = null;
        });

        // Refresh Session
        builder.addCase(refreshSession.fulfilled, (state, action: PayloadAction<string>) => {
            state.accessToken = action.payload;
            state.isAuthenticated = true;
        });
        builder.addCase(refreshSession.rejected, (state) => {
            state.accessToken = null;
            state.isAuthenticated = false;
            state.user = null;
        });
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
