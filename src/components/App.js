import React, { Component } from 'react';
import AddTodo from 'components/AddTodo';
import List from 'components/List';
import Footer from 'components/Footer';
import { SHOW_ALL } from 'constants/FilterTypes';

const namespace = 'metapro';
const key = 'todos';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      filter: SHOW_ALL
    };

    let { id, resource, auth } = props;
    fetch(`${this.endpoint}?metafield[owner_id]=${id}&metafield[owner_resource]=${resource}`, {
      headers: {'X-Shopify-Access-Token': auth.access_token},
    }).then((resp) => resp.json())
      .then((resp) => { this.findOurMetafields(resp.metafields) })
  }

  get endpoint() {
    return `https://${location.host}/admin/metafields.json`
  }

  findOurMetafields(metafields) {
    let ourField = metafields.find((metafield) => {
      return metafield.namespace == namespace &&
        metafield.key == key &&
        metafield.value_type == "json_string"
    });
    if (ourField) {
      let todos = JSON.parse(ourField.value)
      this.setState({
        todos,
        id: ourField.id,
      })
    } else {
      fetch(this.endpoint, {
        method: 'POST',
        headers: {
          'X-Shopify-Access-Token': this.props.auth.access_token,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          metafield: {
            key, namespace,
            owner_id: `${this.props.id}`,
            owner_resource : this.props.resource,
            value: "[]",
            value_type: "json_string"
          }
        }),
      }).then((resp) => resp.json())
        .then((resp) => this.setState({id: resp.metafield.id}))
    }
  }

  saveTodos(todos) {
    console.log("saving")
    fetch(`https://${location.host}/admin/metafields/${this.state.id}.json`, {
      method: 'PUT',
      headers: {
        'X-Shopify-Access-Token': this.props.auth.access_token,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        metafield: {
          value: JSON.stringify(todos),
        }
      }),
    }).then((resp) => resp.json())
      .then((resp) => {
        console.log(resp);
        this.setState({todos});
      })
  }

  toggleAllTodos(todo_ids, checked) {
    let { todos } = this.state;
    for(let i = 0; i < todos.length; i++) {
      if (todo_ids.includes(todos[i].id)) { todos[i].done = checked; }
    }
    this.saveTodos(todos);
  }

  addTodo(todo) {
    todo.id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    this.state.todos.push(todo)
    this.saveTodos(this.state.todos);
  }

  renameTodo(todo, newText) {
    let { todos } = this.state;
    for(let i = 0; i < todos.length; i++) {
      if(todos[i].id == todo.id) {
        todos[i].text = newText;
        break
      }
    }
    this.saveTodos(todos);
  }

  toggleTodo(todo) {
    let { todos } = this.state;
    for(let i = 0; i < todos.length; i++) {
      if(todos[i].id == todo.id) {
        todos[i].done = !todos[i].done;
        break
      }
    }
    this.saveTodos(todos);
  }

  deleteTodo(todo) {
    this.saveTodos(this.state.todos.filter((t) => t.id != todo.id));
  }

  setFilter(filter) {
    this.setState({filter});
  }

  clearCompleted() {
    this.saveTodos(this.state.todos.filter((t) => !t.done));
  }

  render() {
    return (
      <section className="todoapp">
        <AddTodo todos={this.state.todos} addTodo={this.addTodo.bind(this)} />
        <List
          todos={this.state.todos}
          filter={this.state.filter}
          toggleAllTodos={this.toggleAllTodos.bind(this)}
          addTodo={this.addTodo.bind(this)}
          renameTodo={this.renameTodo.bind(this)}
          toggleTodo={this.toggleTodo.bind(this)}
          deleteTodo={this.deleteTodo.bind(this)}
        />
        <Footer
          todos={this.state.todos}
          filter={this.state.filter}
          setFilter={this.setFilter.bind(this)}
          clearCompleted={this.clearCompleted.bind(this)}
        />
      </section>
    );
  }
}

export default App;
