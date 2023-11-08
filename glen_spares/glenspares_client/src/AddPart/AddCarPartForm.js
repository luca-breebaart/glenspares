import React, { useRef, useState } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css'
import logo from "./LOGO.svg";
import image from './headerimage.png';

const AddCarPartForm = () => {

    const [formData, setFormData] = useState({
        Name: '',
        CarMake: '',
        CarModel: '',
        ChasisNumber: '',
        Year: '',
        PartID: '',
        Stock: '',
        Price: '',
        imgUrl: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Make a POST request to the server to add a new car part
            const response = await axios.post('http://localhost:5000/api/carpart', formData);

            // Handle success, e.g., show a success message or redirect
            console.log('Car part added successfully:', response.data);

            // Clear the form
            setFormData({
                Name: '',
                CarMake: '',
                CarModel: '',
                ChasisNumber: '',
                Year: '',
                PartID: '',
                Stock: '',
                Price: '',
                imgUrl: '',
            });

            window.location = "/";
        } catch (error) {
            // Handle error, e.g., show an error message
            console.error('Error adding car part:', error);
        }
    };

    return (

        <div className="body">

            <div className="header">

                <nav className="topnav">
                    <NavLink to="/" activeclassname="active" className="NavLink">Home</NavLink>
                    <NavLink to="/cart" activeclassname="active" className="NavLink">Checkout</NavLink>
                    <NavLink to="/AddPart" activeclassname="active" className="NavLink">Add Part</NavLink>
                </nav>

                <div className="container d-flex justify-content-center">
                    <img className="logo" src={logo} alt="image" />
                </div>

                <img className="headerimage" src={image} alt="image" />

                <div className="container d-flex justify-content-center">
                    <h1 className="heading">GLEN SPARES</h1>
                </div>


                <p className="description">
                    At GlenSpares, we take immense pride in our rich heritage within the automotive industry. For over four decades, we have been the trusted name for car enthusiasts and mechanics alike, providing top-notch car parts that ensure vehicles run at their optimal performance.
                </p>


            </div>

            <div className="container addform">

                <h2>Add Car Part</h2>

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="Name" className="form-label">
                            Name:
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="Name"
                            name="Name"
                            value={formData.Name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="CarMake" className="form-label">
                            Car Make:
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="CarMake"
                            name="CarMake"
                            value={formData.CarMake}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="CarModel" className="form-label">
                            Car Model:
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="CarModel"
                            name="CarModel"
                            value={formData.CarModel}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="ChasisNumber" className="form-label">
                            Chasis Number:
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="ChasisNumber"
                            name="ChasisNumber"
                            value={formData.ChasisNumber}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="Year" className="form-label">
                            Year:
                        </label>
                        <input
                            type="number"
                            className="form-control"
                            id="Year"
                            name="Year"
                            value={formData.Year}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="PartID" className="form-label">
                            Part ID:
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="PartID"
                            name="PartID"
                            value={formData.PartID}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="Stock" className="form-label">
                            Stock:
                        </label>
                        <input
                            type="number"
                            className="form-control"
                            id="Stock"
                            name="Stock"
                            value={formData.Stock}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="Price" className="form-label">
                            Price:
                        </label>
                        <input
                            type="number"
                            className="form-control"
                            id="Price"
                            name="Price"
                            value={formData.Price}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="imgUrl" className="form-label">
                            Image URL:
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="imgUrl"
                            name="imgUrl"
                            value={formData.imgUrl}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <button type="submit" className="CardBtnEdit">
                        Add Car Part
                    </button>

                </form>
                
            </div>

            <br></br>
            <br></br>
            <br></br>

            <div class="footer">
                <div class="footer-column">
                    <h1>LET’S TALK</h1>
                    <br></br>
                    <p>Telephone:</p>
                    <p>+27 12 345 6789</p>
                    <br></br>
                    <p>For more information and quotes:</p>
                    <p>info@glenspares.co.za</p>
                </div>
                <div class="footer-column">
                    <br></br>
                    <br></br>
                    <br></br>
                    <h2>About Glen Spares</h2>
                    <ul>
                        <li><a href="#">About us</a></li>
                        <li><a href="#">Our Services</a></li>
                        <li><a href="#">Contact us</a></li>
                    </ul>
                </div>
                <div class="footer-column">
                    <br></br>
                    <br></br>
                    <br></br>
                    <h2>Services</h2>
                    <ul>
                        <li><a href="#">Parts</a></li>
                    </ul>
                </div>
            </div>

        </div>
    );
};

export default AddCarPartForm;
