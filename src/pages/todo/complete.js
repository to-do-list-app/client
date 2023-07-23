import { useEffect, useState } from 'react';
import Card from '../../../components/complete/Card';
import Layout from '../../../components/layout/Layout';
import axios from 'axios';
import Cookies from 'js-cookie';

const Complete = () => {
  const [todos, setTodos] = useState([]);
  const [isDelete, setIsDelete] = useState(false);
  const [currentId, setCurrentId] = useState(0);

  useEffect(() => {
    axios
      .get('http://localhost:8000/api/todos/complete', {
        headers: { authorization: 'Bearer ' + Cookies.get('token') },
      })
      .then((res) => {
        setTodos([...res.data]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [isDelete]);
  return (
    <>
      <Layout>
        <div className="grid grid-cols-1 grid-flow-row gap-2">
          <div>
            <h2 className="text-2xl font-semibold text-gray-700 mb-6">Complete</h2>
            <div className="container grid grid-cols-1 gap-3">
              {todos.map((todo) => {
                return <Card todo={todo} isDelete={isDelete} setIsDelete={setIsDelete} currentId={currentId} setCurrentId={setCurrentId} key={todo.id} />;
              })}
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Complete;
