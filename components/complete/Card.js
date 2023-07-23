import axios from 'axios';
import Cookies from 'js-cookie';
import { RiCalendarTodoFill, RiEditFill, RiDeleteBin5Line } from 'react-icons/ri';

const Card = ({ todo, setIsDelete }) => {
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

  return (
    <div className="container mx-auto">
      <div className="min-w-0 p-4 bg-white rounded-lg shadow-xs">
        <div className="flex flex-row items-center">
          <div className="w-10/12">
            <h4 className="mb-1 font-semibold text-gray-600 text-sm"><del>{todo.task}</del></h4>
            <p className="text-gray-600 text-xs mb-2"><del>{todo.description}</del></p>
            <div className="flex flex-row justify-start items-center text-grey-600">
              <div className="flex flex-row justify-start space-x-1 mr-3">
                <RiCalendarTodoFill size={15} />
                <p className="text-gray-600 text-xs">Due, {new Date(todo.due_date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
              </div>
              <div className="flex flex-row justify-start space-x-1">
                {todo.TodoCategory.map((cat) => {
                  return (
                    <p key={cat.id} className={`text-${cat.color}-600 text-xs bg-gray-200 px-2 py-1 rounded-lg font-semibold`}>
                      {cat.category}
                    </p>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="w-2/12 text-end">
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
