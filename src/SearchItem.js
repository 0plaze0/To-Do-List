const SearchItem = ({ setSearchItem, searchItem }) => {
  return (
    <form className="search" onSubmit={(e) => e.preventDefault()}>
      <label htmlFor="searchInput"></label>
      <input
        type="text"
        id="searchInput"
        value={searchItem}
        onChange={(e) => setSearchItem(e.target.value)}
      />
    </form>
  );
};

export default SearchItem;
