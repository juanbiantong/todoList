import moment from "moment";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { MdDelete, MdEdit } from "react-icons/md";
import { useDispatch } from "react-redux";
import { deleteTodo, updateStatus } from "../slices/todoSlice";
import Modal from "./Modal";

const child = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

function TodoItem({ todo }) {
  const dispatch = useDispatch();
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (todo.taskStatus === "completed") {
      setChecked(true);
    } else {
      setChecked(false);
    }
  }, [todo.taskStatus]);

  const handleDelete = () => {
    dispatch(deleteTodo(todo.id));
    toast.success("Task deleted successfully");
  };
  const handleUpdate = () => {
    setUpdateModalOpen(true);
  };

  const handleCheckBox = () => {
    if (checked === false) {
      setChecked(true);
      dispatch(
        updateStatus({
          ...todo,
          taskStatus: "completed",
        })
      );
    } else {
      setChecked(false);
      dispatch(
        updateStatus({
          ...todo,
          taskStatus: "incomplete",
        })
      );
    }
  };
  return (
    <>
      <motion.div
        variants={child}
        className='flex  justify-between p-3 w-full bg-white my-3 rounded-lg font-semibold '
      >
        <div className='flex items-center'>
          <input
            checked={checked}
            onChange={handleCheckBox}
            id='inline-checkbox'
            type='checkbox'
            value=''
            className='mr-3 w-6 h-6 '
          />
          <div className='flex flex-col '>
            <p
              className={`${
                todo.taskStatus === "completed"
                  ? "line-through text-slate-400"
                  : ""
              } w-full`}
            >
              {todo.taskName}
            </p>
            <p className='text-xs text-slate-600'>
              {moment(todo.time).format("Do MMMM YYYY, hh:mm a")}
            </p>
          </div>
        </div>
        <div className='flex items-center '>
          <div
            onClick={handleDelete}
            onKeyDown={handleDelete}
            role='button'
            tabIndex={0}
            className='rounded-md mr-2 bg-slate-200 p-1'
          >
            <MdDelete className='w-7 h-7 ' />
          </div>
          <div
            onClick={handleUpdate}
            onKeyDown={handleUpdate}
            role='button'
            tabIndex={0}
            className='rounded-md bg-slate-200 p-1'
          >
            <MdEdit className='w-7 h-7 ' />
          </div>
        </div>
      </motion.div>

      <Modal
        todo={todo}
        type={"update"}
        modalOpen={updateModalOpen}
        setModalOpen={setUpdateModalOpen}
      />
    </>
  );
}

export default TodoItem;
