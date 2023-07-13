import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';

const BrandModelsPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const dealerId = queryParams.get('dealerID');
  const brandName = queryParams.get('brandname');
  const [vehicles, setVehicles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVehicles = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `http://localhost:8080/api/vehicle/models?dealerid=${dealerId}&brandname=${brandName}`
        );
        if (response.ok) {
          const data = await response.json();
          setVehicles(data);
        } else {
          throw new Error('Error fetching models');
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchVehicles();
  }, [dealerId, brandName]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      {vehicles.length > 0 ? (
        <ul>
          {vehicles.map((vehicle, index) => (
            <li key={index}>
              <div>
                <h4>
                  <Link to={`/modelPage?vehicleid=${vehicle.id}&dealerid=${dealerId}`}>{vehicle.name}</Link>
                </h4>
                <p>Brand: {vehicle.brand}</p>
                <p>Class of vehicle: {vehicle.classofvehicle}</p>
                <p>Model name: {vehicle.modelname}</p>
                <p>Color: {vehicle.color}</p>
                <p>Transmission: {vehicle.transmission}</p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No models available for this brand.</p>
      )}
    </div>
  );
};

export default BrandModelsPage;
