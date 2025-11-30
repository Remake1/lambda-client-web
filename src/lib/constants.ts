export const FONT_SIZE = {
    MIN: 12,
    MAX: 24,
    STEP: 2,
    DEFAULT: 14,
};

export const DEFAULT_LANGUAGE = 'C++';

export const AI_MODELS = {
    GEMINI_2_5_PRO: 'gemini-2.5-pro',
    GEMINI_2_5_FLASH: 'gemini-2.5-flash',
    GEMINI_2_5_FLASH_LITE: 'gemini-2.5-flash-lite',
} as const;

export const DEFAULT_MODEL = AI_MODELS.GEMINI_2_5_FLASH;
