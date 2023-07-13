import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import VehiclePage from '../VehiclePage';

const DealerPage = () => {
  const { id } = useParams();
  const [dealer, setDealer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDealer();
  }, [id]);

  const fetchDealer = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/dealer/${id}`);
      const data = await response.json();
      setDealer(data);
      setLoading(false);
    } catch (error) {
      if(dealer === null){
        <h3>No cars available in stock!</h3>
      }
      console.error("Error fetching dealer:", error);
      setLoading(false);
    }
  };

  return (
    <div className="dealer-page">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <h1>{dealer.name}</h1>
          <div className="dealer-info">
            <p>{dealer.city}</p>
            <p>{dealer.mobileno}</p>
            <p>{dealer.pincode}</p>
          </div>
          <h1>Available Brands</h1>
          <VehiclePage dealerId={id} />
        </div>
      )}
    </div>
  );
  
};

export default DealerPage;
