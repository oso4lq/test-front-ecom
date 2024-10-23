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
                    <use xlinkHref="/sprite.svg#icon-close"></use>
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
