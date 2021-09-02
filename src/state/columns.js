export function AddTaskToColumn(columns, columnId, taskId) {
    const column = columns[columnId]
    const taskIds = Array.from(column.taskIds)
    taskIds.push(taskId)
    
    const newColumn = {
        ...column,
        taskIds: taskIds
    }

    return {
        ...columns,
        [newColumn.id]: newColumn
    }
}

export function RemoveTaskFromColumn(columns, columnId, taskId) {
    const column = columns[columnId]
    const newTaskIds = Array.from(column.taskIds);
    newTaskIds.splice(newTaskIds.indexOf(taskId), 1)
    const newColumn = {
      ...column,
      taskIds: newTaskIds
    }

    return {
      ...columns,
      [columnId]: newColumn
    }
}
