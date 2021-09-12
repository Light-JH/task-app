import React from 'react'
import './taskAdder.css'

export default class TaskAdder extends React.Component {
    state = {
        content: ""
    }

    onClick = () => {
        this.props.addNewTaskToColumn(this.state.content)
        this.setState({content: ""})
    }

    handleChange = e => this.setState({ content: e.target.value })

    render() {
        return (
            <div className="addTaskContainer">
                <input type="text" value={this.state.content} onChange={this.handleChange} placeholder="Add new task" />
                <button className="addTaskButton" onClick={this.onClick}> + </button>
            </div>
        )
    }
}