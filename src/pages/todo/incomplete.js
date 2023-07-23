import { useEffect, useState } from 'react';
import Card from '../../../components/incomplete/Card';
import Layout from '../../../components/layout/Layout';
import axios from 'axios';
import Cookies from 'js-cookie';
import Add from '../../../components/incomplete/Add';
import Edit from '../../../components/incomplete/Edit';
import Category from '../../../components/incomplete/Category';

const Incomplete = () => {
  const [todos, setTodos] = useState([]);
  const [isAdd, setIsAdd] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [addCategory, setAddCategory] = useState(false);
  const [deleteCategory, setDeleteCategory] = useState(false);
  const [currentId, setCurrentId] = useState(0);

  useEffect(() => {
    axios
      .get('http://localhost:8000/api/todos/incomplete', {
        headers: { authorization: 'Bearer ' + Cookies.get('token') },
      })
      .then((res) => {
        setTodos([...res.data]);
        setAddCategory(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [isAdd, isEdit, isDelete, addCategory, deleteCategory]);
  return (
    <>
      <Layout>
        <div className="grid grid-cols-3 grid-flow-row gap-2">
          <div className={isEdit === true ? 'col-span-2' : 'col-span-3'}>
            <h2 className="text-2xl font-semibold text-gray-700 mb-6">To Do</h2>
            <Add isAdd={isAdd} setIsAdd={setIsAdd} />
            <div className="container grid grid-cols-1 gap-3">
              {todos.map((todo) => {
                return (
                  <Card
                    todo={todo}
                    isEdit={isEdit}
                    setIsEdit={setIsEdit}
                    isDelete={isDelete}
                    setIsDelete={setIsDelete}
                    currentId={currentId}
                    setCurrentId={setCurrentId}
                    addCategory={addCategory}
                    setAddCategory={setAddCategory}
                    deleteCategory={deleteCategory}
                    setDeleteCategory={setDeleteCategory}
                    key={todo.id}
                  />
                );
              })}
            </div>
          </div>
          <div>
            {isEdit && <Edit isEdit={isEdit} setIsEdit={setIsEdit} currentId={currentId} setCurrentId={setCurrentId} />}
            {isEdit && <Category currentId={currentId} addCategory={addCategory} setAddCategory={setAddCategory} />}
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Incomplete;
