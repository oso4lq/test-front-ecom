import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import useStore from '@/store/useStore';
import Popup from '@/components/Popup';
import styles from './Layout.module.scss';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { name, firstLetter, setName } = useStore();
  const [showPopup, setShowPopup] = useState(false);

  // Retrieve name from localStorage on initial load
  useEffect(() => {
    const storedName = localStorage.getItem('name');
    if (storedName) {
      setName(storedName);
    }
  }, [setName]);

  // Handle opening the popup
  const handleOpenPopup = () => {
    setShowPopup(true);
  };

  // Handle closing the popup
  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className={styles.container}>
      {name && (
        <header className={styles.header}>
          <nav>
            <Link href="/">Название</Link>
            <Link href="/">Главная</Link>
            {/* <Link href="/password-generator">Генератор паролей</Link> */}
            <Link href="/calculator">Калькулятор</Link>
          </nav>
          <div className={styles.name}>
            <span>{name}</span>
            <div className={styles.firstLetter} onClick={handleOpenPopup}>
              {firstLetter}
            </div>
          </div>
        </header>
      )}
      <main className={styles.main}>{children}</main>
      {showPopup && <Popup onClose={handleClosePopup} />}
    </div>
  );
};

export default Layout;
