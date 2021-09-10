import React from 'react'
import { Droppable } from 'react-beautiful-dnd'
import Task from './task'
import TaskAdder from './taskAdder'
import './column.css'

export default class Column extends React.Component {
    addNewTaskToColumn = (content) => {
        this.props.addNewTask(content, this.props.column.id)
    }

    removeTaskFromColumn = (taskId) => {
        if(window.confirm('Are you sure to delete the task?'))
        this.props.removeTask(taskId, this.props.column.id)
    }

    render(){
        const {column} = this.props
        const columnDroppableId = column.id.toString()
        return (
            <div className="columnContainer">
                <h3 className="columnTitle">{column.title}</h3>
                <Droppable droppableId={columnDroppableId}>
                    {(provided) => (
                        <div>             
                            <div className="taskList" ref={provided.innerRef} {...provided.droppableProps}>
                                {this.props.tasks.map((task, index) => 
                                <Task key={task.id} task={task} index={index} removeTask={this.removeTaskFromColumn}/> )
                                }
                                {provided.placeholder}
                            </div>
                            <TaskAdder addNewTaskToColumn={this.addNewTaskToColumn} />
                        </div>
                    )}
                </Droppable>
            </div>
        )    
    }
}