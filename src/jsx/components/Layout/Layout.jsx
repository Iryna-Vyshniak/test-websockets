import { Suspense } from 'react';

import { Outlet } from 'react-router-dom';

import Container from '../Container/Container';
import Header from '../Header/Header';
import styles from './Layout.module.scss';

const Layout = () => {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <Container>
          <Suspense fallback={<h3>Loading...</h3>}>
            <Outlet />
          </Suspense>
        </Container>
      </main>
    </>
  );
};

export default Layout;
