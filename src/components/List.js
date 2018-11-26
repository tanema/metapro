import React, { Component } from 'react'
import Todo from 'components/Todo'

class List extends Component {
  get activeTodoCount() {
    return this.props.metafields.reduce(function (accum, field) {
        return field.value.done ? accum : accum + 1;
    }, 0);
  }

  toggleAll (e) {
    this.props.toggleAllTodos(e.target.checked)
  }

  render () {
    return (
      <section className='main'>
        <input
          className="toggle-all"
          type="checkbox"
          onChange={this.toggleAll.bind(this)}
          checked={this.activeTodoCount === 0}
        />
        <ul className='todo-list'>
          {this.props.metafields.map((field) =>
            <Todo
              key={field.id}
              field={field}
              refetch={this.props.refetch}/>
          )}
        </ul>
      </section>
    )
  }
}

export default List;
