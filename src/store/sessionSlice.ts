import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface Message {
    type: 'user' | 'ai';
    content: any;
    timestamp: number;
}

interface SessionState {
    language: string;
    isConnected: boolean;
    hardwareStatus: 'waiting' | 'connected';
    messages: Message[];
    questionStyle: 'leetcode' | 'other';
}

const initialState: SessionState = {
    language: 'C++',
    isConnected: false,
    hardwareStatus: 'waiting',
    messages: [],
    questionStyle: 'leetcode',
};

const sessionSlice = createSlice({
    name: 'session',
    initialState,
    reducers: {
        setLanguage: (state, action: PayloadAction<string>) => {
            state.language = action.payload;
        },
        setConnectionStatus: (state, action: PayloadAction<boolean>) => {
            state.isConnected = action.payload;
        },
        setHardwareStatus: (state, action: PayloadAction<'waiting' | 'connected'>) => {
            state.hardwareStatus = action.payload;
        },
        addMessage: (state, action: PayloadAction<Message>) => {
            state.messages.push(action.payload);
        },
        setQuestionStyle: (state, action: PayloadAction<'leetcode' | 'other'>) => {
            state.questionStyle = action.payload;
        },
        restoreSession: (state, action: PayloadAction<SessionState>) => {
            return { ...state, ...action.payload };
        },
        clearSession: () => {
            return initialState;
        },
    },
});

export const {
    setLanguage,
    setConnectionStatus,
    setHardwareStatus,
    addMessage,
    setQuestionStyle,
    restoreSession,
    clearSession,
} = sessionSlice.actions;

export default sessionSlice.reducer;
