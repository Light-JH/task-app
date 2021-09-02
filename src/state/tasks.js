export function AddToTasks(tasks, task) {
    const newTasks = tasks
    // add new task into map
    newTasks[task.id] = task
    return newTasks
}

export function RemoveFromTasks(tasks, taskId) {
    const newTasks = tasks
    delete newTasks[taskId]
    return newTasks
}