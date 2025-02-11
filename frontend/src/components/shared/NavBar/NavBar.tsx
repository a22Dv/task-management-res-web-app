import styles from './NavBar.module.css';
import user from '../../../assets/user.svg';
import listIcon from '../../../assets/list.svg';
import homeIcon from '../../../assets/home.svg';
import { Link } from 'react-router-dom'; 
import { useAuth } from '../../../contexts/AuthContext';

function NavBar() {
    const { username } = useAuth()

    return (
        <div className={styles.navBar}>
            <div className={styles.navLinks}> 
                <Link to={`/dashboard/${username}`} className={styles.navLink}>
                    <img src={homeIcon} alt="Dashboard" className={styles.navIcon} />
                    <span className={styles.navLabel}>Dashboard</span>
                </Link>
                <Link to={`/tasklist/${username}`} className={styles.navLink}>
                    <img src={listIcon} alt="Tasklist" className={styles.navIcon} />
                    <span className={styles.navLabel}>Tasklist</span>
                </Link>
            </div>
        </div>
    );
}
export default NavBar;