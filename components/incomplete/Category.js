import axios from 'axios';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';

const Category = ({ currentId, addCategory, setAddCategory }) => {
  const [categories, setCategories] = useState([]);
  const [input, setInput] = useState({
    category_id: '',
  });

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/categories`, {
        headers: { authorization: 'Bearer ' + Cookies.get('token') },
      })
      .then((res) => {
        setCategories([...res.data]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInput({ ...input, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post(`http://localhost:8000/api/todos/${currentId}/category`, input, {
        headers: { authorization: 'Bearer ' + Cookies.get('token') },
      })
      .then((res) => {
        setAddCategory(false);
        setInput({ category_id: '' });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="container mx-auto">
      <div className="min-w-0 p-4 bg-white rounded-lg shadow-xs">
        <form className="px-1" onSubmit={handleSubmit}>
          <label className="block text-sm mb-3">
            <select
              onChange={handleChange}
              value={input.category_id}
              name="category_id"
              className="block w-full text text-sm form-select focus:border-purple-400 focus:outline-none focus:shadow-outline-purple border-b pb-2"
              required
            >
              <option value="" disabled>
                Add Category
              </option>
              {categories.map((category) => {
                return (
                  <option value={category.id} key={category.id}>
                    {category.category}
                  </option>
                );
              })}
            </select>
          </label>
          <div className="flex justify-end text-center space-x-1">
            <button
              type="submit"
              className="px-2 py-1 text-xs font-medium text-white transition-colors duration-150 bg-indigo-600 border border-transparent rounded-md active:bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:shadow-outline-indigo"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Category;
