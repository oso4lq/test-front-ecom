import React, { useState } from 'react';
import styles from '@/styles/PasswordGenerator.module.scss';

const PasswordGenerator: React.FC = () => {
    const [passwords, setPasswords] = useState<string[]>([]);
    const [length, setLength] = useState(12);

    const [includeUppercase, setIncludeUppercase] = useState(true);
    const [includeLowercase, setIncludeLowercase] = useState(true);
    const [includeNumbers, setIncludeNumbers] = useState(false);
    const [includeSymbols, setIncludeSymbols] = useState(false);
    const [noRepeat, setNoRepeat] = useState(false);

    const generatePassword = () => {
        let chars = '';
        if (includeUppercase) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        if (includeLowercase) chars += 'abcdefghijklmnopqrstuvwxyz';
        if (includeNumbers) chars += '0123456789';
        if (includeSymbols) chars += '%*)?@#$~';

        if (chars.length === 0) {
            alert('Пожалуйста, выберите хотя бы один тип символов.');
            return;
        }

        let newRandomPassword = '';
        let charsArray = chars.split('');

        if (noRepeat) {
            if (length > charsArray.length) {
                alert('Длина превышает количество уникальных доступных символов.');
                return;
            }

            for (let i = 0; i < length; i++) {
                const randomIndex = Math.floor(Math.random() * charsArray.length);
                newRandomPassword += charsArray[randomIndex];
                charsArray.splice(randomIndex, 1);
            }
        } else {
            for (let i = 0; i < length; i++) {
                const randomIndex = Math.floor(Math.random() * charsArray.length);
                newRandomPassword += charsArray[randomIndex];
            }
        }

        setPasswords((prevPasswords) => [newRandomPassword, ...prevPasswords]);
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text).then(
            () => {
                alert('Пароль скопирован в буфер обмена!');
            },
            (err) => {
                alert('Не удалось скопировать пароль: ' + err);
            }
        );
    };

    return (
        <div className={styles.container}>

            <div className={styles.generator}>
                <h1>Генератор паролей</h1>

                <div className={styles.settings}>
                    <label className={styles.length}>
                        <span>Длина пароля:</span>
                        <input
                            type="number"
                            value={length}
                            min="4"
                            max="32"
                            onChange={(e) => setLength(Number(e.target.value))}
                        />
                    </label>

                    <label>
                        <input
                            type="checkbox"
                            checked={includeUppercase}
                            onChange={(e) => setIncludeUppercase(e.target.checked)}
                        />
                        <span>Использовать прописные буквы</span>
                    </label>

                    <label>
                        <input
                            type="checkbox"
                            checked={includeLowercase}
                            onChange={(e) => setIncludeLowercase(e.target.checked)}
                        />
                        <span>Использовать строчные буквы</span>
                    </label>

                    <label>
                        <input
                            type="checkbox"
                            checked={includeNumbers}
                            onChange={(e) => setIncludeNumbers(e.target.checked)}
                        />
                        <span>Использовать цифры</span>
                    </label>

                    <label>
                        <input
                            type="checkbox"
                            checked={includeSymbols}
                            onChange={(e) => setIncludeSymbols(e.target.checked)}
                        />
                        <span>Использовать символы: %, *, ), ?, @, #, $, ~</span>
                    </label>

                    <label>
                        <input
                            type="checkbox"
                            checked={noRepeat}
                            onChange={(e) => setNoRepeat(e.target.checked)}
                        />
                        <span>Избегать повторения символов</span>
                    </label>
                </div>

                <button className={styles.btn} onClick={generatePassword}>Сгенерировать пароль</button>
            </div>

            <div className={styles.result}>
                <ul>
                    {passwords.map((password, index) => (
                        <li key={index}>
                            <span>{password}</span>
                            <button onClick={() => copyToClipboard(password)}>
                                <svg>
                                    <path d="M21.9219 0.390015C23.1406 0.390015 24.1719 1.42126 24.1719 2.64001V16.14C24.1719 17.4056 23.1406 18.39 21.9219 18.39H8.42188C7.15625 18.39 6.17188 17.4056 6.17188 16.14V2.64001C6.17188 1.42126 7.15625 0.390015 8.42188 0.390015H21.9219ZM8.42188 19.89H18.1719V22.14C18.1719 23.4056 17.1406 24.39 15.9219 24.39H2.42188C1.15625 24.39 0.171875 23.4056 0.171875 22.14V8.64001C0.171875 7.42126 1.15625 6.39001 2.42188 6.39001H4.67188V16.14C4.67188 18.2494 6.3125 19.89 8.42188 19.89Z" fill="#3B75A2" />
                                </svg>
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default PasswordGenerator;
