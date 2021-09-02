import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components'
import { DragDropContext } from 'react-beautiful-dnd'
import Column from './column'

// Interactions with the backend go through these functions
import { LoadTasks, CreateTask, RemoveTask } from './controllers/tasks'
import { LoadColumns, UpdateColumn } from './controllers/columns'
import { LoadColumnOrder} from './controllers/columnOrder'

// Helper functions for modifying our state 
import { AddToTasks, RemoveFromTasks } from './state/tasks'
import { AddTaskToColumn, RemoveTaskFromColumn } from './state/columns';

const Container = styled.div`
  display: flex;`

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
    const {source, destination, draggableId} = result;

    if(!destination) {return}
    if(
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return
    }

    const start = this.state.columns[source.droppableId]// source, column:id-title-taskIds 
    const finish = this.state.columns[destination.droppableId]// desitination column

    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds);

      newTaskIds.splice(source.index,1);
      newTaskIds.splice(destination.index, 0, draggableId)
      
      const newColumn = {
        ...start,
        taskIds:newTaskIds
      }
      const newState = {
        ...this.state,
        columns: {
          ...this.state.columns,
          [newColumn.id]:newColumn
        }
      }

      this.setState(newState)
      await UpdateColumn(newColumn)

      return;
    }

    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(source.index,1)
    
    const newStart = {
      ...start,
      taskIds: startTaskIds

    }
    const finishTaskIds = Array.from(finish.taskIds)
    // update the taskIds in source and destination column: add draggableId to the new destination.column 
     
    finishTaskIds.splice(destination.index,0,draggableId)// destination.index = taskOrder, draggableId = task.id
    const newFinish = {
      ...finish,
      taskIds:finishTaskIds,
    }
    const task = this.state.tasks[draggableId]
    const newTask = {...task, columnId:finish.id}


    // update the task columnId of the dragged task 
    const newState = {
      ...this.state,
      tasks:{
        ...this.state.tasks,
        [newTask.id]: newTask
      },
      columns: {
        ...this.state.columns,
        [newStart.id]: newStart,
        [newFinish.id]:newFinish
      }       
    }
    this.setState(newState);

    await UpdateColumn(newStart)
    await UpdateColumn(newFinish)
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
      <DragDropContext 
        onDragStart={this.onDragStart}
        onDragEnd={this.onDragEnd}>         
          <Container>
            {this.state.columnOrder.map((columnId) => {
              const column = this.state.columns[columnId];
              const tasks = column.taskIds.map(taskId => this.state.tasks[taskId]);
              return (<Column key={column.id} column={column} tasks={tasks} addNewTask={this.onNewTaskAdded} removeTask={this.onTaskRemoved}/>);       
            })}
          </Container>
      </DragDropContext>
    )
  }
}


ReactDOM.render(<App />,document.getElementById('root'));


