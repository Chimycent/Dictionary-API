
const SearchBar = ({handleChange, onEnter, setSearch}) => {
    return (
      <div className="flex flex-col ">
        <input
          className="bg-gray-200 rounded-md h-9 pb-1 pl-3 mb-3"
          onChange={handleChange}
          onKeyDown={(e) => {
            onEnter(e);
          }}
          type="text"
          placeholder="search here"
        />
        <button
          onClick={() => setSearch(true)}
          className="bg-blue-500 w-fit text-white rounded-md px-3 py-1.5"
        >
          Search
        </button>
        <i className="text-gray-600 text-sm">such as: sun, nature, programme</i>
      </div>
    );
  };
  
  export default SearchBar;