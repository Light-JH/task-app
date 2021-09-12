import axios from "axios"

const BACKEND_TASKS_URL = process.env.REACT_APP_BACKEND_URL + "/api/tasks"

// LoadTasks:
// 1. Sends request to backend
// 2. Once it receives the response, get tasks from .data
// 3. Return task map
export async function LoadTasks() {
    const res = await axios.get(BACKEND_TASKS_URL);
    const tasks = {}
    for (const task of res.data) {
        tasks[task.id] = task
    }
    return tasks
}

export async function CreateTask(content) {
    const res = await axios.post(BACKEND_TASKS_URL, { content: content })
    return res.data
}

export async function RemoveTask(taskId) {
    await axios.delete(BACKEND_TASKS_URL, { id: taskId })
}
