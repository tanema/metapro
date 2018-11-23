import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import { SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE } from 'constants/FilterTypes';

class Footer extends Component {
  get completedTodoIDs() {
    return this.props.todos.reduce(function (accum, todo) {
      if (todo.done) {
        accum.push(todo.id);
      }
      return accum;
    }, []);
  }

  get activeTodoCount() {
    return this.props.todos.reduce(function (accum, todo) {
        return todo.done ? accum : accum + 1;
    }, 0);
  }

  setStatus(status) {
    this.props.setFilter(status)
  }

  render () {
    const { filter } = this.props;
    return (
      <footer className="footer">
        <span className="todo-count">
          <strong>{ this.activeTodoCount }</strong> left
        </span>
        <ul className="filters">
          <li>
            <a
              onClick={this.setStatus.bind(this, SHOW_ALL)}
              className={classNames({selected: filter === SHOW_ALL})}
            > All </a>
          </li>
          <li>
            <a
              onClick={this.setStatus.bind(this, SHOW_ACTIVE)}
              className={classNames({selected: filter === SHOW_ACTIVE})}
            > Active </a>
          </li>
          <li>
            <a
              onClick={this.setStatus.bind(this, SHOW_COMPLETED)}
              className={classNames({selected: filter === SHOW_COMPLETED})}
            > Completed </a>
          </li>
        </ul>
        <button
          className="clear-completed"
          onClick={this.props.clearCompleted}>
          Clear completed
        </button>
      </footer>

    )
  }
}

export default Footer;
