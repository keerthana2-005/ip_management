import React, { useState, useEffect } from 'react';
import { Search, ArrowRight } from 'lucide-react';
import { useSearch } from '../hooks/useSearch'; // Correct path to the useSearch hook

const SearchSection = () => {
  const { query, setQuery, results, isLoading, error, searchIpAssets } = useSearch();

  const handleSearch = (e) => {
    e.preventDefault();
    searchIpAssets(query); // Call the search function from the hook
  };

  const containerStyle = {
    maxWidth: '768px',
    margin: '2rem auto',
    padding: '2rem 1rem',
  };

  const backdropStyle = {
    backdropFilter: 'blur(10px)',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '1rem',
    padding: '2rem',
    boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)',
    border: '1px solid rgba(99, 102, 241, 0.2)',
    transition: 'opacity 0.3s ease-in-out',
    animation: 'fadeIn 0.3s ease forwards',
  };

  const headingStyle = {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: 'white',
    marginBottom: '1.5rem',
    textAlign: 'center',
  };

  const inputWrapperStyle = {
    position: 'relative',
  };

  const searchIconStyle = {
    position: 'absolute',
    top: '50%',
    left: '12px',
    transform: 'translateY(-50%)',
    display: 'flex',
    alignItems: 'center',
    pointerEvents: 'none',
  };

  const inputStyle = {
    width: '100%',
    padding: '0.75rem 3rem 0.75rem 2.5rem',
    backgroundColor: 'rgba(17, 24, 39, 0.7)',
    border: '1px solid rgba(99, 102, 241, 0.3)',
    borderRadius: '0.375rem',
    outline: 'none',
    color: 'white',
    fontSize: '1rem',
  };

  const buttonWrapperStyle = {
    position: 'absolute',
    top: '50%',
    right: '0.5rem',
    transform: 'translateY(-50%)',
    display: 'flex',
    alignItems: 'center',
  };

  const buttonStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    border: '1px solid transparent',
    borderRadius: '0.375rem',
    padding: '0.5rem 1rem',
    fontSize: '0.875rem',
    fontWeight: 500,
    color: 'white',
    backgroundColor: '#4f46e5',
    cursor: 'pointer',
    transition: 'background-color 0.15s ease-in-out',
  };

  const arrowIconStyle = {
    marginLeft: '0.25rem',
    width: '1rem',
    height: '1rem',
  };

  const popularSearchesStyle = {
    marginTop: '1rem',
    textAlign: 'center',
    color: '#d1d5db',
    fontSize: '0.875rem',
  };

  return (
    <div style={containerStyle}>
      <div style={backdropStyle}>
        <h2 style={headingStyle}>Discover Intellectual Property</h2>
        <form onSubmit={handleSearch}>
          <div style={inputWrapperStyle}>
            <div style={searchIconStyle}>
              <Search size={20} color="#818cf8" />
            </div>
            <input
              type="text"
              value={query} // Bind query state from useSearch hook
              onChange={(e) => setQuery(e.target.value)} // Update query state from useSearch hook
              style={inputStyle}
              placeholder="Search by title, creator, or tokenID..."
            />
            <div style={buttonWrapperStyle}>
              <button type="submit" style={buttonStyle}>
                <span style={{ marginRight: '0.25rem' }}>Search</span>
                <ArrowRight style={arrowIconStyle} color="white" />
              </button>
            </div>
          </div>
        </form>

        {isLoading && <p>Loading...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}

        <div style={popularSearchesStyle}>
          <p>Popular searches: Digital Art, Music NFTs, Patents, Research Papers</p>
        </div>

        <div>
          {results.length > 0 && (
            <ul>
              {results.map((result) => (
                <li key={result.id}>
                  <h3>{result.title}</h3>
                  <p>Creator: {result.creator}</p>
                  <p>Type: {result.type}</p>
                  <p>Timestamp: {result.timestamp}</p>
                  <img src={result.previewUrl} alt={result.title} style={{ width: '100px' }} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchSection;
