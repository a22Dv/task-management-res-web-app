import { useEffect, useMemo, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import styles from "./Dashboard.module.css";
import NavBar from "../shared/NavBar/NavBar.tsx";
import Header from "../shared/Header/Header.tsx";
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
    const currentYear = date.getFullYear();
    const isEndDateToday = (
        endDateString: string,
        dayOfMonth: number,
        monthString: string,
        year: number
    ): boolean => {
        const [endMonth, endDay, endYear] = endDateString
            .split("/")
            .map(Number);
        const taskEndDate = new Date(endYear, endMonth - 1, endDay);
        const cellDate = new Date(year, getMonthIndex(monthString), dayOfMonth);
        return (
            taskEndDate.getFullYear() === cellDate.getFullYear() &&
            taskEndDate.getMonth() === cellDate.getMonth() &&
            taskEndDate.getDate() === cellDate.getDate()
        );
    };
    const getMonthIndex = (monthString: string): number => {
        const monthNames = [
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
        return monthNames.indexOf(monthString);
    };

    const urgentTasks = useMemo(() => {
        if (!tasks || tasks.length === 0) {
            return [];
        }
        const sortedTasks = [...tasks].sort((a, b) => {
            const dateA = new Date(a["end-date"]);
            const dateB = new Date(b["end-date"]);
            const diffA = Math.abs(dateA.getTime() - date.getTime());
            const diffB = Math.abs(dateB.getTime() - date.getTime());
            return diffA - diffB;
        });
        return sortedTasks.slice(0, 4);
    }, [tasks, date]);

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
                        <h1>Welcome, {username}</h1>
                    </div>
                    <div className={styles.greetingNote}>
                        <h3>
                            You have {tasks ? tasks.length : 0} pending tasks.
                        </h3>
                    </div>
                    <div className={styles.dateBar}>
                        <h1>{cMonth}</h1>
                        <div className={styles.days}>
                            {dates.map((val: number[], index: number) => {
                                const dayOfMonth = val[1];
                                let hasTaskEndingToday = false;
                                if (tasks) {
                                    for (const task of tasks) {
                                        if (
                                            isEndDateToday(
                                                task["end-date"],
                                                dayOfMonth,
                                                cMonth,
                                                currentYear
                                            )
                                        ) {
                                            hasTaskEndingToday = true;
                                            break; 
                                        }
                                    }
                                }
                                return (
                                    <div key={index} className={styles.dayCell}>
                                        <h3 className={styles.dayCellday}>
                                            {days[val[0]]}
                                            {hasTaskEndingToday && (
                                                <span
                                                    className={
                                                        styles.yellowCircle
                                                    }
                                                ></span>
                                            )}{" "}
                                        </h3>
                                        <h4>{dayOfMonth}</h4>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <div className={styles.tasks}>
                        <div className={styles.taskLabel}>
                            <h2>Latest Tasks</h2>
                        </div>
                        <div className={styles.tasksContainer}>
                            {tasks &&
                                urgentTasks.map((task: Task, index: number) => (
                                    <div
                                        className={styles.taskCell}
                                        key={index}
                                    >
                                        <h2>{task["task-name"]}</h2>
                                        <h4>
                                            <img
                                                src={person}
                                                className={styles.icon}
                                            />
                                            T.{task.teacher}
                                        </h4>
                                        <h4>
                                            <img
                                                src={calendar}
                                                className={styles.icon}
                                                alt="Start Date"
                                            />
                                            {task["start-date"]} -
                                            {task["end-date"]}
                                        </h4>
                                        <h5>
                                            <img
                                                src={submitMode}
                                                className={styles.icon}
                                            />
                                            {task["submission-type"]}
                                        </h5>
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
