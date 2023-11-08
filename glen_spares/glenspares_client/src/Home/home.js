import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import logo from "./LOGO.svg";
import carImage from './carImage.svg';
import image from './headerimage.png';

const Home = () => {

    const [current, setCurrent] = useState([]);
    const [currentDlt, setCurrentDlt] = useState([]);
    const [confirmDelete, setConfirmDelete] = useState(null); // Track confirmation state
    const [carParts, setCarParts] = useState([]);
    const [loading, setLoading] = useState(true); // New loading state
    const [editingPart, setEditingPart] = useState(null);
    const [editedValues, setEditedValues] = useState({
        Name: '',
        CarMake: '',
        CarModel: '',
        ChasisNumber: '',
        Year: '',
        PartID: '',
    });

    const [showPopup, setShowPopup] = useState(false);
    const [showDltPopup, setShowDltPopup] = useState(false);
    const [showDltSuccesulPopup, setShowDltSuccesulPopup] = useState(false);

    useEffect(() => {
        // Fetch car parts data from the server when the component mounts
        const fetchCarParts = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/carparts');
                setCarParts(response.data);
                setLoading(false); // Set loading to false once data is fetched
            } catch (error) {
                console.error('Error fetching car parts:', error);
                setLoading(false); // Set loading to false in case of an error
            }
        };
        // Initialize the cart in local storage
        if (!localStorage.getItem('cart')) {
            localStorage.setItem('cart', JSON.stringify([]));
        }

        fetchCarParts();
    }, []); // The empty dependency array ensures that this effect runs only once when the component mounts

    // Function to handle adding a car part to the cart
    const addToCart = (carPart) => {
        // Get the current cart from local storage
        const currentCart = JSON.parse(localStorage.getItem('cart'));

        // Add the selected car part to the cart
        currentCart.push(carPart);

        // Update the cart in local storage
        localStorage.setItem('cart', JSON.stringify(currentCart));
        localStorage.setItem('current', carPart.Name);
        setCurrent(localStorage.getItem('current'));
        setShowPopup(true); // Display the popup
        setTimeout(() => setShowPopup(false), 2000); // Hide the popup after 2 seconds
    };

    // Function to handle deleting a car part
    const deletePart = async (carPartId, carPartName) => {
        // Set the confirmation state to the carPartId to confirm the delete action
        setConfirmDelete(carPartId);
        setShowDltPopup(true);
        setCurrentDlt(carPartName);
    };

    const confirmDeleteAction = async () => {
        try {
            await axios.delete(`http://localhost:5000/api/carpart/${confirmDelete}`);
            // Update the local state to reflect the deletion
            setCarParts(prevCarParts => prevCarParts.filter(part => part._id !== confirmDelete));
            setConfirmDelete(null); // Reset confirmation state after deletion

            setShowDltPopup(false);
            setShowDltSuccesulPopup(true); // Display the success popup
            setTimeout(() => setShowDltSuccesulPopup(false), 2000); // Hide the popup after 2 seconds

        } catch (error) {
            console.error('Error deleting car part:', error);
            setConfirmDelete(null); // Reset confirmation state in case of an error
        }
    };

    const cancelDeleteAction = () => {
        setConfirmDelete(null); // Reset confirmation state if the user cancels the delete action
        setShowDltPopup(false);
    };

    const editPart = (carPart) => {
        setEditingPart(carPart._id);
        setEditedValues({
            Name: carPart.Name,
            CarMake: carPart.CarMake,
            CarModel: carPart.CarModel,
            ChasisNumber: carPart.ChasisNumber,
            Year: carPart.Year,
            PartID: carPart.PartID,
        });
    };

    const savePart = async (carPartId) => {
        try {
            await axios.put(`http://localhost:5000/api/carpart/${carPartId}`, editedValues);
            setEditingPart(null);
            // Fetch the updated data to reflect the changes
            const response = await axios.get('http://localhost:5000/api/carparts');
            setCarParts(response.data);
        } catch (error) {
            console.error('Error updating car part:', error);
        }
    };

    const handleChange = (field, value) => {
        setEditedValues(prevValues => ({
            ...prevValues,
            [field]: value,
        }));
    };

    const cancelEdit = () => {
        setEditingPart(null);
        setEditedValues({
            Name: '',
            CarMake: '',
            CarModel: '',
            ChasisNumber: '',
            Year: '',
            PartID: '',
        });
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

            <div className="section-1">
                <div className="home-section">
                    <div className="container">
                        <br></br>
                        <br></br>

                        <div className="Aboutus">
                            <div className="row">

                                <div className="col-md-6">
                                    <img src={carImage} alt="Car" className="car-image" />
                                </div>
                                <div className="col-md-6 text">

                                    <h2>Find the Best Car for You</h2>
                                    <p>Established by Glen Turner, a visionary in the automotive world, our company has stood the test of time, adapting and evolving with the ever-changing needs of the industry. Our commitment to quality, authenticity, and reliability is what sets us apart. With a team of dedicated experts, we source, test, and deliver a wide range of parts, from the latest models to vintage classics. At GlenSpares, we don't just sell car parts; we deliver a piece of automotive history, ensuring every vehicle runs with precision and power.</p>
                                </div>
                            </div>
                        </div>
                        <br></br>
                        <br></br>

                        <div className='CardSection'>
                            <div className="container">

                                {loading ? (
                                    <h1 className="loading-message">Loading...</h1>
                                ) : (

                                    <div className="row">

                                        {carParts.map((carPart) => (

                                            <div className="col-md-4" key={carPart._id}>
                                                <div className='Card m-2'>
                                                    <img className="cardimage" src={carPart.imgUrl} alt="Car Part Image" />
                                                    <div className="card-content">

                                                        {editingPart === carPart._id ? (
                                                            <div>
                                                                <h2 className="card-title">Edit {carPart.Name} Details</h2>
                                                                <ul className="details-list">
                                                                    <li><strong>Name:</strong> <input type="text" className="form-control" value={editedValues.Name} onChange={(e) => handleChange('Name', e.target.value)} /></li>
                                                                    <li><strong>Car Make:</strong> <input type="text" className="form-control" value={editedValues.CarMake} onChange={(e) => handleChange('CarMake', e.target.value)} /></li>
                                                                    <li><strong>Car Model:</strong> <input type="text" className="form-control" value={editedValues.CarModel} onChange={(e) => handleChange('CarModel', e.target.value)} /></li>
                                                                    <li><strong>Chasis Number:</strong> <input type="text" className="form-control" value={editedValues.ChasisNumber} onChange={(e) => handleChange('ChasisNumber', e.target.value)} /></li>
                                                                    <li><strong>Year:</strong> <input type="text" className="form-control" value={editedValues.Year} onChange={(e) => handleChange('Year', e.target.value)} /></li>
                                                                    <li><strong>PartID:</strong> <input type="text" className="form-control" value={editedValues.PartID} onChange={(e) => handleChange('PartID', e.target.value)} /></li>
                                                                </ul>

                                                                <button
                                                                    className="CardBtnSave CardBtnEdit"
                                                                    onClick={() => savePart(carPart._id)}
                                                                >
                                                                    Save
                                                                </button>

                                                                <button
                                                                    className="CardBtnCancel CardBtnDelete"
                                                                    onClick={cancelEdit}
                                                                >
                                                                    Cancel
                                                                </button>

                                                            </div>
                                                        ) : (
                                                            <div>
                                                                <h2 className="card-title">{carPart.Name} Details</h2>
                                                                <ul className="details-list">
                                                                    <li><strong>Name:</strong> {carPart.Name}</li>
                                                                    <li><strong>Car Make:</strong> {carPart.CarMake}</li>
                                                                    <li><strong>Car Model:</strong> {carPart.CarModel}</li>
                                                                    <li><strong>Chasis Number:</strong> {carPart.ChasisNumber}</li>
                                                                    <li><strong>Year:</strong> {carPart.Year}</li>
                                                                    <li><strong>PartID:</strong> {carPart.PartID}</li>
                                                                </ul>

                                                                <button
                                                                    className="CardBtn"
                                                                    onClick={() => {
                                                                        addToCart(carPart);
                                                                        setShowPopup(true);
                                                                        setTimeout(() => setShowPopup(false), 2000);
                                                                    }}
                                                                >
                                                                    Add to Cart
                                                                </button>

                                                                <button
                                                                    className="CardBtnEdit"
                                                                    onClick={() => editPart(carPart)}
                                                                >
                                                                    Edit
                                                                </button>
                                                                <button
                                                                    className="CardBtnDelete"
                                                                    onClick={() => deletePart(carPart._id, carPart.Name)}
                                                                >
                                                                    Delete
                                                                </button>
                                                            </div>
                                                        )}

                                                    </div>
                                                </div>
                                            </div>

                                        ))}

                                    </div>

                                )}

                                {showPopup && (
                                    <div className="popup">
                                        <h4>{current} successfully added to the cart!</h4>
                                    </div>
                                )}

                                {showDltPopup && (
                                    <div className='popup'>
                                        <p>Are you sure you want to delete this car part?</p>
                                        <button
                                            className="CardBtnConfirm CardBtnEdit"
                                            onClick={confirmDeleteAction}
                                        >
                                            Confirm
                                        </button>
                                        <button
                                            className="CardBtnCancel CardBtnDelete"
                                            onClick={cancelDeleteAction}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                )}

                                {showDltSuccesulPopup && (
                                    <div className="popup">
                                        <p>{currentDlt} successfully deleted!</p>
                                    </div>
                                )}

                            </div>
                        </div>

                    </div>
                </div>

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

        </div>



    )
}

export default Home

