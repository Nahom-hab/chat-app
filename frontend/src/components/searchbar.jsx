


const SearchBar = ({ value, handleChange }) => {

    return (
        <input
            type="text"
            placeholder="Search friends..."
            value={value}
            onChange={handleChange}
            className="w-[80%] p-2 mr-8 border outline-none rounded-md bg-slate-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white mb-4"
        />
    );
};

export default SearchBar;
