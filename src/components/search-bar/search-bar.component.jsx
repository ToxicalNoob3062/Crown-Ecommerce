import "./search-bar.styles.scss";

const SearchBar = ({ placeHolder, onHandleChange }) => {
  return (
    <div className="search">
      <input id="search-btn" type="checkbox" />
      <label htmlFor="search-btn">Show search bar</label>
      <input id="search-bar" type="text" placeholder={placeHolder} onChange={onHandleChange} />
    </div>
  );
};
export default SearchBar;
