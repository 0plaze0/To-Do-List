import "./App.css";
import Header from "./Header";
import Content from "./Content";
import Footer from "./Footer";
import { useState, useEffect } from "react";
import AddItem from "./AddItem";
import SearchItem from "./SearchItem";
import apiRequest from "./apiRequest";

function App() {
  const API_URI = "http://localhost:3500/items";
  const [listItem, setListItem] = useState([]);
  const [newItem, setNewItem] = useState("");
  const [searchItem, setSearchItem] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_URI);
        if (!response.ok) throw Error("Data cannot be fetched");
        const jsonData = await response.json();
        setListItem(jsonData);
      } catch (err) {
        setFetchError(err);
      } finally {
        setIsLoading(false);
      }
    };
    setTimeout(() => fetchData(), 2000);
  }, []);
  const addToList = async (text) => {
    const id = listItem.length ? listItem[listItem.length - 1].id + 1 : 1;
    const newItem = { id, checked: false, text };
    setListItem([...listItem, newItem]);

    const postOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newItem),
    };
    const result = await apiRequest(API_URI, postOptions);
    if (result) setFetchError(result);
  };

  const handleDelete = async (id) => {
    const remainingItem = listItem.filter((item) => item.id !== id);
    setListItem(remainingItem);

    const deleteOptions = {
      method: "DELETE",
    };
    const deleteURI = `${API_URI}/${id}`;
    const result = await apiRequest(deleteURI, deleteOptions);
    if (result) setFetchError(result);
  };

  const handleCheck = async (id) => {
    const item = listItem.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setListItem(item);
    const checkOption = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ checked: item[0].checked }),
    };
    const updateURI = `${API_URI}/${id}`;
    const result = await apiRequest(updateURI, checkOption);
    if (result) setFetchError(result);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newItem) return;
    addToList(newItem);
    setNewItem("");
  };

  return (
    <div className="App">
      <Header />
      <AddItem
        handleSubmit={handleSubmit}
        newItem={newItem}
        setNewItem={setNewItem}
      />
      <SearchItem setSearchItem={setSearchItem} searchItem={searchItem} />
      <main>
        {isLoading && <p>Loading.. the List</p>}
        {fetchError && <p style={{ color: "red" }}>{`${fetchError}`}</p>}
        {!isLoading && !fetchError && (
          <Content
            listItem={listItem.filter((item) =>
              item.text.toLowerCase().includes(searchItem.toLowerCase())
            )}
            handleDelete={handleDelete}
            handleCheck={handleCheck}
          />
        )}
      </main>

      <Footer length={listItem.length} />
    </div>
  );
}

export default App;
