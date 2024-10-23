import React from 'react';
import Link from 'next/link';
import useStore from '@/store/useStore';
import styles from './Layout.module.scss';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const name = useStore((state) => state.name);
  const firstLetter = useStore((state) => state.firstLetter);

  return (
    <div className={styles.container}>
      {/* {name && ( */}
      <header className={styles.header}>
        <nav>
          <Link href="/">Название</Link>
          <Link href="/">Главная</Link>
          <Link href="/password-generator">Генератор паролей</Link>
          <Link href="/calculator">Калькулятор</Link>
        </nav>
        <div className={styles.name}>
          {name}
          <div className={styles.firstLetter}>{firstLetter}</div>
        </div>
      </header>
      {/* )} */}
      <main className={styles.main}>{children}</main>
    </div>
  );
};

export default Layout;
