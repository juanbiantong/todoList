import React from "react";
import { useSelector } from "react-redux";
import TodoItem from "./TodoItem";

export default function TodoList() {
  const todoList = useSelector(state => state.todo.todoList);
  const sortedTodoList = [...todoList];
  sortedTodoList.sort((a, b) => new Date(b.time) - new Date(a.time));
  return (
    <>
      {sortedTodoList && sortedTodoList.length > 0 ? (
        <div className='flex flex-col mx-5 px-3 bg-slate-100 rounded-lg'>
          {sortedTodoList.map(todo => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
        </div>
      ) : (
        <div className='flex justify-center mx-5 py-3 bg-slate-100 rounded-lg'>
          <div>No todo found</div>
        </div>
      )}
    </>
  );
}
