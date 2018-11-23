import React, { Component } from 'react';
import Input from 'components/Input'

class AddTodo extends Component {
  handleSave (text) {
    this.props.addTodo({text: text})
  }

  render () {
    return (
      <header className='header'>
        <Input
          className="new-todo"
          placeholder="What needs to be done?"
          onSave={this.handleSave.bind(this)}
        />
      </header>
    )
  }
}

export default AddTodo;
