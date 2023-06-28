import React, { useState, useEffect } from 'react';
import "./TodoTab.css"
function TodoTab() {
    const [tasks, setTasks] = useState([]);
    const [activeTab, setActiveTab] = useState('all');
    useEffect(() => {
        const storedTasks = localStorage.getItem('tasks');
        if (storedTasks) {
            setTasks(JSON.parse(storedTasks));
        }
    }, []);

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    const handleAddTask = (taskContent) => {
        const newTask = {
            id: Date.now(),
            content: taskContent,
            completed: false,
        };
        setTasks([...tasks, newTask]);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };

    const handleToggleTask = (taskId) => {
        const updatedTasks = tasks.map((task) => {
            if (task.id === taskId) {
                return {
                    ...task,
                    completed: !task.completed,
                };
            }
            return task;
        });
        setTasks(updatedTasks);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };

    const handleDeleteTask = (taskId) => {
        const updatedTasks = tasks.filter((task) => task.id !== taskId);
        setTasks(updatedTasks);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };

    const handleDeleteAllTasks = () => {
        setTasks([]);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };

    return (
        <div className="todo-tab-container">
            <div className="tab-buttons">
                <button
                    className={`tab-button ${activeTab === 'all' ? 'active' : ''}`}
                    onClick={() => handleTabClick('all')}
                >
                    All
                </button>
                <button
                    className={`tab-button ${activeTab === 'active' ? 'active' : ''}`}
                    onClick={() => handleTabClick('active')}
                >
                    Active
                </button>
                <button
                    className={`tab-button ${activeTab === 'completed' ? 'active' : ''}`}
                    onClick={() => handleTabClick('completed')}
                >
                    Completed
                </button>
            </div>
            <div className="task-list">
                {activeTab === 'all' && (
                    <div>
                        <div className="add-task-form">
                            <form className='form-task'
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    const taskContent = e.target.task.value;
                                    if (taskContent.trim() !== '') {
                                        handleAddTask(taskContent);
                                        e.target.task.value = '';
                                    }
                                }}
                            >
                                <input
                                    type="text"
                                    name="task"
                                    placeholder="Add details"
                                    className="task-input"
                                />
                                <button type="submit" className="add-button">
                                    Add
                                </button>
                            </form>
                        </div>
                        <ul>
                            {tasks.map((task) => (
                                <li key={task.id} className="task-item">
                                    <input
                                        type="checkbox"
                                        checked={task.completed}
                                        onChange={() => handleToggleTask(task.id)}
                                    />
                                    <span
                                        className={`task-content ${task.completed ? 'completed' : ''
                                            }`}
                                    >
                                        {task.content}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>

                )}
                {activeTab === 'active' && (
                    <div>
                        <div className="add-task-form">
                            <form className='form-task'
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    const taskContent = e.target.task.value;
                                    if (taskContent.trim() !== '') {
                                        handleAddTask(taskContent);
                                        e.target.task.value = '';
                                    }
                                }}
                            >
                                <input
                                    type="text"
                                    name="task"
                                    placeholder="Add details"
                                    className="task-input"
                                />
                                <button type="submit" className="add-button">
                                    Add
                                </button>
                            </form>
                        </div>
                        <ul>
                            {tasks
                                .filter((task) => !task.completed)
                                .map((task) => (
                                    <li key={task.id} className="task-item">
                                        <input
                                            type="checkbox"
                                            checked={task.completed}
                                            onChange={() => handleToggleTask(task.id)}
                                        />
                                        <span className="task-content">{task.content}</span>
                                    </li>
                                ))}
                        </ul>
                    </div>
                )}
                {activeTab === 'completed' && (
                    <ul>
                        {tasks
                            .filter((task) => task.completed)
                            .map((task) => (
                                <li key={task.id} className="task-item">
                                    <input
                                        type="checkbox"
                                        checked={task.completed}
                                        onChange={() => handleToggleTask(task.id)}
                                    />
                                    <span className="task-content completed">
                                        {task.content}
                                    </span>
                                    <button
                                        className="delete-button"
                                        onClick={() => handleDeleteTask(task.id)}
                                    >
                                        <i className="fa-solid fa-trash"></i>
                                    </button>
                                </li>
                            ))}
                        <div className='delete-all'>
                            <button className="delete-all-button" onClick={handleDeleteAllTasks}>
                                <i className="fa-solid fa-trash"></i>  Delete All
                            </button>
                        </div>
                    </ul>

                )}
            </div>

        </div>
    );
}

export default TodoTab;