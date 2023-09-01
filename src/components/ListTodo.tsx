"use client"
import React from 'react'
import { useTodos, Todo } from '@/store/todos'
import { ListGroup } from 'react-bootstrap'

const ListTodo = () => {
    const { todos } = useTodos();
    console.log('todos:: ', todos);
    let filterTodos = todos;
    const handleChange = (tData : Todo) => {
        console.log('Checked ID::', tData);
    }
    return (
        <div>
            <hr></hr>
            <h4>Todo List</h4>
            <ListGroup>
                {
                    filterTodos.map((todo) => {
                        return (
                            <ListGroup.Item key={todo.id}>
                                <input
                                    key={todo.id}
                                    className="form-check-input me-1"
                                    type="checkbox"
                                    value=""
                                    onChange={handleChange(todo)}
                                />
                                {todo.task}
                            </ListGroup.Item>
                        )
                    })
                }
            </ListGroup>
        </div>
    )
}

export default ListTodo;