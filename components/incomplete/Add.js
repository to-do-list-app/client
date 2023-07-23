import axios from 'axios';
import Cookies from 'js-cookie';
import { useState } from 'react';
import { RiAddCircleLine } from 'react-icons/ri';

const Add = ({ isAdd, setIsAdd }) => {
  const [input, setInput] = useState({
    task: '',
    description: '',
    priority: '',
    status: 'incomplete',
    due_date: '',
  });

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInput({ ...input, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post('http://localhost:8000/api/todos', input, {
        headers: { authorization: 'Bearer ' + Cookies.get('token') },
      })
      .then((res) => {
        setIsAdd(false);
        setInput({ task: '', description: '', priority: '', status: 'incomplete', due_date: '' });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="container mx-auto ml-0 mb-3">
      <div className="min-w-0 p-4 bg-white rounded-lg shadow-xs">
        {!isAdd && (
          <div
            className="flex items-center"
            onClick={() => {
              setIsAdd(true);
            }}
          >
            <RiAddCircleLine size={18} className="mr-2" />
            <h4 className="text-gray-600 inline text-sm">Add a Task</h4>
          </div>
        )}
        {isAdd && (
          <form className="px-1" onSubmit={handleSubmit}>
            <label className="block text-sm mb-3">
              <input
                onChange={handleChange}
                value={input.task}
                name="task"
                type="text"
                className=" pl-1 block w-full text-sm focus:border-purple-400 focus:outline-none focus:shadow-outline-purple form-input border-b pb-2"
                placeholder="Task"
                required
              />
            </label>
            <label className="block text-sm mb-3">
              <input
                onChange={handleChange}
                value={input.description}
                name="description"
                type="text"
                className="pl-1 block w-full text-sm focus:border-purple-400 focus:outline-none focus:shadow-outline-purple form-input border-b pb-2"
                placeholder="Description"
                required
              />
            </label>
            <label className="block text-sm mb-3">
              <select
                onChange={handleChange}
                value={input.priority}
                name="priority"
                className="block w-full text text-sm form-select focus:border-purple-400 focus:outline-none focus:shadow-outline-purple border-b pb-2"
                required
              >
                <option value="" disabled>
                  Select Priority
                </option>
                <option value="low">Low</option>
                <option value="moderate">Moderate</option>
                <option value="important">Important</option>
              </select>
            </label>
            <label className="block text-sm mb-4">
              <input
                onChange={handleChange}
                value={input.due_date}
                name="due_date"
                type="date"
                className="pl-1 block w-full text-sm focus:border-purple-400 focus:outline-none focus:shadow-outline-purple form-input border-b pb-2"
                placeholder="Due Date"
                required
              />
            </label>
            <div className="flex justify-end text-center space-x-1">
              <button
                onClick={() => {
                  setIsAdd(false);
                }}
                className="px-2 py-1 text-xs font-medium text-white transition-colors duration-150 bg-red-600 border border-transparent rounded-md active:bg-red-600 hover:bg-red-700 focus:outline-none focus:shadow-outline-red"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-2 py-1 text-xs font-medium text-white transition-colors duration-150 bg-indigo-600 border border-transparent rounded-md active:bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:shadow-outline-indigo"
              >
                Add
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Add;
