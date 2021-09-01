import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import styled from 'styled-components'
import { DragDropContext } from 'react-beautiful-dnd'
import Column from './column'

const Container = styled.div`
  display: flex;`

class App extends Component {  
  state = {
    tasks: {},
    columns: {},
    columnOrder: [],
  }

  getTasks() {
    axios.get('http://localhost:5000/api/tasks').then(
      response => {
        const tasks = {}
        for(const task of response.data) {
          tasks[task.id] = task
        }
        console.log(tasks)

        this.setState({
          ...this.state,
          tasks: tasks
        })
        this.getColumns()
      },
      error => {
        console.log(error)
      }   
    )
  }

  getColumns() {
    axios.get('http://localhost:5000/api/columns').then(
      response => {
        const columns = {}
        for(const column of response.data) {
          columns[column.id] = column
        }

        this.setState({
          ...this.state,
          columns: columns
        })
        this.getColumnsOrder()
      },
      error => {
        console.log(error)
      }
    )
  }
  getColumnsOrder(){
    axios.get('http://localhost:5000/api/columnsorder').then(
      response => {
        const columnOrder = response.data.order
        this.setState({
          ...this.state,
          columnOrder
        })
        console.log(columnOrder)
      },
      error => {
        console.log(error)
      }
  )}

  componentDidMount(){
    this.getTasks()
  }
// clear the index when the drag finish 
  onDragEnd=result=>{
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

      axios.put("http://localhost:5000/api/columns", {
        id: start.id,
        taskIds: newTaskIds,
      })

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
    
    axios.put("http://localhost:5000/api/columns", {
      id: newStart.id,
      taskIds: newStart.taskIds,
    })
    axios.put("http://localhost:5000/api/columns", {
      id: newFinish.id,
      taskIds: newFinish.taskIds
    })

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
              return (<Column key={column.id} column={column} tasks={tasks}/>);       
            })}
          </Container>
          
      </DragDropContext>
    )
  }
}


ReactDOM.render(<App />,document.getElementById('root'));


