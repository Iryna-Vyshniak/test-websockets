import { NavLink, useLocation, useParams } from 'react-router-dom';
import styles from './Header.module.scss';

import Container from '../Container/Container';
import { getNavLinks } from '../../../shared/data/navLinks';

const Header = () => {
  const location = useLocation();
  const { id: navId } = useParams();
  const navLinks = getNavLinks(navId);

  const isHome = location.pathname === '/';
  const shouldRenderOrgLink = isHome && !navId;

  const elements = navLinks.map(({ id, link, label }) =>
    shouldRenderOrgLink && link === `/org/${navId}` ? null : (
      <li key={id} className={styles.menuItem}>
        <NavLink to={link} className={styles.link}>
          {label}
        </NavLink>
      </li>
    )
  );
  return (
    <header className={styles.navbar}>
      <Container>
        <nav className={styles.navbarRow}>
          <NavLink to="/" className={styles.logo}>
            T
          </NavLink>
          <ul className={styles.menu}>{elements}</ul>
        </nav>
      </Container>
    </header>
  );
};

export default Header;
