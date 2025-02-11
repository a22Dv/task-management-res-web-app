import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import styles from "./Dashboard.module.css";
import NavBar from "../shared/NavBar/NavBar.tsx";
import Header from "../shared/Header/Header.tsx";
interface Task {
    subject: string;
    teacher: string;
    "start-date": string;
    "end-date": string;
    "task-name": string;
    "submission-type": string;
    description: string;
}
function getDate(): number[][] {
    const now = new Date();
    let weekArray: number[][] = [];
    for (let i: number = 0; i < 7; ++i) {
        weekArray[i] = [now.getDay(), now.getDate()];
        now.setDate(now.getDate() + 1);
    }
    return weekArray;
}
function Dashboard() {
    const apiPort = 3000;
    const { username, isLoggedIn } = useAuth();
    const [tasks, setTasks] = useState<Task[] | null>(null);
    useEffect(() => {
        const getData = async () => {
            const response = await fetch(
                `http://localhost:${apiPort}/tasks?username=${username}`
            );
            const jsonData = await response.json();
            setTasks(jsonData);
        };
        getData();
    }, [username]);
    const dates = getDate();
    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const date = new Date();
    const cMonth = months[date.getMonth()];

    return (
        <div className={styles.dashboard}>
            <div className={styles.navBar}>
                <NavBar />
            </div>
            <div className={styles.content}>
                <div className={styles.header}>
                    <Header />
                </div>
                <div className={styles.main}>
                    <div className={styles.greeting}>
                        <h1>Welcome, {username}...</h1>
                    </div>
                    <div className={styles.greetingNote}>
                        <h3>
                            You have {tasks ? tasks.length : 0} pending tasks.
                        </h3>
                    </div>
                    <div className={styles.dateBar}>z
                        <div className={styles.monthWeekLabel}></div>
                        <h1>{cMonth}</h1>
                        <div className={styles.days}>
                            {dates.map((val: number[], index: number) => (
                                <div key={index} className={styles.dayCell}>
                                    <h3>{days[val[0]]}</h3>
                                    <h4>{val[1]}</h4>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className={styles.tasks}>
                        <div className={styles.taskLabel}>
                            <h2>Tasks</h2>
                        </div>
                        <div className={styles.tasksContainer}>
                            {tasks &&
                                tasks.map((task: Task, index: number) => (
                                    <div
                                        className={styles.taskCell}
                                        key={index}
                                    >
                                        <h2>{task["task-name"]}</h2>
                                        <h4>{task.subject}</h4>
                                        <h4>T.{task.teacher}</h4>
                                        <h4>{task["start-date"]}</h4>
                                        <h4>{task["end-date"]}</h4>
                                        <p>{task.description}</p>
                                        <h5>{task["submission-type"]}</h5>
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Dashboard;
