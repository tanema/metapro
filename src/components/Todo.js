import React, { PropTypes, Component } from 'react'
import classnames from 'classnames'
import Input from 'components/Input'

class Todo extends Component {
  constructor(props) {
    super(props);
    this.state = {isEditing: false}
  }

  toggleDone(e) {
    this.props.toggleTodo(this.props.todo);
  }

  removeTodo () {
    this.toggleEditing(false)
    this.props.deleteTodo(this.props.todo);
  }

  toggleEditing(isEditing) {
    this.setState({isEditing})
  }

  renameTodo(newText) {
    this.toggleEditing(false)
    this.props.renameTodo(this.props.todo, newText)
  }

  render () {
    return (
      <li
        className={classnames({
          completed: this.props.todo.done,
          editing: this.state.isEditing,
        })}>
        <div className='view'>
          <input
            checked={this.props.todo.done}
            className='toggle'
            onChange={this.toggleDone.bind(this)}
            type='checkbox'
          />
          <label onDoubleClick={this.toggleEditing.bind(this, true)}>
            {this.props.todo.text}
          </label>
          <button className='destroy' onClick={this.removeTodo.bind(this)} />
        </div>
        {!this.state.isEditing ? null :
          <Input
            className='edit'
            initialValue={this.props.todo.text}
            onCancel={this.toggleEditing.bind(this, false)}
            onDelete={this.removeTodo.bind(this)}
            onSave={this.renameTodo.bind(this)}
          />
        }
      </li>
    )
  }
}

export default Todo;
