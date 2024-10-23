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
                    {/* <use xlinkHref="/sprite.svg#icon-signum"></use> */}
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M19.3321 2.55469L19.8867 1.72264L18.2226 0.613235L17.6679 1.44529L5.66795 19.4453L5.11325 20.2773L6.77735 21.3867L7.33205 20.5547L19.3321 2.55469ZM5.5 0.999985V1.99998V3.99998H7.5H8.5V5.99998H7.5H5.5V7.99998V8.99998H3.5V7.99998V5.99998H1.5H0.5V3.99998H1.5H3.5V1.99998V0.999985H5.5ZM17.5 16H16.5V18H17.5H23.5H24.5V16H23.5H17.5Z" fill="black" />
                </svg>
            ),
            className: 'gray',
        },
        { value: '%', label: '%', className: 'gray' },
        { value: '/', label: '÷' },
        { value: '7', label: '7', className: 'white' },
        { value: '8', label: '8', className: 'white' },
        { value: '9', label: '9', className: 'white' },
        { value: '*', label: '×' },
        { value: '4', label: '4', className: 'white' },
        { value: '5', label: '5', className: 'white' },
        { value: '6', label: '6', className: 'white' },
        { value: '-', label: '–' },
        { value: '1', label: '1', className: 'white' },
        { value: '2', label: '2', className: 'white' },
        { value: '3', label: '3', className: 'white' },
        { value: '+', label: '+' },
        { value: '.', label: '.', className: 'white' },
        { value: '0', label: '0', className: 'white' },
        {
            value: 'BACKSPACE',
            label: (
                <svg>
                    {/* <use xlinkHref="/sprite.svg#icon-backspace"></use> */}
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M9.58582 1.52588e-05H10H26H27V1.00002V17V18H26H10H9.58582L9.29292 17.7071L1.29292 9.70712L0.585815 9.00002L1.29292 8.29291L9.29292 0.292908L9.58582 1.52588e-05ZM10.4142 2.00002L3.41424 9.00002L10.4142 16H25V2.00002H10.4142ZM14 4.58579L14.7071 5.2929L17 7.5858L19.2929 5.29291L20 4.5858L21.4142 6.00002L20.7071 6.70712L18.4142 9.00001L20.7071 11.2929L21.4142 12L20 13.4142L19.2929 12.7071L17 10.4142L14.7071 12.7071L14 13.4142L12.5858 12L13.2929 11.2929L15.5858 9.00001L13.2929 6.70711L12.5858 6.00001L14 4.58579Z" fill="black" />
                </svg>
            ),
            className: 'white',
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
