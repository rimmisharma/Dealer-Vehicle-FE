import React, { useEffect, useState } from 'react';
import './App.css';

const ModelDetailsPage = () => {
  const [model, setModel] = useState(null);
  const [quantity, setQuantity] = useState(null);
  const [dealerVehicleId, setDealerVehicleId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [invoiceAmount, setInvoiceAmount] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [user, setUser] = useState(null);
  const [emailInput, setEmailInput] = useState('');
  const [isEligible, setIsEligible] = useState(null);

  const fetchModelDetails = async () => {
    setIsLoading(true);
    try {
      const queryParams = new URLSearchParams(window.location.search);
      const vehicleId = queryParams.get('vehicleid');
      const [modelResponse, quantityResponse] = await Promise.all([
        fetch(`http://localhost:8080/api/vehicle/modelPage?vehicleid=${vehicleId}`),
        fetch(`http://localhost:8080/api/dealervehicle/getQuantity?vehicleid=${vehicleId}`)
      ]);

      if (modelResponse.ok && quantityResponse.ok) {
        const modelData = await modelResponse.json();
        const quantityData = await quantityResponse.json();
        console.log('Model Data:', modelData);
        console.log('Quantity Data:', quantityData);
        setModel(modelData);
        setQuantity(quantityData?.quantity);
        setDealerVehicleId(quantityData?.id);
        console.log("dealer vehicle id : " + quantityData?.id);
      } else {
        throw new Error('Error fetching model details or quantity');
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchInvoiceAmount = async () => {
    try {
      const queryParams = new URLSearchParams(window.location.search);
      const dealerId = queryParams.get('dealerid');
      const vehicleId = queryParams.get('vehicleid');
      const response = await fetch(`http://localhost:8080/api/dealerOrder/invoice/?dealerid=${dealerId}&vehicleid=${vehicleId}&userid=1&orderid=1`);

      if (response.ok) {
        const data = await response.json();
        setInvoiceAmount(data);
      } else {
        throw new Error('Error fetching invoice amount');
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const fetchUserByEmail = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/user/getByEmail?email=${emailInput}`);
      if (response.ok) {
        const user = await response.json();
        setUser(user);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error('Error fetching user:', error);
      setUser(null);
    }
  };

  const checkUserEligibility = async () => {
    try {
      const price = model?.price;
  
      const response = await fetch(`http://localhost:8080/api/user/isEligible?email=${emailInput}&price=${price}`);
      if (response.ok) {
        const isEligible = await response.json();
        setIsEligible(isEligible);
      } else {
        throw new Error('Error checking user eligibility');
      }
    } catch (error) {
      setError(error.message);
    }
  };  

  const handleOrderNow = async () => {
    try {
      const queryParams = new URLSearchParams(window.location.search);
      const dealerId = queryParams.get('dealerid');
      const vehicleId = queryParams.get('vehicleid');
      const response = await fetch(`http://localhost:8080/api/dealerOrder/create?dealervehicleid=${dealerVehicleId}&dealerid=${dealerId}&vehicleid=${vehicleId}&userid=${user?.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
      });

      if (response.ok) {
        alert('Order created!');
      } else {
        throw new Error('Error creating order');
      }
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchModelDetails();
  }, []);

  useEffect(() => {
    if (model !== null && quantity !== null) {
      fetchInvoiceAmount();
    }
  }, [model, quantity]);

  useEffect(() => {
    if (user !== null) {
      checkUserEligibility();
    }
  }, [user]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      {model ? (
        <div>
          <h2>{model.name}</h2>
          <p>Brand: {model.brand}</p>
          <p>Class of vehicle: {model.classofvehicle}</p>
          <p>Model name: {model.modelname}</p>
          <p>Color: {model.color}</p>
          <p>Transmission: {model.transmission}</p>
          <p>Base Price: {model.price}</p>
          <p>GST: 28%</p>
          <p>Road Tax: {}</p>
          {quantity !== null && (
            <div>
              {quantity <= 0 ? (
                <p>Sorry! Out of stock, currently not available.</p>
              ) : (
                <>
                  <p>
                    {quantity <= 2 ? (
                      <span>Hurry only {quantity} cars left in stock!</span>
                    ) : (
                      <span>In stock: available</span>
                    )}
                  </p>
                  {quantity >= 0 && invoiceAmount !== null && (
                    <button onClick={() => setShowPopup(true)}>Calculate Order Invoice</button>
                  )}
                </>
              )}
            </div>
          )}
          {showPopup && (
            <div className="popup">
              <h3>Invoice Amount: {invoiceAmount}</h3>
              <input type="email" value={emailInput} onChange={(e) => setEmailInput(e.target.value)} />
              {user === null ? (
                <div>
                  <button onClick={fetchUserByEmail}>Check User</button>
                  <p>User not found for this email</p>
                </div>
              ) : (
                <>
                  {isEligible === null ? (
                    <button onClick={checkUserEligibility}>Check Eligibility</button>
                  ) : isEligible ? (
                    <>
                      <p>User is eligible.</p>
                      <button onClick={() => setShowPopup(false)}>Close</button>
                      <button onClick={handleOrderNow} disabled={!user}>
                        Order Now
                      </button>
                    </>
                  ) : (
                    <p>User is not eligible according to the yearly income.</p>
                  )}
                </>
              )}
            </div>
          )}
        </div>
      ) : (
        <p>No model details available.</p>
      )}
    </div>
  );
};

export default ModelDetailsPage;
