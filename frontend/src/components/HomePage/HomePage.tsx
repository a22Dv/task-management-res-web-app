import Header from "../shared/Header/Header";
import Button from "@mui/material/Button";
import { ButtonContainedSX } from "../shared/Buttons/ButtonStyles";
import WomanIllustration from "../../assets/image.png";
import citLogo from "../../assets/cit-logo.png";
import styles from "./HomePage.module.css";
import { useNavigate } from "react-router-dom";
function HomePage() {
    const navigate = useNavigate();
    return (
        <div className={styles.homePage}>
            <div className={styles.header}>
                <Header />
            </div>
            <div className={styles.entry}>
                <div className={styles.tagline}>
                    <div className={styles.sectioned}>
                        <h1>All your tasks, in one place.</h1>
                        <Button
                            variant="contained"
                            sx={ButtonContainedSX}
                            className={styles.button}
                            onClick={() => {
                                navigate("/login");
                            }}
                        >
                            <h1>Get Started</h1>
                        </Button>
                    </div>
                    <img
                        src={WomanIllustration}
                        className={styles.illustration}
                    />
                </div>
            </div>
            <div className={styles.info}>
                <div className={styles.textContainer}>
                    <h1>
                        CIT<span className={styles.highlight}>-TMS</span>
                    </h1>
                    <h3>
                        A way to help you stay on{" "}
                        <span className={styles.highlight}>top</span> of school
                        activities.
                    </h3>
                    <p>
                        CIT-TMS is a web-based solution to the age-old problem
                        of keeping track of tasks.
                    </p>
                    <h3>Easy.</h3>
                    <p>
                        To get started, enter your school ID and the password
                        provided to you at enrollment.
                    </p>
                    <h3>Convenient.</h3>
                    <p>
                        The app gives you an overview of what to do sorted from
                        the most urgent to the least.
                    </p>
                    <h3>Detailed.</h3>
                    <p>
                        Want to get a comprehensive view of your tasks? The app
                        does that for you too. Just head to the tasks section.
                        Sort by subject, date, etc.
                    </p>
                    <h3>Need any help?</h3>
                    <p>Contact our school's IT staff at:</p>
                    <p>+63 (032) 411 2000</p>
                    <p>Or, send an email at:</p>
                    <p> info@cit.edu</p>
                </div>
            </div>
            <div className={styles.footer}>
                <div className={styles.footerContainer}>
                    <img src={citLogo} className={styles.citLogoFooter} />
                    <div className={styles.contactInfo}>
                        <h2>Contact us</h2>
                        <p>+63 (032) 411 2000</p>
                        <p>info@cit.edu</p>
                        <p>N. Bacalso Avenue, Cebu City, Philippines 6000</p>
                    </div>
                    <div className={styles.contactInfo}>
                        <h2>Social Media</h2>
                        <Button
                            variant="contained"
                            sx={ButtonContainedSX}
                            className={styles.socmedButton}
                            onClick={() => {
                                window.open(
                                    "https://www.facebook.com/CITUniversity",
                                    "_blank",
                                    "noopener, noreferrer"
                                );
                            }}
                        >
                            <p>Facebook</p>
                        </Button>
                        <Button
                            variant="contained"
                            sx={ButtonContainedSX}
                            className={styles.socmedButton}
                            onClick={() => {
                                window.open(
                                    "https://www.tiktok.com/@cituniversity",
                                    "_blank",
                                    "noopener, noreferrer"
                                );
                            }}
                        >
                            <p>Tiktok</p>
                        </Button>
                        <Button
                            variant="contained"
                            sx={ButtonContainedSX}
                            className={styles.socmedButton}
                            onClick={() => {
                                window.open(
                                    "https://www.instagram.com/cituniversity/",
                                    "_blank",
                                    "noopener, noreferrer"
                                );
                            }}
                        >
                            <p>Instagram</p>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default HomePage;
