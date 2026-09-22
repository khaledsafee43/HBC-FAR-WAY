import { useState } from "react";

export default function App() {
  const [items, setItems] = useState([]);

  function handleDelete(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }
  function handleChecked(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item,
      ),
    );
  }
  return (
    <div className="app">
      <Logo />

      <Form onAddItem={setItems} />

      <PackingList
        onDelete={handleDelete}
        onChecked={handleChecked}
        items={items}
      />
    </div>
  );
}

function Logo() {
  return <h1>🏝️ Far Away 🧳</h1>;
}

function Form({ onAddItem }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();

    const newItem = {
      id: Date.now(),
      description: description,
      quantity: quantity,
      packed: false,
    };

    onAddItem((items) => [...items, newItem]);

    setDescription("");
    setQuantity(1);
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your 😍 trip?</h3>

      <select
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>

      <input
        type="text"
        placeholder="Item..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <button type="submit">Add</button>
    </form>
  );
}

function PackingList({ items, onDelete, onChecked }) {
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <input
              type="checkbox"
              checked={item.packed}
              onChange={() => onChecked(item.id)}
            />

            <span style={item.packed ? { textDecoration: "line-through" } : {}}>
              {item.quantity} {item.description}
            </span>

            <button onClick={() => onDelete(item.id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
