import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './App.css';

const RegisterPage = () => {
    const history = useHistory();
    const [isSelfBusiness, setIsSelfBusiness] = useState('');
    const [states, setStates] = useState([
        "ANDHRA PRADESH",
        "ARUNACHAL PRADESH",
        "ASSAM",
        "BIHAR",
        "CHHATTISGARH",
        "GOA",
        "GUJARAT",
        "HARYANA",
        "HIMACHAL PRADESH",
        "JHARKHAND",
        "KARNATAKA",
        "KERALA",
        "MADHYA PRADESH",
        "MAHARASHTRA",
        "MANIPUR",
        "MEGHALAYA",
        "MIZORAM",
        "NAGALAND",
        "ODISHA",
        "PUNJAB",
        "RAJASTHAN",
        "SIKKIM",
        "TAMIL NADU",
        "TELANGANA",
        "TRIPURA",
        "UTTARAKHAND",
        "UTTAR PRADESH",
        "WEST BENGAL",
        "CHANDIGARH",
        "LADAKH",
        "JAMMU & KASHMIR",
        "PUDUCHERRY",
        "LAKSHADWEEP",
        "DELHI",
        "ANDAMAN AND NICOBAR ISLANDS",
        "DADRA AND NAGAR HAVELI AND DAMAN AND DIU"
    ]);

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const userDetails = {
            firstname: formData.get('firstname'),
            middlename: formData.get('middlename'),
            lastname: formData.get('lastname'),
            addressline1: formData.get('addressline1'),
            addressline2: formData.get('addressline2'),
            addressline3: formData.get('addressline3'),
            city: formData.get('city'),
            state: formData.get('state'),
            country: formData.get('country'),
            pincode: formData.get('pincode'),
            mobileno: formData.get('mobileno'),
            emailid: formData.get('emailid'),
            password: formData.get('password'),
            aadharno: formData.get('aadharno'),
            panno: formData.get('panno'),
            isselfbusiness: formData.get('isselfbusiness') === 'true',
            yearlyincome: formData.get('yearlyincome'),
        };

        const companyDetails = {
            name: formData.get('name'),
            addressline1: formData.get('businessAddressLine1'),
            addressline2: formData.get('businessAddressLine2'),
            addressline3: formData.get('businessAddressLine3'),
            city: formData.get('businessCity'),
            state: formData.get('state'),
            country: formData.get('businessCountry'),
            pincode: formData.get('businessPinCode'),
            contactno: formData.get('contactNo'),
            natureofbusiness: formData.get('natureOfBusiness'),
            ageofbusiness: formData.get('ageOfBusiness'),
        };

        fetch('http://localhost:8080/api/user/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userDetails),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Registration successful:', data);
                const userId = data.id;


                fetch(`http://localhost:8080/api/company/create?userid=${userId}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(companyDetails),
                })
                    .then((response) => response.json())
                    .then((data) => {
                        console.log('Company creation successful:', data);
                        history.push(`/profile/${userId}`);
                    })
                    .catch((error) => {
                        console.error('Error creating company:', error);
                        fetch(`http://localhost:8080/api/user/delete?userid=${userId}`, {
                            method: 'DELETE',
                        })
                            .then((response) => response.json())
                            .then((data) => {
                                console.log('User deletion successful:', data);
                            })
                            .catch((error) => {

                                console.error('Error deleting user:', error);
                            });
                    });
            })
            .catch((error) => {
                console.error('Error registering user:', error);
            });

    };

    const handleSelfBusinessChange = (event) => {
        setIsSelfBusiness(event.target.value);
    };

    const renderBusinessInformationFields = () => {
        if (isSelfBusiness === 'true') {
            return (
                <>
                    <h3>Business Information</h3>
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" name="name" required />

                    <label htmlFor="businessAddressLine1">Address Line 1:</label>
                    <input type="text" id="businessAddressLine1" name="businessAddressLine1" required />

                    <label htmlFor="businessAddressLine2">Address Line 2:</label>
                    <input type="text" id="businessAddressLine2" name="businessAddressLine2" />

                    <label htmlFor="businessAddressLine3">Address Line 3:</label>
                    <input type="text" id="businessAddressLine3" name="businessAddressLine3" />

                    <label htmlFor="businessCity">City:</label>
                    <input type="text" id="businessCity" name="businessCity" required />

                    <label htmlFor="state">State:</label>
                <select id="state" name="state" required>
                    <option value="">Select State</option>
                    {states.map((state) => (
                        <option key={state} value={state}>
                            {state}
                        </option>
                    ))}
                </select>

                    <label htmlFor="businessCountry">Country:</label>
                    <input
                        type="text"
                        id="businessCountry"
                        name="businessCountry"
                        defaultValue="INDIA"
                        required
                        readOnly
                    />


                    <label htmlFor="businessPinCode">Pin Code:</label>
                    <input type="text" id="businessPinCode" name="businessPinCode" required />

                    <label htmlFor="contactNo">Company contact No:</label>
                    <input type="text" id="contactNo" name="contactNo" required />

                    <label htmlFor="natureOfBusiness">Nature of Business:</label>
                    <input type="text" id="natureOfBusiness" name="natureOfBusiness" required />

                    <label htmlFor="ageOfBusiness">Age of Business:</label>
                    <input type="text" id="ageOfBusiness" name="ageOfBusiness" required />
                </>
            );
        } else if (isSelfBusiness === 'false') {
            return (
                <>
                    <h3>Company details</h3>
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" name="name" required />

                    <label htmlFor="businessAddressLine1">Address Line 1:</label>
                    <input type="text" id="businessAddressLine1" name="businessAddressLine1" required />

                    <label htmlFor="businessAddressLine2">Address Line 2:</label>
                    <input type="text" id="businessAddressLine2" name="businessAddressLine2" />

                    <label htmlFor="businessAddressLine3">Address Line 3:</label>
                    <input type="text" id="businessAddressLine3" name="businessAddressLine3" />

                    <label htmlFor="businessCity">City:</label>
                    <input type="text" id="businessCity" name="businessCity" required />

                    <label htmlFor="state">State:</label>
                <select id="state" name="state" required>
                    <option value="">Select State</option>
                    {states.map((state) => (
                        <option key={state} value={state}>
                            {state}
                        </option>
                    ))}
                </select>

                    <label htmlFor="businessCountry">Country:</label>
                    <input
                        type="text"
                        id="businessCountry"
                        name="businessCountry"
                        defaultValue="INDIA"
                        required
                        readOnly
                    />


                    <label htmlFor="businessPinCode">Pin Code:</label>
                    <input type="text" id="businessPinCode" name="businessPinCode" required />

                    <label htmlFor="contactNo">Company contact No:</label>
                    <input type="text" id="contactNo" name="contactNo" required />

                    <label htmlFor="natureOfBusiness">Nature of Business:</label>
                    <input
                        type="text"
                        id="natureOfBusiness"
                        name="natureOfBusiness"
                        placeholder="Only applicable for people having self-business"
                        className="disabled-input"
                        disabled
                    />

                    <label htmlFor="ageOfBusiness">Age of Business:</label>
                    <input
                        type="text"
                        id="ageOfBusiness"
                        name="ageOfBusiness"
                        placeholder="Only applicable for people having self-business"
                        className="disabled-input"
                        disabled
                    />
                </>
            );
        }
        return null;
    };

    return (
        <div className="container">
            <h2>Registration Form</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="firstname">First Name:</label>
                <input type="text" id="firstname" name="firstname" required />

                <label htmlFor="middlename">Middle Name:</label>
                <input type="text" id="middlename" name="middlename" />

                <label htmlFor="lastname">Last Name:</label>
                <input type="text" id="lastname" name="lastname" required />

                <label htmlFor="addressline1">Address Line 1:</label>
                <input type="text" id="addressline1" name="addressline1" required />

                <label htmlFor="addressline2">Address Line 2:</label>
                <input type="text" id="addressline2" name="addressline2" />

                <label htmlFor="addressline3">Address Line 3:</label>
                <input type="text" id="addressline3" name="addressline3" />

                <label htmlFor="city">City:</label>
                <input type="text" id="city" name="city" required />

                <label htmlFor="state">State:</label>
                <select id="state" name="state" required>
                    <option value="">Select State</option>
                    {states.map((state) => (
                        <option key={state} value={state}>
                            {state}
                        </option>
                    ))}
                </select>

                <label htmlFor="country">Country:</label>
                <input
                        type="text"
                        id="country"
                        name="country"
                        className="disabled-input"
                        defaultValue="INDIA"
                        required
                        readOnly
                    />

                <label htmlFor="pincode">Pin Code:</label>
                <input type="text" id="pincode" name="pincode" required />

                <label htmlFor="mobileno">Mobile No:</label>
                <input type="text" id="mobileno" name="mobileno" required />

                <label htmlFor="emailid">Email ID:</label>
                <input type="email" id="emailid" name="emailid" required />

                <label htmlFor="password">Password:</label>
                <input type="text" id="password" name="password" required />

                <label htmlFor="aadharno">Aadhar No:</label>
                <input type="text" id="aadharno" name="aadharno" required />

                <label htmlFor="panno">PAN No:</label>
                <input type="text" id="panno" name="panno" required />

                <label htmlFor="isselfbusiness">Is Self Business:</label>
                <select id="isselfbusiness" name="isselfbusiness" onChange={handleSelfBusinessChange} required>
                    <option value="">Select</option>
                    <option value="true">True</option>
                    <option value="false">False</option>
                </select>

                {renderBusinessInformationFields()}

                <label htmlFor="yearlyincome">Yearly Income:</label>
                <input type="text" id="yearlyincome" name="yearlyincome" required />

                <button type="submit">Submit</button>
            </form>
            <Link to="/">Go back to Home</Link>
        </div>
    );
};

export default RegisterPage;
