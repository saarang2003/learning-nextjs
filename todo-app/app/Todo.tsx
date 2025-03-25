'use client';
import { useState } from "react";

const Todo = () => {
  const [userInput, setUserInput] = useState('');
  const [todos, setTodos] = useState([]);
  const [ediIndex, setEditIndex] = useState(null);

  const handleChange = (value) => {
    setUserInput(value);
  }

  const handleSubmit = () => {
    if (userInput.trim() === '') {
      alert('Please enter a task');
      return;
    }

    if (ediIndex !== null) {
      const updatedTodo = todos.map((todo, index) =>
        index === ediIndex ? { ...todo, value: userInput } : todo
      );

      setTodos(updatedTodo);
      setEditIndex(null);
    } else {
      const newItem = {
        id: Math.random(),
        value: userInput,
      };
      setTodos([...todos, newItem]);
    }

    setUserInput('');
  }

  const deleteItem = (id) => {
    const updatedTodo = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodo);
  }

  const startEdit = (index) => {
    setUserInput(todos[index].value);
    setEditIndex(index);
  }

  return (
    <div className="max-w-[600px] p-5 m-auto">
      <div className="text-center font-bold mb-5 text-green-500">
        Sarang Project
      </div>

      <div className="text-center font-bold mb-5">
        Todo List
      </div>

      <div className="flex items-center mb-5 gap-3">
        <input
          className="font-bold p-3 mr-2 rounded-1 border border-1-white"
          type="text"
          placeholder={ediIndex !== null ? "Edit item..." : "Add item..."}
          value={userInput}
          onChange={(e) => handleChange(e.target.value)}
        />

        <button
          className="px-2 py-4 bg-[#4caf50] text-white cursor-pointer"
          onClick={handleSubmit}
        >
          {ediIndex !== null ? 'Update' : 'ADD'}
        </button>
      </div>

      <div className="bg-[#f9f9f9] p-4">
        {
          todos.length > 0 ? (
            todos.map((item, index) => (
              <div key={index} className="flex justify-between items-center mb-3">
                <span className="font-bold flex-1">
                  {item.value}
                </span>

                <span>
                  <button
                    onClick={() => deleteItem(item.id)}
                    className="p-3 bg-[#f44336] text-white rounded-md mr-3 cursor-pointer"
                  >
                    Delete
                  </button>

                  <button
                    onClick={() => startEdit(index)}
                    className="p-3 bg-[#2196f3] text-white rounded-md mr-3 cursor-pointer"
                  >
                    Edit
                  </button>
                </span>
              </div>
            ))
          ) : (
            <div className="text-center font-bold text-[#777]">
              No items in the list
            </div>
          )
        }
      </div>
    </div>
  );
}

export default Todo;
