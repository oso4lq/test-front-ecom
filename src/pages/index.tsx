import React, { useState } from 'react';
import useStore from '@/store/useStore';
import styles from '@/styles/Home.module.scss';

const Home: React.FC = () => {
    const { setName } = useStore();
    const [inputName, setInputName] = useState('');

    const handleSave = (path: string) => {
        if (inputName.trim() === '') return;
        localStorage.setItem('name', inputName);
        setName(inputName);
        setInputName('');
        window.location.href = path;
    };

    return (
        <div className={styles.container}>
            <div className={styles.close}>
                <svg>
                    {/* <use xlinkHref="/sprite.svg#icon-close"></use> */}
                    <path d="M5.58716 3.88906L9.47622 0L10.5872 1.11094L6.69809 5L10.5872 8.88906L9.47622 10L5.58716 6.11094L1.69809 10L0.587158 8.88906L4.47622 5L0.587158 1.11094L1.69809 0L5.58716 3.88906Z" fill="#4F4F4F" />
                </svg>
            </div>

            <div className={styles.form}>
                <h2>Начать</h2>
                <p>Напишите ваше имя</p>
                <input
                    type="text"
                    placeholder="Ваше имя"
                    value={inputName}
                    onChange={(e) => setInputName(e.target.value)}
                />
            </div>

            <div className={styles.buttons}>
                <button onClick={() => handleSave('/calculator')}>Открыть калькулятор</button>
                <button onClick={() => handleSave('/password-generator')}>Открыть генератор</button>
            </div>
        </div>
    );
};

export default Home;
