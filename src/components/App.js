import React, { Component } from 'react';
import Metafield from 'resource/metafield';
import AddTodo from 'components/AddTodo';
import List from 'components/List';
import Footer from 'components/Footer';
import { SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE } from 'constants/FilterTypes';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      metafields: [],
      filter: SHOW_ALL
    };
    this.fetch()
  }

  fetch() {
    let { id, resource } = this.props;
    Metafield.fetchAllForResource(resource, id)
      .then((metafields) => this.setState({metafields}))
  }

  get metafields() {
    let { metafields, filter } = this.state;
    return metafields.reduce(function (accum, field) {
      if (filter == SHOW_ALL){
        accum.push(field);
      } else if (filter == SHOW_COMPLETED && field.value.done) {
        accum.push(field);
      } else if (filter == SHOW_ACTIVE && !field.value.done) {
        accum.push(field);
      }
      return accum;
    }, []);
  }

  addTodo(todo) {
    let { id, resource } = this.props;
    Metafield.create(resource, id, todo)
      .then((newMetafield) => {
        let metafields = (this.state.metafields || [])
        metafields.push(newMetafield)
        this.setState({metafields});
      })
  }

  toggleAllTodos(checked) {
   Promise.all(this.metafields.map((field) => {
      field.value.done = checked;
      return field.save()
    })).then(this.fetch.bind(this))
  }

  clearCompleted() {
    Promise.all(this.metafields.map((field) => {
      if (field.value.done) {
        return field.delete()
      }
      return true
    })).then(this.fetch.bind(this))
  }

  setFilter(filter) {
    this.setState({filter});
  }

  render() {
    return (
      <section className="todoapp">
        <AddTodo addTodo={this.addTodo.bind(this)} />
        <List
          metafields={this.metafields}
          filter={this.state.filter}
          toggleAllTodos={this.toggleAllTodos.bind(this)}
          addTodo={this.addTodo.bind(this)}
          refetch={this.fetch.bind(this)}
        />
        <Footer
          metafields={this.state.metafields}
          filter={this.state.filter}
          setFilter={this.setFilter.bind(this)}
          clearCompleted={this.clearCompleted.bind(this)}
        />
      </section>
    );
  }
}

export default App;
