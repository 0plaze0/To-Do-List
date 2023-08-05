import { FaPlus } from "react-icons/fa";
import { useRef } from "react";

const AddItem = ({ handleSubmit, newItem, setNewItem }) => {
  const inputRef = useRef();
  return (
    <form className="addItem" onSubmit={handleSubmit}>
      <label htmlFor="inputItem"></label>
      <input
        type="text"
        autoComplete="off"
        ref={inputRef}
        required
        placeholder="Add Item"
        id="inputItem"
        value={newItem}
        onChange={(e) => setNewItem(e.target.value)}
      />
      <button
        type="submit"
        aria-label="Add Item"
        onClick={(e) => inputRef.current.focus()}
      >
        <FaPlus />
      </button>
    </form>
  );
};

export default AddItem;
