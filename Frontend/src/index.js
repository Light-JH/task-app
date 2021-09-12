import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { DragDropContext } from 'react-beautiful-dnd'
import './index.css'
import Column from './components/column'

// Interactions with the backend go through these functions
import { LoadTasks, CreateTask, RemoveTask } from './controllers/tasks'
import { LoadColumns, UpdateColumn } from './controllers/columns'
import { LoadColumnOrder} from './controllers/columnOrder'

// Helper functions for modifying our state 
import { AddToTasks, RemoveFromTasks } from './state/tasks'
import { AddTaskToColumn, RemoveTaskFromColumn, MoveTaskWithinColumn, MoveTaskBetweenColumns } from './state/columns';

class App extends Component {  
    state = {
        tasks: {},
        columns: {},
        columnOrder: [],
    }

    // fetch initial data 
    async componentDidMount() {
        const tasks = await LoadTasks()
        const columns = await LoadColumns()
        const columnOrder = await LoadColumnOrder()
        this.setState({
            tasks: tasks,
            columns: columns,
            columnOrder: columnOrder
        })
    }

    // clear the index when the drag finish 
    onDragEnd = async (result) => {
        const {source, destination} = result;

        if(!destination) {return}
        if(
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return
        }

        if (source.droppableId === destination.droppableId) {
            const newColumns = MoveTaskWithinColumn(this.state.columns, source.droppableId, source.index, destination.index)
            this.setState({...this.state, columns: newColumns})
            await UpdateColumn(newColumns[source.droppableId])
        }
        else {
            const newColumns = MoveTaskBetweenColumns(this.state.columns, source.droppableId, destination.droppableId, source.index, destination.index)
            this.setState({...this.state, columns: newColumns})
            await UpdateColumn(newColumns[source.droppableId])
            await UpdateColumn(newColumns[destination.droppableId])
        }
    }

    onNewTaskAdded = async (content, columnId) => {
        // Create a new task on backend
        const task = await CreateTask(content)

        // Update tasks and columns states
        const newTasks = AddToTasks(this.state.tasks, task)
        const newColumns = AddTaskToColumn(this.state.columns, columnId, task.id)

        // Update column on backend
        await UpdateColumn(newColumns[columnId])

        // Update state
        this.setState({...this.state, tasks: newTasks, columns: newColumns})
    }

    onTaskRemoved = async (taskId, columnId) => {
        // Remove from backend
        await RemoveTask(taskId)

        // Update tasks and columns states
        const newTasks = RemoveFromTasks(this.state.tasks, taskId)
        const newColumns = RemoveTaskFromColumn(this.state.columns, columnId, taskId)

        // Update column on backend
        await UpdateColumn(newColumns[columnId])

        // Update state
        this.setState({...this.state, tasks: newTasks, columns: newColumns})
    }

    render(){
        return (
            <DragDropContext onDragStart={this.onDragStart} onDragEnd={this.onDragEnd}>         
                <div className="appContainer">
                    {this.state.columnOrder.map((columnId) => {
                    const column = this.state.columns[columnId];
                    const tasks = column.taskIds.map(taskId => this.state.tasks[taskId]);
                    return (<Column key={column.id} column={column} tasks={tasks} addNewTask={this.onNewTaskAdded} removeTask={this.onTaskRemoved}/>);       
                    })}
                </div>
            </DragDropContext>
        )
    }
}

ReactDOM.render(<App />,document.getElementById('root'));
