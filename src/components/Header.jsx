import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateFilterStatus } from "../slices/todoSlice";
import Modal from "./Modal";

export default function Header() {
  const dispatch = useDispatch();
  const filterStatus = useSelector(state => state.todo.filterStatus);
  const [modalOpen, setModalOpen] = useState(false);

  const updateFilter = e => {
    dispatch(updateFilterStatus(e.target.value));
  };

  return (
    <div className='flex flex-col px-3'>
      <h1 className='text-2xl text-center text-blue-600 font-semibold p-5 '>
        TODO LIST
      </h1>
      <div className='flex justify-between'>
        <button
          onClick={() => setModalOpen(true)}
          type='button'
          className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 shadow-lg'
        >
          Add New Task
        </button>
        <div>
          <select
            role='button'
            value={filterStatus}
            onChange={updateFilter}
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 shadow-lg'
          >
            <option value='all'>All</option>
            <option value='completed'>Completed</option>
            <option value='incomplete'>Inclomplete</option>
          </select>
        </div>
      </div>
      <Modal type={"add"} modalOpen={modalOpen} setModalOpen={setModalOpen} />
    </div>
  );
}
