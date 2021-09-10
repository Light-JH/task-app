import React from 'react'
import { Draggable } from 'react-beautiful-dnd'
import './task.css'

// Draggable's child should be a function ()=>{}
export default class Task extends React.Component {
    onRemoveButtonClick = () => {
        this.props.removeTask(this.props.task.id)
    }

    render(){
        const {task} = this.props
        const taskDragId = task.id.toString()
        return (
            <Draggable draggableId={taskDragId} index={this.props.index}>
                {(provided, snapshot)=>(
                    <div className='taskContainer' {...provided.draggableProps} {...provided.dragHandleProps}
                               ref={provided.innerRef} isDragging={snapshot.isDragging}>
                            <div>
                                {task.content}
                                <button onClick={this.onRemoveButtonClick} className='deleteTaskButton'> - </button>
                            </div>
                    </div>
                )}
            </Draggable>       
        )
    }
}