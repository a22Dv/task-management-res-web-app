import bcrypt
import json
import os
import ollama
import random
from copy import copy

# 10 users, 20 unique tasks, 2-8 assignments/student.


def main() -> None:
    print("Starting execution...")
    TASK_COUNT: int = 20

    # TEST CREDENTIALS.
    test_users: dict[str, str] = {
        "23-2480-939": "pass1",
        "23-2480-940": "pass2",
        "23-2480-941": "pass3",
        "23-2480-942": "pass4",
        "23-2480-943": "pass5",
        "23-2480-944": "pass6",
        "23-2480-945": "pass7",
        "23-2480-946": "pass8",
        "23-2480-948": "pass9",
        "23-2480-949": "pass10",
    }
    hashed_users: dict[str, str] = {}
    print("Hashing passwords...")
    for entry, password in test_users.items():
        hashed_users[entry] = get_hashed_password(password)

    # PRE-DEFINED DATA SETS.
    student_names: list[str] = [
        "Ava",
        "Ethan",
        "Chloe",
        "Noah",
        "Mia",
        "Liam",
        "Sophia",
        "Jackson",
        "Olivia",
        "Aiden",
    ]
    sections: list[str] = [
        "Altruism",
        "Benevolence",
        "Competence",
        "Diligence",
        "Enthusiasm",
        "Friendship",
        "Generosity",
        "Integrity",
        "Tenacity",
        "Kindness",
        "Quality",
        "Justice",
        "Responsibility",
    ]
    academic_year: str = "A.Y. 2024-2025"
    subjects: list[str] = [
        "BIO12B",
        "PHYS12B",
        "MIL",
        "LIT12",
        "ENTREP",
        "PEH12B",
        "RES3",
        "RES4",
    ]
    teachers: list[str] = [
        "Alice",
        "Benjamin",
        "Charlotte",
        "Daniel",
        "Eleanor",
        "Frederick",
        "Gabriella",
        "Harrison",
        "Isabella",
        "Jonathan",
    ]
    dates: dict[str, str] = {
        "01/05/2024": "01/12/2024",
        "02/10/2024": "02/20/2024",
        "03/15/2024": "03/22/2024",
        "04/01/2024": "04/08/2024",
        "05/07/2024": "05/17/2024",
        "06/12/2024": "06/22/2024",
        "07/20/2024": "07/27/2024",
        "08/25/2024": "09/04/2024",
        "09/30/2024": "10/07/2024",
        "10/15/2024": "10/25/2024",
    }
    tasks: list[str] = [
        "Written Work 1",
        "Performance Task 1",
        "Quiz 1",
        "Activity 1",
        "Written Work 2",
        "Performance Task 2",
        "Quiz 2",
        "Activity 2",
        "Final Assessment",
    ]
    submission_type: list[str] = ["In-person", "Online", "In-person & Online"]

    # DYNAMICALLY GENERATE DATA.
    test_tasks: dict[int, dict[str, str]] = {}
    print("Generating task entries...")
    generate_task_entries(
        test_tasks, TASK_COUNT, subjects, teachers, dates, tasks, submission_type
    )
    print("Generating assignments...")
    test_assignments: dict[str, list[int]] = {}
    generate_assignments(test_assignments, list(test_users.keys()), TASK_COUNT)

    print("Generating student data...")
    test_student_data: dict[str, dict[str, str]] = {}
    generate_student_data(
        test_student_data, student_names, sections, academic_year, test_users.keys()
    )

    print("Converting to JSON...")
    to_json(test_student_data, "users.json")
    to_json(test_assignments, "assignments.json")
    to_json(test_tasks, "tasks.json")
    to_json(hashed_users, "credentials.json")
    print("EXECUTION FINISHED.")


def generate_task_entries(
    tasks: dict[int, dict[str, str]],
    entry_number: int,
    subjects: list[str],
    teachers: list[str],
    dates: dict[str, str],
    task_names: list[str],
    sub_type: list[str],
) -> None:
    for i in range(entry_number):
        start_date: str = random.choice(list(dates.keys()))
        end_date: str = dates[start_date]
        subject: str = random.choice(subjects)
        teacher: str = random.choice(teachers)
        task_name: str = random.choice(task_names)
        submission_type: str = random.choice(sub_type)
        response: ollama.ChatResponse = ollama.chat(
            "gemma2:2b",
            messages=[
                {
                    "role": "user",
                    "content": f"""Generate a short <20 word demo task 
                                description for a task with: {subject} 
                                | {task_name} | {submission_type}. Make 
                                it as realistic as possible that an actual 
                                teacher wrote the description for an assignment
                                that they'll assign to students. And if you make 
                                a description,Make the description as related as 
                                possible to the subject itself. Get rid of all the
                                formatting, such as special characters. You are
                                only allowed to use ASCII characters in your 
                                response. DO not include the subject name or anything in
                                your response. This is purely additional info that a teacher
                                might include like instructions or notes or stuff like that.""",
                }
            ],
        )

        tasks[i] = {
            "subject": subject,
            "teacher": teacher,
            "start-date": start_date,
            "end-date": end_date,
            "task-name": task_name,
            "submission-type": submission_type,
            "description": response["message"]["content"],
        }


def generate_student_data(
    student_data: dict[str, dict[str, str]],
    names: list[str],
    sections: list[str],
    ay: str,
    users: list[str],
) -> None:
    for user in users:
        student_data[user] = {
            "name": random.choice(names),
            "section": random.choice(sections),
            "academic-year": ay,
        }


def generate_assignments(
    assignments: dict[str, list[int]], student_names: list[str], task_count: int
) -> None:
    for name in student_names:
        randlen: int = random.randint(2, 8)
        rand: int = 0
        temp: list[int] = []
        while len(temp) < randlen:
            rand = random.randint(0, task_count - 1)
            if rand in temp:
                continue
            else:
                temp.append(rand)
        assignments[name] = copy(temp)

def get_hashed_password(password: str) -> str:
    pass_bytes: bytes = password.encode("utf-8")
    salt: bytes = bcrypt.gensalt()
    hashed_bytes: bytes = bcrypt.hashpw(pass_bytes, salt)
    hashed_string: str = hashed_bytes.decode("utf-8")
    return hashed_string


def to_json(user_dict: dict, filename: str) -> None:
    with open(f"{os.path.join(os.path.dirname(__file__), filename)}", "w") as json_file:
        json.dump(user_dict, json_file, indent=4)


if __name__ == "__main__":
    main()
