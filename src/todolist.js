import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addTodo,
  deleteTodo,
  editTodo,
  updateTodo,
  iscompleted,
  sort,
} from "./redux/todoSlice";
import axios from "axios";
const Todo = () => {
  const [input, setInput] = useState("");
  const [todoS, setTodoS] = useState([]);
  const dispatch = useDispatch();

  const { todo, edit } = useSelector((state) => state.todo);

  const onChange = (e) => {
    setInput(e.target.value);
  };

  const sortByOnChange = (e) => {
    dispatch(sort(e.target.value));
  };

  const serverAdd = (input) => {
    console.log(input);
    axios
      .post("http://localhost:8080/addtodo", {
        input: input,
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    getTodo();
  };
  const deleteTodo = (id) => {
    axios
      .delete(`http://localhost:8080/deletetodo/${id}`)
      .then((res) => console.log(res));
    getTodo();
  };
  const getTodo = () => {
    axios
      .get("http://localhost:8080/gettodo")
      .then((res) => setTodoS(res.data));
  };

  useEffect(() => {
    getTodo();
  }, []);

  return (
    <div>
      <p className="title">To Do App</p>
      <input
        className="inputBox"
        placeholder="add your task"
        value={input}
        onChange={onChange}
      />
      {edit ? (
        <button
          className="submitButton edit"
          onClick={() => {
            dispatch(updateTodo(input));
            setInput("");
          }}
        >
          Updata
        </button>
      ) : (
        <button
          className="submitButton"
          onClick={() => {
            serverAdd(input);
            setInput("");
          }}
        >
          Add
        </button>
      )}
      <select className="submitButton" onChange={sortByOnChange} name="cars">
        <option value="unselect">Select a Sorting Option</option>

        <optgroup label="Date">
          <option>Date (new to old)</option>
          <option>Date (old to new)</option>
        </optgroup>
      </select>
      {todoS.map((todo, index) => (
        <div
          key={todo.id}
          className={todo.iscompleted ? "todoItem completed" : "todoItem"}
        >
          <div onClick={() => dispatch(iscompleted(todo.id))}>{todo.value}</div>
          <div>
            <button
              className="submitButton"
              onClick={() => dispatch(editTodo(todo.id))}
            >
              Edit
            </button>
            <button
              className="submitButton"
              onClick={() => deleteTodo(todo.id)}
            >
              X
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Todo;
