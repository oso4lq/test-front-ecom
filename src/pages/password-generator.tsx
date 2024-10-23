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

            <div className={styles.settings}>
                <h1>Генератор паролей</h1>

                <div className={styles.form}>
                    <label className={styles.length}>
                        Длина пароля:
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
                        Использовать прописные буквы
                    </label>

                    <label>
                        <input
                            type="checkbox"
                            checked={includeLowercase}
                            onChange={(e) => setIncludeLowercase(e.target.checked)}
                        />
                        Использовать строчные буквы
                    </label>

                    <label>
                        <input
                            type="checkbox"
                            checked={includeNumbers}
                            onChange={(e) => setIncludeNumbers(e.target.checked)}
                        />
                        Использовать цифры
                    </label>

                    <label>
                        <input
                            type="checkbox"
                            checked={includeSymbols}
                            onChange={(e) => setIncludeSymbols(e.target.checked)}
                        />
                        Использовать символы: %, *, ), ?, @, #, $, ~
                    </label>

                    <label>
                        <input
                            type="checkbox"
                            checked={noRepeat}
                            onChange={(e) => setNoRepeat(e.target.checked)}
                        />
                        Избегать повторения символов
                    </label>

                    <button onClick={generatePassword}>Сгенерировать пароль</button>
                </div>
            </div>

            <div className={styles.result}>
                <h2>Пароли:</h2>
                <ul>
                    {passwords.map((pwd, index) => (
                        <li key={index}>
                            <span>{pwd}</span>
                            <button onClick={() => copyToClipboard(pwd)}>
                                <svg>
                                    <use xlinkHref="/sprite.svg#icon-copy"></use>
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
