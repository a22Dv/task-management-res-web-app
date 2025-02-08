import express, { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import fs from 'fs';
import path from 'path';
import cors from 'cors';    

// Start server.
const app = express()
const port = 3000;


// JSON file paths.
const JSONFiles: { [key: string]: string } = {
    'credentials': path.join(__dirname, '..', 'data/credentials.json'),
    'assignments': path.join(__dirname, '..', 'data/assignments.json'),
    'tasks': path.join(__dirname, '..', 'data/tasks.json'),
    'users': path.join(__dirname, '..', 'data/users.json')
};

// Load JSON files.
const JSONData: Record<string, Record<string, any>> = {};
for (const key in JSONFiles) {
    const data = fs.readFileSync(JSONFiles[key], 'utf-8');
    JSONData[key] = JSON.parse(data);
}

// Enable Cross-Origin Resource Sharing. (Different front-end/back-end ports)
app.use(cors());

// Test.
app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!');
});

// Check credentials.
async function checkCredentials(username: string, password: string): Promise<boolean> {
    if (username in JSONData['credentials']) {
        const result = await bcrypt.compare(password, JSONData['credentials'][username]);
        return result;
    } else {
        return false;   
    }
}

// Authentication.
app.get('/auth', async (req: Request, res: Response) => {
    const username = req.query.username as string | undefined;
    const password = req.query.password as string | undefined;
    if (username && password) {
        const isValid = await checkCredentials(username, password);
        res.json({ isValid: isValid });
    } else {
        res.json({ isValid: false });
    }
});

// Tasks.
app.get('/tasks', (req: Request, res: Response) => {
    const username = req.query.username as string | undefined;
    if (username && username in JSONData['assignments']) {
        const assignedTasks = JSONData['assignments'][username];
        let userTasksJSON: Record<string, string>[] = [];
        assignedTasks.forEach((index: number) => {
            userTasksJSON.push(JSONData['tasks'][`${index}`])
        });
        res.json(userTasksJSON);
    } else {
        res.json({ value: null });
    }
});

// User data.
app.get('/userdata', (req: Request, res: Response) => {
    const username = req.query.username as string | undefined;
    if (username) {
        res.json(JSONData["users"][username]);
    } else {
        res.json({ value: null });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});