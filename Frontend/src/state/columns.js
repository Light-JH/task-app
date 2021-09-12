export function AddTaskToColumn(columns, columnId, taskId) {
    const column = columns[columnId]
    // make a copy of taskIds 
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
    // find the column the task moved to 
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

export function MoveTaskWithinColumn(columns, columnId, startingIndex, endingIndex) {
    const column = columns[columnId]
    const newTaskIds = Array.from(column.taskIds)
    const taskId = newTaskIds[startingIndex]
    newTaskIds.splice(startingIndex, 1)
    newTaskIds.splice(endingIndex, 0, taskId)

    const newColumn = {
        ...column,
        taskIds: newTaskIds
    }
    return {
        ...columns,
        [columnId]: newColumn
    }
}

export function MoveTaskBetweenColumns(columns, startingColumnId, endingColumnId, startingIndex, endingIndex) {
    const startingColumn = columns[startingColumnId]
    const startingColumnTaskIds = Array.from(startingColumn.taskIds)
    const taskId = startingColumnTaskIds[startingIndex]
    startingColumnTaskIds.splice(startingIndex, 1)
    const newStartingColumn = {
        ...startingColumn,
        taskIds: startingColumnTaskIds
    }

    const endingColumn = columns[endingColumnId]
    const endingColumnTaskIds = Array.from(endingColumn.taskIds)
    endingColumnTaskIds.splice(endingIndex, 0, taskId)
    const newEndingColumn = {
        ...endingColumn,
        taskIds: endingColumnTaskIds
    }

    return {
        ...columns,
        [startingColumnId]: newStartingColumn,
        [endingColumnId]: newEndingColumn,
    }
}
