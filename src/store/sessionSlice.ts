import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { FONT_SIZE, DEFAULT_LANGUAGE, DEFAULT_MODEL } from '@/lib/constants';

export const HardwareStatus = {
    Waiting: 'waiting',
    Connected: 'connected',
} as const;

export type HardwareStatus = typeof HardwareStatus[keyof typeof HardwareStatus];

export const QuestionStyle = {
    LeetCode: 'leetcode',
    Other: 'other',
} as const;

export type QuestionStyle = typeof QuestionStyle[keyof typeof QuestionStyle];

export interface AIContent {
    type: 'image_analysis_result';
    payload: {
        ai_result: string;
        message?: string;
    };
}

export interface UserContent {
    type: QuestionStyle;
    language: string;
    screenshotCount?: number;
}

export type SessionMessageContent = AIContent | UserContent;

export interface Message {
    type: 'user' | 'ai';
    content: SessionMessageContent;
    timestamp: number;
}

export interface ScreenshotPreview {
    id: string;
    preview: string;
    timestamp: number;
}

export const MAX_SCREENSHOTS = 5;

interface SessionState {
    language: string;
    model: string;
    isConnected: boolean;
    hardwareStatus: HardwareStatus;
    messages: Message[];
    questionStyle: QuestionStyle;
    fontSize: number;
    screenshotPreviews: ScreenshotPreview[];
    isAnalyzing: boolean;
}

const initialState: SessionState = {
    language: DEFAULT_LANGUAGE,
    model: DEFAULT_MODEL,
    isConnected: false,
    hardwareStatus: HardwareStatus.Waiting,
    messages: [],
    questionStyle: QuestionStyle.LeetCode,
    fontSize: FONT_SIZE.DEFAULT,
    screenshotPreviews: [],
    isAnalyzing: false,
};

const sessionSlice = createSlice({
    name: 'session',
    initialState,
    reducers: {
        setLanguage: (state, action: PayloadAction<string>) => {
            state.language = action.payload;
        },
        setModel: (state, action: PayloadAction<string>) => {
            state.model = action.payload;
        },
        setConnectionStatus: (state, action: PayloadAction<boolean>) => {
            state.isConnected = action.payload;
        },
        setHardwareStatus: (state, action: PayloadAction<HardwareStatus>) => {
            state.hardwareStatus = action.payload;
        },
        addMessage: (state, action: PayloadAction<Message>) => {
            state.messages.push(action.payload);
        },
        setQuestionStyle: (state, action: PayloadAction<QuestionStyle>) => {
            state.questionStyle = action.payload;
        },
        restoreSession: (state, action: PayloadAction<SessionState>) => {
            return { ...state, ...action.payload };
        },
        clearSession: () => {
            return initialState;
        },
        increaseFontSize: (state) => {
            state.fontSize = Math.min(state.fontSize + FONT_SIZE.STEP, FONT_SIZE.MAX);
        },
        decreaseFontSize: (state) => {
            state.fontSize = Math.max(state.fontSize - FONT_SIZE.STEP, FONT_SIZE.MIN);
        },
        addScreenshotPreview: (state, action: PayloadAction<ScreenshotPreview>) => {
            if (state.screenshotPreviews.length < MAX_SCREENSHOTS) {
                state.screenshotPreviews.push(action.payload);
            }
        },
        removeScreenshotPreview: (state, action: PayloadAction<string>) => {
            state.screenshotPreviews = state.screenshotPreviews.filter(
                (preview) => preview.id !== action.payload
            );
        },
        clearScreenshotPreviews: (state) => {
            state.screenshotPreviews = [];
        },
        setIsAnalyzing: (state, action: PayloadAction<boolean>) => {
            state.isAnalyzing = action.payload;
        },
    },
});

export const {
    setLanguage,
    setModel,
    setConnectionStatus,
    setHardwareStatus,
    addMessage,
    setQuestionStyle,
    restoreSession,
    clearSession,
    increaseFontSize,
    decreaseFontSize,
    addScreenshotPreview,
    removeScreenshotPreview,
    clearScreenshotPreviews,
    setIsAnalyzing,
} = sessionSlice.actions;

export default sessionSlice.reducer;

