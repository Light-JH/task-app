import React from 'react'
import styled from 'styled-components'
import { Draggable } from 'react-beautiful-dnd'

const Container = styled.div`
border: 1px solid lightgrey;
border-radius: 2px;
padding: 8px;
margin-bottom: 8px;
background-color: white;
background-color: ${props => (
    props.isDragDisabled ? 'lightgrey' : props.isDragging ? 'lightgreen' : 'white'
    )}`;

// Draggable's child should be a function ()=>{}
export default class Task extends React.Component {
    render(){
        const {task} = this.props
        const taskDragId = task.id.toString()
        return (
            <Draggable 
                draggableId={taskDragId} 
                index={this.props.index}
            >
                {(provided, snapshot)=>(
                    <Container
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                        isDragging={snapshot.isDragging}
                        >
                            <div>
                                {task.content}
                                <button onClick={this.onRemoveButtonClick}>-</button>
                            </div>
                    </Container>
                )}
            </Draggable>
            
        )
    }

    onRemoveButtonClick = () => {
        this.props.removeTask(this.props.task.id)
    }
}