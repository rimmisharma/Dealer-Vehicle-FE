import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ProfilePage = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [company, setCompany] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const parsedUserId = parseInt(id, 10);

    if (isNaN(parsedUserId)) {
      console.error('Invalid userId:', id);
      setError('Invalid userId');
      return;
    }


    fetch(`http://localhost:8080/api/user?userid=${parsedUserId}`)
      .then((response) => response.json())
      .then((data) => {
        setUser(data);
      })
      .catch((error) => {
        console.error('Error fetching user:', error);
        setError('Error fetching user');
      });

  
    fetch(`http://localhost:8080/api/company?userid=${parsedUserId}`)
      .then((response) => response.json())
      .then((data) => {
        setCompany(data);
      })
      .catch((error) => {
        console.error('Error fetching company:', error);
        setError('Error fetching company');
      });
  }, [id]);

  if (error) {
    return (
      <div>
        <h2>Error</h2>
        <p>{error}</p>
      </div>
    );
  }

  if (!user || !company) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>User Profile</h2>
      <p>Name: {user.firstname} {user.lastname}</p>
      <p>Email: {user.emailid}</p>
      <p>Address: {user.addressline1}, {user.addressline2}, {user.addressline3}</p>
      <p>City: {user.city}</p>
      <p>State: {user.state}</p>
      <p>Country: {user.country}</p>
      <p>Pin Code: {user.pincode}</p>
      <p>Mobile No: {user.mobileno}</p>
      <p>Aadhar No: {user.aadharno}</p>
      <p>PAN No: {user.panno}</p>
      <p>Is Self Business: {user.isselfbusiness ? 'Yes' : 'No'}</p>
      <p>Yearly Income: {user.yearlyincome}</p>

      <h2>Company Details</h2>
      <p>Name: {company.name}</p>
      <p>Address Line 1: {company.addressline1}</p>
      <p>Address Line 2: {company.addressline2}</p>
      <p>Address Line 3: {company.addressline3}</p>
      <p>City: {company.city}</p>
      <p>State: {company.state}</p>
      <p>Country: {company.country}</p>
      <p>Pin Code: {company.pincode}</p>
      <p>Contact No: {company.contactno}</p>
      <p>Nature of Business: {company.natureofbusiness}</p>
      <p>Age of Business: {company.ageofbusiness}</p>
    </div>
  );
};

export default ProfilePage;
