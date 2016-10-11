/**
 * Created by CoolGuy on 2016/10/8 11:58.
 */
import React, { Component, PropTypes } from 'react'
import Todo from './Todo'

export default class TodoList extends Component {
    render() {
        console.log("todoList");
        return (
            <ul>
                {this.props.todos.map((todo, index) =>
                    <Todo {...todo}
                        key={index}
                        onClick={() => this.props.onTodoClick(index)} />
                )}
            </ul>
        )
    }
}

TodoList.propTypes = {
    onTodoClick: PropTypes.func.isRequired,
    todos: PropTypes.arrayOf(PropTypes.shape({
        text: PropTypes.string.isRequired,
        completed: PropTypes.bool.isRequired
    }).isRequired).isRequired
}