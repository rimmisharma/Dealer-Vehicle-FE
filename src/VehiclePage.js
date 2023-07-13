import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

const VehiclePage = ({ dealerId }) => {
  const [vehicles, setVehicles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const history = useHistory();

  useEffect(() => {
    const fetchVehicles = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`http://localhost:8080/api/vehicle/brands?dealerid=${dealerId}`);
        if (response.ok) {
          const data = await response.json();
          setVehicles(data);
        } else {
          throw new Error('Error fetching vehicles');
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchVehicles();
  }, [dealerId]);

  const handleBrandClick = (brand) => {
    const dealerIdParam = encodeURIComponent(dealerId);
    const brandParam = encodeURIComponent(brand);
    history.push(`/vehicles/brands/models?dealerID=${dealerIdParam}&brandname=${brandParam}`);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {vehicles.length > 0 ? (
        <ul>
          {vehicles.map((vehicle, index) => (
            <li key={index}>
              <button onClick={() => handleBrandClick(vehicle)}>
                {vehicle}
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No vehicles available for this dealer.</p>
      )}
    </div>
  );
};

export default VehiclePage;
