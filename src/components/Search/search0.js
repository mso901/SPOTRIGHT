/** @format */

import React, { useState, useEffect } from 'react';

const TODOS_KEY = 'todos';

function Search() {
  const [toDos, setToDos] = useState(() => {
    const savedToDos = localStorage.getItem(TODOS_KEY);
    return savedToDos ? JSON.parse(savedToDos) : [];
  });

  useEffect(() => {
    localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
  }, [toDos]);

  const handleToDoSubmit = (event) => {
    event.preventDefault();
    const newTodoText = event.target.elements.todoInput.value;
    if (newTodoText.trim() === '') return;

    const newTodo = {
      text: newTodoText,
      id: Date.now(),
    };

    setToDos((prevToDos) => [...prevToDos, newTodo]);
    event.target.elements.todoInput.value = '';
  };

  const deleteToDo = (id) => {
    setToDos((prevToDos) => prevToDos.filter((toDo) => toDo.id !== id));
  };

  return (
    <div>
      <form id="todo-form" onSubmit={handleToDoSubmit}>
        <input name="todoInput" type="text" placeholder="주소를 입력해주세요." />
        <button type="submit">Add</button>
      </form>
      <ul id="todo-list">
        {toDos.map((toDo) => (
          <li key={toDo.id}>
            <span>{toDo.text}</span>
            <button onClick={() => deleteToDo(toDo.id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Search;