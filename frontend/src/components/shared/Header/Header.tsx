import Logo from "../../../assets/cit-logo-full.png";
import { ButtonContainedSX, ButtonTextSX } from "../Buttons/ButtonStyles";
import { Button } from "@mui/material";
import styles from "./Header.module.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";

function Header() {
    const navigate = useNavigate();
    const { isLoggedIn, logout } = useAuth();

    return (
        <div className={styles.header}>
            <div className={styles.logoContainer}>
                <img
                    src={Logo}
                    className={styles.logo}
                    onClick={!isLoggedIn ? () => {
                        navigate("/home");
                    } : () => {}}
                />
            </div>
            <div className={styles.buttonsContainer}>
                <div className={styles.buttons}>
                    <Button
                        variant="text"
                        sx={ButtonTextSX}
                        size="large"
                        className={styles.button}
                        onClick={() => {
                            window.open(
                                "https://shs.cit.edu",
                                "_blank",
                                "noopener, noreferrer"
                            );
                        }}
                    >
                        <h3>LMS</h3>
                    </Button>
                    <Button
                        variant="text"
                        sx={ButtonTextSX}
                        size="large"
                        className={styles.button}
                        onClick={() => {
                            window.open(
                                "https://cituweb.pinnacle.com.ph/aims/students/",
                                "_blank",
                                "noopener, noreferrer"
                            );
                        }}
                    >
                        <h3>AIMS</h3>
                    </Button>
                    <Button
                        variant="contained"
                        sx={ButtonContainedSX}
                        size="large"
                        className={styles.button}
                        onClick={() => {
                            isLoggedIn && logout();
                            navigate("/login");
                        }}
                    >
                        <h3>{isLoggedIn ? 'Sign out' : 'Login'}</h3>
                    </Button>
                </div>
            </div>
        </div>
    );
}
export default Header;
