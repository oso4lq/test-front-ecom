import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Calculator from '@/pages/calculator';

describe('Calculator Component', () => {
    beforeEach(() => {
        render(<Calculator />);
    });

    const clickButton = (labelOrElement: string | HTMLElement) => {
        let button: HTMLElement;
        if (typeof labelOrElement === 'string') {
            button = screen.getByText(labelOrElement, { selector: 'button' });
        } else {
            button = labelOrElement;
        }
        fireEvent.click(button);
    };

    test('3 performs multiplication correctly', () => {
        clickButton('4');
        clickButton('×');
        clickButton('3');
        clickButton('=');

        expect(screen.getByDisplayValue('4×3=')).toBeInTheDocument();
        expect(screen.getByText('12')).toBeInTheDocument();
    });

    test('5 handles operator precedence', () => {
        clickButton('2');
        clickButton('+');
        clickButton('3');
        clickButton('×');
        clickButton('4');
        clickButton('=');

        expect(screen.getByDisplayValue('2+3×4=')).toBeInTheDocument();
        expect(screen.getByText('14')).toBeInTheDocument();
    });

});
