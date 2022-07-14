import React from "react";
import { useSelector } from "react-redux";
import TodoItem from "./TodoItem";
import { AnimatePresence, motion } from "framer-motion";

const container = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};
const child = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

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
      <motion.div
        variants={container}
        initial='hidden'
        animate='visible'
        className='flex flex-col mx-5 px-3 bg-slate-100 rounded-lg'
      >
        <AnimatePresence>
          {filteredTodoList && filteredTodoList.length > 0 ? (
            filteredTodoList.map(todo => <TodoItem key={todo.id} todo={todo} />)
          ) : (
            <motion.p variants={child}>No Todos</motion.p>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
}
