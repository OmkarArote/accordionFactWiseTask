'use client'
import { ReactNode, createContext, useContext, useState } from "react";

export type Todo = {
  id: string;
  task: string;
  complete: boolean;
  createdAt: Date;
}

export type TodosContext = {
  todos: Todo;
  handleAddTodo: () => void;
}

export const todosContext = createContext<TodosContext | null>(null)

export const TodosProvider = ({ children }: { children: ReactNode }) => {
  const [todos, setTodo] = useState<Todo[]>([]);
  const handleAddTodo = (task: string) => {
    setTodo((prev) => {
      console.log('prev:: ', prev);
      const newTodos: Todo[] = [
        {
          id: Math.random().toString(),
          task,
          complete: false,
          createdAt: new Date()
        },
        ...prev
      ]
      return newTodos;
    })
  }
  return (
    <todosContext.Provider value={{ todos, handleAddTodo }}>
      {children}
    </todosContext.Provider>
  )
}

export function useTodos() {
  const todosContextValue = useContext(todosContext)
  if (!todosContextValue) {
    throw new Error('UseTodos Used Outside of the Provider')
  }
  return todosContextValue;
}