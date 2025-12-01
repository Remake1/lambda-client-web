import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import sessionReducer from '@/store/sessionSlice';
import ModelSelector from './ModelSelector';
import { AI_MODELS } from '@/lib/constants';
import { describe, it, expect } from 'vitest';

const createTestStore = () => configureStore({
    reducer: {
        session: sessionReducer,
    },
});

describe('ModelSelector', () => {
    it('renders correctly with default model', () => {
        const store = createTestStore();
        render(
            <Provider store={store}>
                <ModelSelector />
            </Provider>
        );

        expect(screen.getByText('Model:')).toBeInTheDocument();
        // The Select component from shadcn might be tricky to test directly by text if it's not open
        // But the trigger should display the value.
        // Based on default state: DEFAULT_MODEL is GEMINI_2_5_FLASH
        expect(screen.getByText('Gemini 2.5 Flash')).toBeInTheDocument();
    });

    it('changes model when a new one is selected', async () => {
        const store = createTestStore();
        render(
            <Provider store={store}>
                <ModelSelector />
            </Provider>
        );

        // Open the select
        const trigger = screen.getByRole('combobox');
        fireEvent.click(trigger);

        // Select a different model
        const option = await screen.findByText('Gemini 2.5 Pro');
        fireEvent.click(option);

        // Check if the store is updated (or UI reflects change)
        expect(store.getState().session.model).toBe(AI_MODELS.GEMINI_2_5_PRO);
        expect(screen.getByText('Gemini 2.5 Pro')).toBeInTheDocument();
    });

    it('verifies MSW is working', async () => {
        const response = await fetch('https://api.example.com/user');
        const data = await response.json();
        expect(data).toEqual({
            id: 'c7b3d8e0-5e0b-4b0f-8b3a-3b9f4b3d3b3d',
            firstName: 'John',
            lastName: 'Maverick',
        });
    });
});
