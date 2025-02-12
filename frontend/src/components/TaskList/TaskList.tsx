import styles from "./TaskList.module.css";
import Header from "../shared/Header/Header";
import NavBar from "../shared/NavBar/NavBar";
import { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import calendar from "../../assets/calendar.svg";
import person from "../../assets/user.svg";
import submitMode from "../../assets/upload.svg";

interface Task {
    subject: string;
    teacher: string;
    "start-date": string;
    "end-date": string;
    "task-name": string;
    "submission-type": string;
    description: string;
}

function TaskList() {
    const apiPort = 3000;
    const { username } = useAuth();
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

    return (
        <div className={styles.tasklist}>
            <div className={styles.navBar}>
                <NavBar />
            </div>
            <div className={styles.content}>
                <div className={styles.taskHeader}>
                    <Header />
                </div>
                <div className={styles.taskTitle}>
                    <h2>Tasks</h2>
                    <h4>You have {tasks ? tasks.length : 0} pending tasks remaining.</h4>
                </div>
                <div className={styles.tasks}>
                    {tasks ? (
                        tasks.map((task, index) => (
                            <div className={styles.taskCell} key={index}>
                                <h2>{task["task-name"]}</h2>
                                <h4>
                                    <img src={person} className={styles.icon} />
                                    T.{task.teacher}
                                </h4>
                                <h4>
                                    <img
                                        src={calendar}
                                        className={styles.icon}
                                        alt="Start Date"
                                    />
                                    {task["start-date"]} -{task["end-date"]}
                                </h4>
                                <h5>
                                    <img
                                        src={submitMode}
                                        className={styles.icon}
                                    />
                                    {task["submission-type"]}
                                </h5>
                                <p className={styles.desc}>{task["description"]}</p>
                            </div>
                        ))
                    ) : (
                        <div></div>
                    )}
                </div>
            </div>
        </div>
    );
}
export default TaskList;
