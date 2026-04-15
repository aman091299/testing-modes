"use client";
import { useState } from "react";

export default function Home() {
  const [item, setItem] = useState("");
  const [lists, setLists] = useState([]);
  const [edit, setEdit] = useState(false);
  const [editValue, setEditValue] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const handleAdd = () => {
    setLists((prev) => [...prev, item]);
  };
  const handleDelete = (value, index) => {
    const rem = lists.filter((list, idx) => idx !== index);
    console.log("rem", rem);
    setLists(rem);
  };
  const handleUpdate = () => {
    let updatedList = lists;
    updatedList[editIndex] = item;
    console.log(updatedList);
    setLists(updatedList);
    setEdit(false);
  };
  const handleEdit = (value, index) => {
    setEditValue(value);
    setEditIndex(index);
    setEdit(true);
  };
  return (
    <div className="home">
      <h2>Todo list</h2>
      <div className="todo-btn">
        <input type="text" onChange={(e) => setItem(e.target.value)} />
        {!edit ? (
          <button onClick={handleAdd}>Add</button>
        ) : (
          <button onClick={handleUpdate}>Update</button>
        )}
      </div>
      <div className="todo-list">
        {lists.map((list, index) => (
          <div key={index}>
            <p>{list}</p>
            <div className="btns">
              <button onClick={() => handleDelete(list, index)}>Delete</button>
              <button onClick={() => handleEdit(list, index)}>Edit</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
