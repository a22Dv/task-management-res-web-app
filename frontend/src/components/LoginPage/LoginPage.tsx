import styles from "./Loginpage.module.css";
import Header from "../shared/Header/Header.tsx";
import TextField from "@mui/material/TextField";
import Illustration from "../../assets/image.png";
import { useState } from "react";
import { Theme } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { ButtonContainedSX } from "../shared/Buttons/ButtonStyles.tsx";
import { useAuth } from "../../contexts/AuthContext.tsx";
import { useNavigate } from "react-router-dom";

function LoginPage() {
    const navigate = useNavigate();
    const [isError, setIsError] = useState(false);
    const [inputUsername, setInputUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const { login, username } = useAuth()
    const redirect = async () => {
        const result = await login(inputUsername, password);
        if (result) {
            navigate(`/dashboard/${username}`);
        } else {
            setIsError(!result);
            console.log(!result)
        }
    }
    return (
        <div className={styles.loginPage}>
            <Header />
            <div className={styles.body}>
                <div className={styles.art}>
                    <img src={Illustration} className={styles.illustration} />
                </div>
                <div className={styles.loginContainer}>
                    <div className={styles.loginBox}>
                        <div className={styles.greeting}>
                            <h1>Welcome!</h1>
                        </div>
                        <div className={styles.inputFields}>
                            <div className={styles.inputField}>
                                <TextField
                                    label="Student ID"
                                    variant="outlined"
                                    color="secondary"
                                    fullWidth
                                    required
                                    sx={{
                                        "& label": {
                                            color: (theme: Theme) =>
                                                theme.palette.primary.main,
                                        },
                                        "& fieldset": {
                                            borderColor: (theme: Theme) =>
                                                theme.palette.primary.main,
                                        },
                                    }}
                                    error={isError}
                                    onChange={(
                                        e: React.ChangeEvent<HTMLInputElement>
                                    ) => {
                                        setInputUsername(e.target.value);
                                    }}
                                />
                            </div>
                            <div className={styles.inputField}>
                                <TextField
                                    label="Password"
                                    type={"password"}
                                    variant="outlined"
                                    color="secondary"
                                    fullWidth
                                    required
                                    sx={{
                                        "& label": {
                                            color: (theme: Theme) =>
                                                theme.palette.primary.main,
                                        },
                                        "& fieldset": {
                                            borderColor: (theme: Theme) =>
                                                theme.palette.primary.main,
                                        },
                                    }}
                                    error={isError}
                                    helperText = {(isError) ? "Incorrect username or password." : ""}
                                    onChange={(
                                        e: React.ChangeEvent<HTMLInputElement>
                                    ) => {
                                        setPassword(e.target.value);
                                    }}
                                    onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                                        if (e.key === 'Enter') {
                                            redirect();
                                        }
                                    }}
                                />
                            </div>
                            <Button
                                sx={ButtonContainedSX}
                                className={styles.loginButton}
                                onClick={() => redirect()}
                            >
                                <p>Sign In</p>
                            </Button>
                        </div>
                        <div className={styles.options}></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default LoginPage;
