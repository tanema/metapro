import React, { Component } from 'react'
import Todo from 'components/Todo'
import { SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE } from 'constants/FilterTypes';

class List extends Component {
  get todos() {
    let { todos, filter } = this.props;
    return todos.reduce(function (accum, todo) {
      if (filter == SHOW_ALL){
        accum.push(todo);
      } else if (filter == SHOW_COMPLETED && todo.done) {
        accum.push(todo);
      } else if (filter == SHOW_ACTIVE && !todo.done) {
        accum.push(todo);
      }
      return accum;
    }, []);
  }

  get todo_ids() {
    return this.todos.map((todo) => todo.id);
  }

  get activeTodoCount() {
    return this.todos.reduce(function (accum, todo) {
        return todo.done ? accum : accum + 1;
    }, 0);
  }

  toggleAll (e) {
    this.props.toggleAllTodos(this.todo_ids, e.target.checked)
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
          {this.todos.map((todo) =>
            <Todo
              key={todo.id}
              todo={todo}
              addTodo={this.props.addTodo}
              renameTodo={this.props.renameTodo}
              toggleTodo={this.props.toggleTodo}
              deleteTodo={this.props.deleteTodo}
            />
          )}
        </ul>
      </section>
    )
  }
}

export default List;
