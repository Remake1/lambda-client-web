import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import { fetchClient } from '../lib/api';
import Cookies from 'js-cookie';

interface User {
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
            return await response.json();
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
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
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
