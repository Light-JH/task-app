import React from 'react'
import { Droppable } from 'react-beautiful-dnd'
import Task from './task'
import './column.css'

export default class Column extends React.Component {
    addNewTaskToColumn = () => {
        this.props.addNewTask(this.newTaskContent.value, this.props.column.id)
        this.newTaskContent.value = ""
    }

    removeTaskFromColumn = (taskId) => {
        if(window.confirm('Are you sure to delete the task?'))
        this.props.removeTask(taskId, this.props.column.id)
    }

    render(){
        const {column, isDropDisabled} = this.props
        const columnDroppableId = column.id.toString()
        return (
            <div className="columnContainer">
                <h3 className="columnTitle">{column.title}</h3>
                <Droppable 
                droppableId={columnDroppableId}
                isDropDisabled={isDropDisabled}
                >
                    {(provided, snapshot )=> (
                        <div>             
                            <div className="taskList" ref={provided.innerRef} {...provided.droppableProps} 
                                                            isDraggingOver={snapshot.isDraggingOver}>
                                {this.props.tasks.map((task, index) => 
                                <Task key={task.id} task={task} index={index} removeTask={this.removeTaskFromColumn}/> )
                                }
                                {provided.placeholder}
                            </div>
                            <div className="addTaskContainer">
                                <input ref={c => this.newTaskContent = c} type='text' placeholder='Add new task'/>
                                <button className="addTaskButton" onClick={this.addNewTaskToColumn}> + </button>
                            </div>
                        </div>
                    )}
                </Droppable>
            </div>
        )    
    }
}