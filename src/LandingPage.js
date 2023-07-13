import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';
import { SearchBar } from './SearchBar';

const LandingPage = () => {
  const [isSearching, setIsSearching] = useState(false);
  const [filteredDealersList, setFilteredDealersList] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [isInvalidSearch, setIsInvalidSearch] = useState(false);

  const isValidPincode = (value) => {
    return /^\d{6}$/.test(value);
  };

  const handleSearch = (value) => {
    setIsSearching(true);
    setSearchValue(value.trim());

    if (value.trim() === '') {
      setFilteredDealersList([]);
      setIsSearching(false);
      setIsInvalidSearch(false);
      return;
    }

    if (isValidPincode(value)) {
      fetch(`http://localhost:8080/api/dealer/query?pincode=${value}`)
        .then((response) => response.json())
        .then((data) => {
          setFilteredDealersList(data);
          setIsSearching(false);
          setIsInvalidSearch(false);
          console.log(data);
        })
        .catch((error) => {
          console.error('Error fetching dealers by pincode:', error);
          setIsSearching(false);
          setIsInvalidSearch(true);
        });
    } else {
      fetch(`http://localhost:8080/api/dealer/query?city=${value}`)
        .then((response) => response.json())
        .then((data) => {
          setFilteredDealersList(data);
          setIsSearching(false);
          setIsInvalidSearch(false);
          console.log(data);
        })
        .catch((error) => {
          console.error('Error fetching dealers by city:', error);
          setIsSearching(false);
          setIsInvalidSearch(true);
        });
    }
  };

  return (
    <div>
      <header className="header">
        <nav className="navbar">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </nav>
        <h1 className="title">VehicleTrade</h1>
        <p className="subtitle">
          Your Vehicle, Your Way: Connect with Dealers on our App
        </p>
        <Link to="/signin" className="cta-button">
          Get Started
        </Link>
      </header>
      <section id="features" className="features-section">
        <h2>Our Dealerships</h2>
        <SearchBar onSearch={handleSearch} />
        {isInvalidSearch && (
          <div>
            {isValidPincode(searchValue)
              ? `No dealerships found for pincode: ${searchValue}`
              : `No dealerships found for city: ${searchValue}`}
          </div>
        )}
        {!isSearching && !isInvalidSearch && filteredDealersList.length > 0 && (
          <ul>
            {filteredDealersList.map((dealer) => (
              <li key={dealer.id}>
                <Link to={`/dealer/${dealer.id}`}>{dealer.name}</Link>
              </li>
            ))}
          </ul>
        )}
      </section>
      <footer className="footer">
        <p>&copy; 2023 VehicleTrade. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
