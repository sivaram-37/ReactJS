import { useState } from "react";
import Logo from "./Logo";
import Form from "./Form";
import PackingList from "./PackingList";
import Stats from "./Stats";

export default function App() {
  // Getting the items from Form and adding it in PackingList
  const [items, setItems] = useState([]);

  function handleAddItems(item) {
    setItems((items) => [...items, item]);
  }

  // Getting the item id from Item in PackingItem and deleting the item from items Array
  function handleDeleteItem(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  // Getting the item id from Item in PackingItem and update the packed property of an item object in items array
  function handleToggleItem(id) {
    setItems((items) =>
      items.map((item) => (item.id === id ? { ...item, packed: !item.packed } : item))
    );
  }

  // Clear all items in the PackingItem
  function handleClearList() {
    const isConfirm = window.confirm("Are you sure you want delete all items?");
    if (isConfirm) setItems([]);
  }

  return (
    <div className="app">
      <Logo />

      <Form onAddItems={handleAddItems} />

      <PackingList
        items={items}
        onDeleteItem={handleDeleteItem}
        onToggleItem={handleToggleItem}
        onClearList={handleClearList}
      />

      <Stats items={items} />
    </div>
  );
}
