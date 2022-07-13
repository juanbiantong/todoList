import React, { useEffect, useState } from "react";
import { MdOutlineClose } from "react-icons/md";
import { v4 as uuid } from "uuid";
import { useDispatch } from "react-redux";
import { addTodo, updateTodo } from "../slices/todoSlice";
import toast from "react-hot-toast";

export default function Modal({ type, modalOpen, setModalOpen, todo }) {
  const dispatch = useDispatch();
  const [taskName, setTaskName] = useState("");
  const [taskDesc, setTasckDesc] = useState("");

  useEffect(() => {
    if (type === "update" && todo) {
      setTaskName(todo.taskName);
      setTasckDesc(todo.taskDesc);
    } else {
      setTaskName("");
      setTasckDesc("");
    }
  }, [type, todo, modalOpen]);

  const handleSubmit = e => {
    e.preventDefault();
    if (taskName === "") {
      toast.error("Task name cannot be empty");
      return;
    }
    if (taskName) {
      if (type === "add") {
        dispatch(
          addTodo({
            id: uuid(),
            taskName,
            taskDesc,
            taskStatus: "incomplete",
            time: new Date().toLocaleString(),
          })
        );
        toast.success("Task Added Succesfully");
      }

      if (type === "update") {
        if (todo.taskName !== taskName || todo.taskDesc !== taskDesc) {
          dispatch(
            updateTodo({
              ...todo,
              taskName,
              taskDesc,
            })
          );
          toast.success("Task Updated Succesfully");
        } else {
          toast.error("No Changes Made");
        }
      }
      setModalOpen(false);
    }
  };
  return (
    modalOpen && (
      <div className='wrapper'>
        <div className='container'>
          <div
            className='closeButton'
            onClick={() => setModalOpen(false)}
            onKeyDown={() => setModalOpen(false)}
            tabIndex={0}
            role='button'
          >
            <MdOutlineClose />
          </div>
          <form className='form-modal' onSubmit={e => handleSubmit(e)}>
            <h1 className='uppercase font-semibold text-slate-700 mb-3'>
              {type === "add" ? "Add New" : "Update"} Task
            </h1>
            <label className='text-slate-500' htmlFor='title'>
              Name
              <input
                type='text'
                id='title'
                value={taskName}
                onChange={e => {
                  setTaskName(e.target.value);
                }}
              />
            </label>
            <label className='text-slate-500' htmlFor='desc'>
              Description
              <textarea
                name=''
                id='desc'
                rows='5'
                value={taskDesc}
                onChange={e => setTasckDesc(e.target.value)}
              ></textarea>
            </label>
            <div className='flex'>
              <button
                type='submit'
                className='text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-600 dark:focus:ring-blue-800'
              >
                {type === "add" ? "Add" : "Update"} Task
              </button>
              <button
                type='button'
                onClick={() => setModalOpen(false)}
                onKeyDown={() => setModalOpen(false)}
                className='text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900'
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  );
}
