import React, { useState, useEffect } from 'react';
import Popup from '@/components/Popup';
import styles from '@/styles/Calculator.module.scss';

const Calculator: React.FC = () => {

    const [showPopup, setShowPopup] = useState(false);
    const [input, setInput] = useState('');
    const [result, setResult] = useState('');
    const [lastOperator, setLastOperator] = useState('');
    const [lastOperand, setLastOperand] = useState('');
    const [justCalculated, setJustCalculated] = useState(false);

    const handleClosePopup = () => {
        setShowPopup(false);
    };

    // Format numbers with "," and "."
    const formatNumber = (num: string) => {
        if (num === '') return '';
        const [integerPart, decimalPart] = num.split('.');
        const formattedInteger = parseFloat(integerPart).toLocaleString('en-US');
        return decimalPart ? `${formattedInteger}.${decimalPart}` : formattedInteger;
    };

    // Define operators
    const operators = ['+', '-', '*', '/'];

    // Define buttons: their action and appearance
    const buttons = [
        { value: 'C', label: 'C', className: 'gray' },
        {
            value: 'SIGNUM',
            label: (
                <svg>
                    <path fillRule="evenodd" clipRule="evenodd" d="M19.3321 2.55469L19.8867 1.72264L18.2226 0.613235L17.6679 1.44529L5.66795 19.4453L5.11325 20.2773L6.77735 21.3867L7.33205 20.5547L19.3321 2.55469ZM5.5 0.999985V1.99998V3.99998H7.5H8.5V5.99998H7.5H5.5V7.99998V8.99998H3.5V7.99998V5.99998H1.5H0.5V3.99998H1.5H3.5V1.99998V0.999985H5.5ZM17.5 16H16.5V18H17.5H23.5H24.5V16H23.5H17.5Z" fill="black" />
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
                    <path fillRule="evenodd" clipRule="evenodd" d="M9.58582 1.52588e-05H10H26H27V1.00002V17V18H26H10H9.58582L9.29292 17.7071L1.29292 9.70712L0.585815 9.00002L1.29292 8.29291L9.29292 0.292908L9.58582 1.52588e-05ZM10.4142 2.00002L3.41424 9.00002L10.4142 16H25V2.00002H10.4142ZM14 4.58579L14.7071 5.2929L17 7.5858L19.2929 5.29291L20 4.5858L21.4142 6.00002L20.7071 6.70712L18.4142 9.00001L20.7071 11.2929L21.4142 12L20 13.4142L19.2929 12.7071L17 10.4142L14.7071 12.7071L14 13.4142L12.5858 12L13.2929 11.2929L15.5858 9.00001L13.2929 6.70711L12.5858 6.00001L14 4.58579Z" fill="black" />
                </svg>
            ),
            className: 'white',
        },
        { value: '=', label: '=' },
    ];

    const handleButtonClick = (value: string) => {
        let actualValue = value;

        // Translate symbols into actual operators
        if (value === '÷') {
            actualValue = '/';
        } else if (value === '×') {
            actualValue = '*';
        } else if (value === '–') {
            actualValue = '-';
        }

        if (value === 'C') {
            // Clear input, result, and reset calculation state
            setInput('');
            setResult('');
            setJustCalculated(false);
            setLastOperator('');
            setLastOperand('');

        } else if (value === 'SIGNUM') {
            // Toggle +/- sign for the result or the last number in the input
            if (justCalculated) {
                // Case when there is a result of a previous calculation:
                // Start new calculation with negate(result)
                if (result === '0') {
                    return; // Zero can't be negative
                }

                if (result.startsWith('-')) {
                    setInput(result.substring(1));
                } else {
                    setInput('-' + result);
                }

                setResult(Math.abs(parseFloat(result)).toString());
                setJustCalculated(false);
            } else {
                // Case when there is no complete calculation:
                // Apply negate(number) to the last number in the input
                const lastNumberMatch = input.match(/(.*?)(-?\d*\.?\d+)(?!.*\d)/);
                if (lastNumberMatch) {
                    const beforeNumber = lastNumberMatch[1];
                    let number = lastNumberMatch[2];

                    if (number === '0') {
                        return; // Zero can't be negative
                    }

                    // Toggle +/- for the last number in the input
                    if (number.startsWith('-')) {
                        number = number.substring(1);
                    } else {
                        number = '-' + number;
                    }

                    // Reconstruct the input with spaces
                    const newInput = `${beforeNumber}${number}`;
                    setInput(newInput);
                }
            }
            setJustCalculated(false);

        } else if (value === '%') {
            // Percentage
            if (input) {
                try {
                    const sanitizedInput = input.replace(/÷/g, '/').replace(/×/g, '*');
                    const evalResult = eval(sanitizedInput);
                    setInput((evalResult / 100).toString());
                } catch (error) {
                    setResult('Error');
                }
            }
            setJustCalculated(false);

        } else if (value === '.') {
            // Handle decimal point inputs
            if (justCalculated) {
                // Start new calculation after '='
                setInput('.');
                setResult('');
                setJustCalculated(false);
            } else {
                const lastNumber = input.split(/[\+\-\*\/]/).pop();
                if (lastNumber && lastNumber.includes('.')) {
                    return; // Ignore additional dots in the same number
                } else {
                    setInput((prev) => prev + '.');
                }
            }

        } else if (value === 'BACKSPACE') {
            // Remove the last character
            setInput(input.slice(0, -1));
            setJustCalculated(false);

        } else if (operators.includes(actualValue)) {
            // Handle operator inputs
            if (justCalculated) {
                // Start new operation with the result after '='. [Example input: 1+5=+2 -> 6+2]
                setInput(result + actualValue);
                setJustCalculated(false);
            } else if (input === '') {
                // If input is empty, fill it with '0' and append the operator. [Example input: +5 -> 0+5]
                setInput('0' + actualValue);
            } else if (input.slice(-1) === '.') {
                // If input ends with '.', append '0' and the operator. [Example input: .+5 -> 0.0+5]
                setInput(input + '0' + actualValue);
            } else if (operators.includes(input.slice(-1))) {
                // If input already has an operator, replace it with the new one. [Example input: 1-*+5 -> 1+5]
                setInput(input.slice(0, -1) + actualValue);
            } else {
                // Default: append operator to input. [Example input: 1+5 -> 1+5]
                setInput(input + actualValue);
            }

        } else if (value === '=') {
            // Handle calculation
            try {
                let tempInput;

                if (justCalculated && lastOperator && lastOperand) {
                    // Repeat last operation with result. [Example input: 2+3== -> 2+3+3=8]
                    tempInput = result + lastOperator + lastOperand;
                } else {
                    // Remove trailing operator if present. [Example input: 2+5+= -> 2+5=7]
                    tempInput = input;
                    if (operators.includes(tempInput.slice(-1))) {
                        tempInput = tempInput.slice(0, -1);
                    }
                }

                const sanitizedInput = tempInput.replace(/÷/g, '/').replace(/×/g, '*');
                // Replace any standalone '.' with '0' for evaluation
                const evalInput = sanitizedInput.replace(
                    /(^|[\+\-\*\/])\.(?=[\+\-\*\/]|$)/g,
                    '$10'
                );
                const finalEvalInput = evalInput || '0';
                const evalResult = eval(finalEvalInput);
                setResult(formatNumber(evalResult.toString()));

                // Append '=' to input to indicate calculation completion
                setInput(tempInput + '=');

                // Parse last operation for potential repeat
                const lastOp = parseLastOperation(tempInput);
                if (lastOp) {
                    setLastOperator(lastOp.operator);
                    setLastOperand(lastOp.operand);
                } else {
                    setLastOperator('');
                    setLastOperand('');
                }
                setJustCalculated(true);
            } catch (error) {
                setResult('Error');
            }

        } else {
            // Handle number inputs
            if (justCalculated) {
                // Start new calculation after '='. [Example input: 2+3=1+ -> 1+]
                setInput(actualValue);
                setResult('');
                setJustCalculated(false);
            } else {
                setInput((prev) => prev + actualValue);
            }
        }
    };

    // Parse the last operation from the input
    const parseLastOperation = (expr: string) => {
        const match = expr.match(/([\+\-\*\/])([^\+\-\*\/]+)$/);
        if (match) {
            return {
                operator: match[1],
                operand: match[2],
            };
        }
        return null;
    };

    // Auto-calculate result as user types
    useEffect(() => {
        if (input === '' || input.endsWith('=')) {
            // Do not evaluate if input is empty or ends with '='
            return;
        }
        // Remove trailing operator for evaluation
        let tempInput = input;
        if (operators.includes(tempInput.slice(-1))) {
            tempInput = tempInput.slice(0, -1);
        }
        try {
            const sanitizedInput = tempInput.replace(/÷/g, '/').replace(/×/g, '*');
            const evalInput = sanitizedInput.replace(/(^|[\+\-\*\/])\.(?=[\+\-\*\/]|$)/g, '$10');
            const finalEvalInput = evalInput || '0';
            const evalResult = eval(finalEvalInput);
            setResult(formatNumber(evalResult.toString()));
        } catch (error) {
            setResult('');
        }
    }, [input]);

    // Event listener to catch keyboard events
    const handleKeyPress = (e: KeyboardEvent) => {
        const allowedKeys = '0123456789+-*/().';
        if (allowedKeys.includes(e.key) || e.key === 'Enter' || e.key === 'Backspace' || e.key === 'Escape') {
            if (e.key === 'Enter') {
                handleButtonClick('=');
            } else if (e.key === 'Backspace') {
                handleButtonClick('BACKSPACE');
            } else if (e.key === 'Escape') {
                handleButtonClick('C');
            } else {
                handleButtonClick(e.key);
            }
        }
    };

    useEffect(() => {
        window.addEventListener('keydown', handleKeyPress as any);
        return () => {
            window.removeEventListener('keydown', handleKeyPress as any);
        };
    }, [input]);

    // Replace '/' with '÷' and '*' with '×' in the displayed input
    const displayInput = input.replace(/\//g, '÷').replace(/\*/g, '×');

    return (
        <div className={styles.container}>

            {showPopup && <Popup onClose={handleClosePopup} />}

            <input
                className={styles.input}
                type="text"
                value={displayInput}
                readOnly
                placeholder="0"
            />

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