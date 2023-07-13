import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

export const SearchBar = ({ onSearch }) => {
  const [input, setInput] = useState('');

  const handleChange = (value) => {
    setInput(value);
    onSearch(value);
  };

  return (
    <div className="input-wrapper">
      <FaSearch id="search-icon" />
      <input
        placeholder="Type to search..."
        value={input}
        onChange={(e) => handleChange(e.target.value)}
      />
    </div>
  );
};
