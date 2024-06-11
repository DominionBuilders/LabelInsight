import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    axios.get('https://api.example.com/items') // our monogodb data base will solve this 
      .then(response => {
        setData(response.data);
        setFilteredData(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  useEffect(() => {
    setFilteredData(
      data.filter(item =>
        item.toLowerCase().includes(query.toLowerCase())
      )
    );
    setSuggestions(
      data.filter(item =>
        item.toLowerCase().startsWith(query.toLowerCase())
      ).slice(0, 5) 
    );
  }, [query, data]);

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion);
    setSuggestions([]);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={handleInputChange}
        autoComplete="off"
      />
      <ul>
        {suggestions.map((suggestion, index) => (
          <li
            key={index}
            onClick={() => handleSuggestionClick(suggestion)}
            style={{ cursor: 'pointer' }}
          >
            {suggestion}
          </li>
        ))}
      </ul>
      <ul>
        {filteredData.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default SearchBar;
