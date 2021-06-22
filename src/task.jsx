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
        const isDragDisabled = this.props.task.id ==='task-1';

        return (
            <Draggable 
                draggableId={taskDragId} 
                index={this.props.index}
                isDragDisabled={isDragDisabled}
            >
                {(provided, snapshot)=>(
                    <Container
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                        isDragging={snapshot.isDragging}
                        isDragDisabled={isDragDisabled}
                        >
                          {task.content}
                    </Container>
                )}
            </Draggable>
            
        )
    }
}