import React, { useState, useEffect } from 'react';
import styles from '@/styles/Calculator.module.scss';

const Calculator: React.FC = () => {
    const [input, setInput] = useState('');
    const [result, setResult] = useState('');

    const buttons = [
        { value: 'C', label: 'C', className: 'gray' },
        {
            value: 'SIGNUM',
            label: (
                <svg>
                    <use xlinkHref="/sprite.svg#icon-signum"></use>
                </svg>
            ),
            className: 'gray',
        },
        { value: '%', label: '%', className: 'gray' },
        { value: '/', label: '÷' },
        { value: '7', label: '7' },
        { value: '8', label: '8' },
        { value: '9', label: '9' },
        { value: '*', label: '×' },
        { value: '4', label: '4' },
        { value: '5', label: '5' },
        { value: '6', label: '6' },
        { value: '-', label: '–' },
        { value: '1', label: '1' },
        { value: '2', label: '2' },
        { value: '3', label: '3' },
        { value: '+', label: '+' },
        { value: '.', label: '.' },
        { value: '0', label: '0' },
        {
            value: 'BACKSPACE',
            label: (
                <svg>
                    <use xlinkHref="/sprite.svg#icon-backspace"></use>
                </svg>
            ),
        },
        { value: '=', label: '=' },
    ];

    const handleButtonClick = (value: string) => {
        let actualValue = value;

        if (value === '÷') {
            actualValue = '/';
        } else if (value === '×') {
            actualValue = '*';
        } else if (value === '–') {
            actualValue = '-';
        }

        if (value === 'C') {
            setInput('');
            setResult('');
        } else if (value === '=') {
            try {
                // eslint-disable-next-line no-eval
                const evalResult = eval(input);
                setResult(evalResult.toString());
            } catch (error) {
                setResult('Error');
            }
        } else if (value === 'SIGNUM') {
            if (input) {
                if (input.charAt(0) === '-') {
                    setInput(input.substring(1));
                } else {
                    setInput('-' + input);
                }
            }
        } else if (value === '%') {
            if (input) {
                setInput((parseFloat(input) / 100).toString());
            }
        } else if (value === 'BACKSPACE') {
            setInput(input.slice(0, -1));
        } else {
            setInput((prev) => prev + actualValue);
        }
    };

    const handleKeyPress = (e: KeyboardEvent) => {
        const allowedKeys = '0123456789+-*/().';
        if (allowedKeys.includes(e.key) || e.key === 'Enter' || e.key === 'Backspace') {
            if (e.key === 'Enter') {
                handleButtonClick('=');
            } else if (e.key === 'Backspace') {
                handleButtonClick('BACKSPACE');
            } else {
                setInput((prev) => prev + e.key);
            }
        }
    };

    useEffect(() => {
        window.addEventListener('keydown', handleKeyPress);
        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, [input]);

    return (
        <div className={styles.container}>

            <input className={styles.input} type="text" value={input} readOnly placeholder="0" />

            <div className={styles.result}>{result}</div>

            <div className={styles.buttons}>
                {buttons.map((btn, index) => (
                    <button
                        key={index}
                        className={btn.className}
                        onClick={() => handleButtonClick(btn.value)}
                    >
                        {btn.label}
                    </button>
                ))}
            </div>

        </div>
    );
};

export default Calculator;
