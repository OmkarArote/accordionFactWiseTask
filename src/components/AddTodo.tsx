'use client'
import { useTodos } from '@/store/todos';
import React, { ChangeEvent, FormEvent, useState } from 'react'
import { Form, InputGroup, Button } from 'react-bootstrap'


export default function AddTodo() {
  const [todo, setTodo] = useState("");
  const { handleAddTodo } = useTodos();
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('onSubmit::todo::', todo);
    handleAddTodo(todo);
    setTodo("")
  }
  return (
    <div>
      <form onSubmit={onSubmit}>
        <InputGroup className="mb-3">
          <Form.Control
            placeholder="Recipient's username"
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
            value={todo}
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              // console.log('input Event:: ', event.target.value);
              setTodo(event.target.value)
            }}
          />
          <Button
            variant="outline-secondary"
            id="button-addon2"
            type='submit'
          >
            Button
          </Button>
        </InputGroup>
      </form>
    </div>
  )
}
