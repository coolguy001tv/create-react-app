import React, { Component,PropTypes } from 'react';
import {connect} from 'react-redux';
import {addTodo, completeTodo,setVisibilityFilter,VisibilityFilters} from './actions';
import AddTodo from './components/AddTodo';
import TodoList from './components/TodoList';
import Footer from './components/Footer';
import './App.css';

class App extends Component {
  render() {
      const {dispatch, visibleTodos, visibilityFilter,todos} = this.props;
    return (
      <div>
          <AddTodo onAddClick={text => dispatch(addTodo(text))}/>
          <TodoList
            todos={visibleTodos}
            onTodoClick={index => dispatch(completeTodo(index))}
          />
          <Footer
            filter={visibilityFilter}
            todos={todos}
            selectTodos={selectTodos}
            onFilterChange={nextFilter=>dispatch(setVisibilityFilter(nextFilter))}
          />
      </div>
    );
  }
}

App.propTypes = {
    visibleTodos: PropTypes.arrayOf(PropTypes.shape({
        text: PropTypes.string.isRequired,
        completed: PropTypes.bool.isRequired
    }).isRequired).isRequired,
    visibilityFilter: PropTypes.oneOf([
        'SHOW_ALL',
        'SHOW_COMPLETED',
        'SHOW_ACTIVE'
    ]).isRequired
}

function selectTodos(todos, filter) {
    switch (filter) {
        case VisibilityFilters.SHOW_ALL:
            return todos
        case VisibilityFilters.SHOW_COMPLETED:
            return todos.filter(todo => todo.completed)
        case VisibilityFilters.SHOW_ACTIVE:
            return todos.filter(todo => !todo.completed)
        default:
            return todos
    }
}

// Which props do we want to inject, given the global state?
// Note: use https://github.com/faassen/reselect for better performance.
function select(state) {
    return {
        todos:state.todos,
        visibleTodos: selectTodos(state.todos, state.visibilityFilter),
        visibilityFilter: state.visibilityFilter
    }
}

// 包装 component ，注入 dispatch 和 state 到其默认的 connect(select)(App) 中；
export default connect(select)(App)
