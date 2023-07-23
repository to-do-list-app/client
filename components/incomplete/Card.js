import axios from 'axios';
import Cookies from 'js-cookie';
import { RiCalendarTodoFill, RiEditFill, RiDeleteBin5Line } from 'react-icons/ri';

const Card = ({ todo, isEdit, setIsEdit, isDelete, setIsDelete, currentId, setCurrentId, addCategory, setAddCategory, deleteCategory, setDeleteCategory }) => {
  const handleDelete = (todoId) => {
    axios
      .delete(`http://localhost:8000/api/todos/${todoId}`, {
        headers: { authorization: 'Bearer ' + Cookies.get('token') },
      })
      .then((res) => {
        setIsDelete(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleCategoryDelete = (catId) => {
    axios
      .delete(`http://localhost:8000/api/todos/${currentId}/category/${catId}`, {
        headers: { authorization: 'Bearer ' + Cookies.get('token') },
      })
      .then((res) => {
        setDeleteCategory(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="container mx-auto">
      <div className="min-w-0 p-4 bg-white rounded-lg shadow-xs">
        <div className="flex flex-row items-center">
          <div className="w-10/12">
            <h4 className="mb-1 font-semibold text-gray-600 text-sm">{todo.task}</h4>
            <p className="text-gray-600 text-xs mb-2">{todo.description}</p>
            <div className="flex flex-row justify-start items-center text-grey-600">
              <div className="flex flex-row justify-start space-x-1 mr-3">
                <RiCalendarTodoFill size={15} />
                <p className="text-gray-600 text-xs">Due, {new Date(todo.due_date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
              </div>
              <div className="flex flex-row justify-start space-x-1">
                {todo.TodoCategory.map((cat) => {
                  return (
                    <button
                      onClick={() => {
                        setCurrentId(todo.id);
                        setDeleteCategory(true);
                        handleCategoryDelete(cat.id);
                      }}
                      key={cat.id}
                      className={`text-${cat.color}-600 text-xs bg-gray-200 hover:bg-gray-400 px-2 py-1 rounded-lg font-semibold`}
                    >
                      {cat.category}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="w-2/12 text-end">
            <button className="mr-1">
              <RiEditFill
                onClick={() => {
                  setIsEdit(true);
                  setAddCategory(true);
                  setCurrentId(todo.id);
                }}
                size={18}
                className="text-indigo-700 hover:text-indigo-900"
              />
            </button>
            <button>
              <RiDeleteBin5Line
                onClick={() => {
                  setIsDelete(true);
                  handleDelete(todo.id);
                }}
                size={18}
                className="text-gray-400 hover:text-gray-900"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
