// jest.setup.js

import '@testing-library/jest-dom';

// Mock localStorage
beforeEach(() => {
    const localStorageMock = (() => {
        let store: any = {};
        return {
            getItem: (key: any) => store[key] || null,
            setItem: (key: any, value: any) => {
                store[key] = value.toString();
            },
            removeItem: (key: any) => {
                delete store[key];
            },
            clear: () => {
                store = {};
            },
        };
    })();
    Object.defineProperty(window, 'localStorage', {
        value: localStorageMock,
    });
});

// Mock window.alert
jest.spyOn(window, 'alert').mockImplementation(() => { });
