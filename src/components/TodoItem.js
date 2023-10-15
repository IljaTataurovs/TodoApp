// Todo.js
import React, { useState } from "react";
import TodoForm from "./TodoForm";
import { RiCloseCircleLine } from "react-icons/ri";
import { TiEdit } from "react-icons/ti";
import { FaCheckCircle } from "react-icons/fa";

const Todo = ({ todos, completeTodo, removeTodo, updateTodo, markTodo, unmarkTodo }) => {
  const [editTodo, setEditTodo] = useState({
    id: null,
    value: "",
  });

  const submitUpdate = (value) => {
    updateTodo(editTodo.id, value);
    setEditTodo({
      id: null,
      value: "",
    });
  };

  if (editTodo.id) {
    return <TodoForm edit={editTodo} onSubmit={submitUpdate} />;
  }

  return todos.map((todo, index) => (
    <div className={todo.isComplete ? "todo-row complete" : "todo-row"} key={index}>
      <div key={todo.id} onClick={() => completeTodo(todo.id)}>
        {todo.text}
      </div>
      <div className="icons">
        <RiCloseCircleLine onClick={() => removeTodo(todo.id)} className="delete-icon" />
        <TiEdit onClick={() => setEditTodo({ id: todo.id, value: todo.text })} className="edit-icon" />
        <select value={todo.priority} onChange={(e) => updateTodo(todo.id, { text: todo.text, priority: e.target.value })}>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
        {todo.isComplete ? (
          <button onClick={() => unmarkTodo(todo.id)}>Unmark</button>
        ) : (
          <FaCheckCircle onClick={() => markTodo(todo.id)} className="mark-icon" />
        )}
      </div>
    </div>
  ));
};

export default Todo;
