import axios from "axios"

// LoadTasks:
// 1. Sends request to backend
// 2. Once it receives the response, get tasks from .data
// 3. Return task map
export async function LoadTasks() {
    const res = await axios.get('http://localhost:5000/api/tasks');
    const tasks = {}
    for (const task of res.data) {
        tasks[task.id] = task
    }
    return tasks
}

export async function CreateTask(content) {
    const res = await axios.post('http://localhost:5000/api/tasks', { content: content })
    return res.data
}

export async function RemoveTask(taskId) {
    await axios.delete('http://localhost:5000/api/tasks', { id: taskId })
}
