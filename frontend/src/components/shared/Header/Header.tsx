import Logo from "../../../assets/cit-logo-full.png";
import { ButtonContainedSX, ButtonTextSX } from "../Buttons/ButtonStyles";
import { Button } from "@mui/material";
import styles from "./Header.module.css";
import { useNavigate } from "react-router-dom";
function Header() {
    const navigate = useNavigate();

    return (
        <div className={styles.header}>
            <div className={styles.logoContainer}>
                <img src={Logo} className={styles.logo} />
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
                            navigate("/login");
                        }}
                    >
                        <h3>Login</h3>
                    </Button>
                </div>
            </div>
        </div>
    );
}
export default Header;
