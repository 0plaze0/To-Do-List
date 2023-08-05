import { FaTrashAlt } from "react-icons/fa";

const Content = ({ listItem, handleDelete, handleCheck }) => {
  return (
    <>
      {!listItem.length ? (
        <p>No items on list</p>
      ) : (
        <ul>
          {listItem.map((item) => {
            return (
              <li key={item.id}>
                <input
                  type="checkbox"
                  onChange={() => handleCheck(item.id)}
                  checked={item.checked}
                />
                <label htmlFor="input">{item.text}</label>
                <FaTrashAlt onClick={() => handleDelete(item.id)} />
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
};

export default Content;
