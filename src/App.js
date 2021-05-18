import React, { Component } from 'react';
import List from "./components/List/List";
import FilterItems from "./components/FilterItems/FilterItems";



const todos = [
  { id: 1, name: 'Learn React' },
  { id: 2, name: 'Make awesome website' },
  { id: 3, name: 'Find good job' },
  { id: 4, name: 'Well Done' },
];

const getTodos = async () =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve(todos);
    }, 500);
  });

export default class App extends Component {
  state = {
    todos: null,
    hasError: false,
    term: ''
  };

  componentDidMount() {
    getTodos()
      .then(todos => {
        console.log(todos);

        this.setState({
          todos,
        });
      })
      .catch(error => {
        console.log('eer');
        this.setState({
          hasError: true,
        });
      });
  }

  deleteHandler = id => {
    const newTodos = this.state.todos.filter(({ id: itemId }) => id !== itemId);
    this.setState({
      todos: newTodos,
    });
  };

  addHandler = () => {
    const { todos } = this.state;
    const txt = document.getElementById('newTodo');

    if (txt.value !== '') {
      const newId = todos[todos.length - 1].id + 1;
      this.setState({
        todos: [
          ...todos,
          {
            id: newId,
            name: txt.value,
          },
        ],
      });
      txt.value = '';
    }
  };

  //TODO:
  // 1. ADD filter for todo items (start filtering when search key length >= 3)
  searchTodo = (items, term) => {
    if (term.length < 3) return items;
    return items.filter(item => typeof item === 'object' && item.name.toLowerCase().indexOf(term) > -1)
  }

  filterItems = (term) => {
    this.setState({
      term
    })
  }

  render() {
    const { deleteHandler, addHandler } = this;
    const { todos, hasError, term} = this.state;
    const visibleTodos = this.searchTodo(todos, term);

    if (hasError && todos === null) return <p>Server ERROR</p>;
    if (todos === null) return <p>Loading...</p>;

    return (
      <div>
        <h1>My Todos LIST</h1>
        <FilterItems filterItems={this.filterItems}/>
        <List items={visibleTodos} clickHandler={deleteHandler} />
        <br />
        Enter new todo:
        <input id='newTodo' type='text' />
        <button onClick={addHandler}>Add</button>
      </div>
    );
  }
}
