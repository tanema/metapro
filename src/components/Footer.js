import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import { SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE } from 'constants/FilterTypes';

class Footer extends Component {
  setStatus(status) {
    this.props.setFilter(status)
  }

  render () {
    const { filter, metafields } = this.props;
    return (
      <footer className="footer">
        <span className="todo-count">
          <strong>{ metafields.filter((field) => !field.value.done).length }</strong> left
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
