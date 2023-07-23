import axios from 'axios';
import Layout from '../../../components/layout/Layout';
import { RiCalendarTodoFill, RiEditFill, RiDeleteBin5Line } from 'react-icons/ri';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [input, setInput] = useState({
    category: '',
    color: '',
  });
  const [isEdit, setIsEdit] = useState(false);
  const [isAdd, setIsAdd] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [currentId, setCurrentId] = useState(0);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/categories`, {
        headers: { authorization: 'Bearer ' + Cookies.get('token') },
      })
      .then((res) => {
        setCategories([...res.data]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [isAdd, isEdit, isDelete]);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInput({ ...input, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (currentId === 0) {
      axios
        .post('http://localhost:8000/api/categories', input, {
          headers: { authorization: 'Bearer ' + Cookies.get('token') },
        })
        .then((res) => {
          setIsAdd(false);
          setCurrentId(0);
          setInput({ category: '', color: '' });
          setCategories([...categories, res.data]);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      axios
        .put(`http://localhost:8000/api/categories/${currentId}`, input, {
          headers: { authorization: 'Bearer ' + Cookies.get('token') },
        })
        .then((res) => {
          setIsEdit(false);
          setCurrentId(0);
          setInput({ category: '', color: '' });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleEdit = (id) => {
    setIsEdit(true);
    setCurrentId(id);
    setInput(categories.find((cat) => cat.id === id));
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:8000/api/categories/${id}`, {
        headers: { authorization: 'Bearer ' + Cookies.get('token') },
      })
      .then((res) => {
        setIsDelete(false);
        setCategories(categories.filter((cat) => cat.id !== id));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <Layout>
      <div>
        <h2 className="text-2xl font-semibold text-gray-700 mb-6">Master Category</h2>
        <div className="container mx-auto mb-3">
          <div className="min-w-0 p-4 bg-white rounded-lg shadow-xs">
            <form className="px-1 pt-1" onSubmit={handleSubmit}>
              <label className="block text-sm mb-3">
                <input
                  onChange={handleChange}
                  value={input.category}
                  name="category"
                  type="text"
                  className=" block w-full text-sm focus:border-purple-400 focus:outline-none focus:shadow-outline-purple form-input border py-1 px-2 rounded-lg"
                  placeholder="Category"
                  required
                />
              </label>
              <label className="block text-sm mb-3">
                <select
                  onChange={handleChange}
                  value={input.color}
                  name="color"
                  className="block w-full text text-sm form-select focus:border-purple-400 focus:outline-none focus:shadow-outline-purple border py-1 px-2 rounded-lg"
                  required
                >
                  <option value="" disabled>
                    Select Color
                  </option>
                  <option value="red">Red</option>
                  <option value="yellow">Yellow</option>
                  <option value="green">Green</option>
                  <option value="blue">Blue</option>
                  <option value="orange">Orange</option>
                  <option value="purple">Purple</option>
                </select>
              </label>
              <div className="flex justify-end text-center space-x-1">
                <button
                  onClick={() => {
                    if (isEdit) {
                      setIsEdit(false);
                    } else {
                      setIsAdd(false);
                    }
                    setCurrentId(0);
                    setInput({
                      category: '',
                      color: '',
                    });
                  }}
                  className="px-2 py-1 text-xs font-medium text-white transition-colors duration-150 bg-red-600 border border-transparent rounded-md active:bg-red-600 hover:bg-red-700 focus:outline-none focus:shadow-outline-red"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-2 py-1 text-xs font-medium text-white transition-colors duration-150 bg-indigo-600 border border-transparent rounded-md active:bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:shadow-outline-indigo"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="w-full overflow-hidden rounded-lg shadow-xs">
          <div className="w-full overflow-x-auto">
            <table className="w-full whitespace-no-wrap">
              <thead>
                <tr className="text-xs font-semibold tracking-wide text-center text-gray-500 uppercase border-b bg-gray-50">
                  <th className="px-4 py-3">Category</th>
                  <th className="px-4 py-3">Color</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y">
                {categories.map((category) => {
                  return (
                    <tr key={category.id}>
                      <td className="px-4 py-3 text-sm">{category.category}</td>
                      <td className="px-4 py-3 text-sm">{category.color}</td>
                      <td className="px-6 py-2 text-center">
                        {' '}
                        <button onClick={() => handleDelete(category.id)} className="mr-2">
                          <RiDeleteBin5Line size={18} className="text-gray-400 hover:text-blue-900" />{' '}
                        </button>
                        <button onClick={() => handleEdit(category.id)}>
                          <RiEditFill size={18} className="text-blue-700 hover:text-blue-900" />{' '}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Category;
