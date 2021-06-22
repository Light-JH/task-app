const initialData = {
    tasks: {
        'task-1': { id: 'task-1', content: 'Clean house'},
        'task-2': { id: 'task-2', content: 'Have a walk'},
        'task-3': { id: 'task-3', content: 'Coding'},
        'task-4': { id: 'task-4', content: 'Grocery'}
    },

    columns: {
        'column-1': {
            id: 'column-1',
            title:'To do',
            taskIds:['task-1','task-2', 'task-3', 'task-4'],
            columnOrder: 0 
        },
        'column-2': {
            id: 'column-2',
            title:'In progress',
            taskIds:[],
            columnOrder: 1,
        },
        'column-3': {
            id: 'column-3',
            title:'Done',
            taskIds:[],
            columnOrder: 2,
        },
    },

    // Facilitate reordering of the columns
    columnOrder:['column-1','column-2','column-3'],
}

export default initialData;