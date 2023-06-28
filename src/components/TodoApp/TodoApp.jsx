import React from 'react'
import TodoTab from '../TodoTab/TodoTab'
import "./TodoApp.css"
function TodoApp() {
    return (
        <div>
            <h1 className='header'>#todo</h1>
            <TodoTab />
        </div>
    )
}

export default TodoApp