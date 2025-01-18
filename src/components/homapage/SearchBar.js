const SearchBar = () => {
  return (
    <div className="search-bar max-w-2xl mx-auto flex justify-between items-center bg-white p-4 rounded-lg shadow-lg mt-8 dark:bg-gray-600 dark:text-white">
      <input
        type="text"
        placeholder="Search for jobs..."
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button className="ml-4 bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-slate-800">
        Search
      </button>
    </div>
  );
};

export default SearchBar;

// Usage in App.js
