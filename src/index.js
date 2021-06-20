import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components'
import { DragDropContext } from 'react-beautiful-dnd'
import initialData from './initial-data'
import Column from './column'

const Container = styled.div`
  display: flex;`

class App extends Component {
  state = initialData;
  onDragStart = start => {
    const homeIndex = this.state.columnOrder.indexOf(start.source.droppableId)

    this.setState({
      homeIndex
    })
  }
// clear the index when the drag finish 
  onDragEnd=result=>{
    this.setState({
      homeIndex:null,
    })

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
      console.log(source.droppableId)//column-1

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
     
    finishTaskIds.splice(destination.index,0,draggableId)
    const newFinish = {
      ...finish,
      taskIds:finishTaskIds,
    }
    const newState = {
      ...this.state,
      columns: {
        ...this.state.columns,
        [newStart.id]: newStart,
        [newFinish.id]:newFinish
      }       
    }
    this.setState(newState);
  }

  render(){
    return (
      <DragDropContext 
        onDragStart={this.onDragStart}
        onDragEnd={this.onDragEnd}>
          
          <Container>
            {this.state.columnOrder.map((columnId, index) => {
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


