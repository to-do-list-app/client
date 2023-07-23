import axios from 'axios';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';

const Edit = ({ isEdit, setIsEdit, currentId, setCurrentId }) => {
  const [input, setInput] = useState({
    task: '',
    description: '',
    priority: '',
    status: '',
    due_date: '',
  });

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/todos/${currentId}`, {
        headers: { authorization: 'Bearer ' + Cookies.get('token') },
      })
      .then((res) => {
        setInput({
          task: res.data.task,
          description: res.data.description,
          priority: res.data.priority,
          status: res.data.status,
          due_date: new Date(res.data.due_date).toISOString().split('T')[0],
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [isEdit, currentId]);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInput({ ...input, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .put(`http://localhost:8000/api/todos/${currentId}`, input, {
        headers: { authorization: 'Bearer ' + Cookies.get('token') },
      })
      .then((res) => {
        setIsEdit(false);
        setInput({ task: '', description: '', priority: '', status: '', due_date: '' });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="container mx-auto mb-2">
      <h2 className="text-2xl font-semibold text-gray-700 mb-6">Update To Do</h2>
      <div className="min-w-0 p-4 bg-white rounded-lg shadow-xs">
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
          <label className="block text-sm mb-3">
            <select
              onChange={handleChange}
              value={input.status}
              name="status"
              className="block w-full text text-sm form-select focus:border-purple-400 focus:outline-none focus:shadow-outline-purple border-b pb-2"
              required
            >
              <option value="" disabled>
                Select Status
              </option>
              <option value="incomplete">Incomplete</option>
              <option value="complete">Complete</option>
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
                setIsEdit(false);
                setCurrentId(0);
              }}
              className="px-2 py-1 text-xs font-medium text-white transition-colors duration-150 bg-red-600 border border-transparent rounded-md active:bg-red-600 hover:bg-red-700 focus:outline-none focus:shadow-outline-red"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-2 py-1 text-xs font-medium text-white transition-colors duration-150 bg-indigo-600 border border-transparent rounded-md active:bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:shadow-outline-indigo"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Edit;
