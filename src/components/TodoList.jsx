import React from "react";
import { useSelector } from "react-redux";
import TodoItem from "./TodoItem";

export default function TodoList() {
  const todoList = useSelector(state => state.todo.todoList);
  const filterStatus = useSelector(state => state.todo.filterStatus);
  const sortedTodoList = [...todoList];
  sortedTodoList.sort((a, b) => new Date(b.time) - new Date(a.time));

  const filteredTodoList = sortedTodoList.filter(item => {
    if (filterStatus === "all") {
      return true;
    }
    return item.taskStatus === filterStatus;
  });

  return (
    <>
      {filteredTodoList && filteredTodoList.length > 0 ? (
        <div className='flex flex-col mx-5 px-3 bg-slate-100 rounded-lg'>
          {filteredTodoList.map(todo => (
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
