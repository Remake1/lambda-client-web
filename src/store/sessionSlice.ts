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
    fontSize: number;
}

const initialState: SessionState = {
    language: 'C++',
    isConnected: false,
    hardwareStatus: 'waiting',
    messages: [],
    questionStyle: 'leetcode',
    fontSize: 14,
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
        increaseFontSize: (state) => {
            state.fontSize = Math.min(state.fontSize + 2, 24);
        },
        decreaseFontSize: (state) => {
            state.fontSize = Math.max(state.fontSize - 2, 12);
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
    increaseFontSize,
    decreaseFontSize,
} = sessionSlice.actions;

export default sessionSlice.reducer;
