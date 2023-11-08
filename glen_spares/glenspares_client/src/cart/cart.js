import React, { useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import logo from "./LOGO.svg";
import image from './headerimage.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import {
    MDBBtn,
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBCol,
    MDBContainer,
    MDBIcon,
    MDBInput,
    MDBRow,
    MDBTypography,
} from 'mdb-react-ui-kit';

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        // Fetch cart items from local storage
        const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
        setCartItems(storedCart);
    }, []);

    const handleRemoveItem = (index) => {
        // Remove the item at the given index from the cart
        const updatedCart = [...cartItems];
        updatedCart.splice(index, 1);
        setCartItems(updatedCart);

        // Update local storage with the updated cart
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    // Calculate subtotal
    const subtotal = cartItems.reduce((acc, item) => acc + item.Price, 0);

    // Fixed shipping cost for example
    const shipping = subtotal * 0.15;

    // Calculate total
    const total = subtotal + shipping;

    const handleCheckout = async () => {
        try {
            // Fetch cart items from local storage
            const storedCart = JSON.parse(localStorage.getItem('cart')) || [];

            // Send a POST request to your server to save the cart items to the Orders collection
            const response = await fetch('http://localhost:5000/api/order', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(storedCart),
            });

            if (!response.ok) {
                throw new Error('Failed to checkout');
            }

            // Clear local storage
            localStorage.removeItem('cart');

            // Update the state to reflect the cleared cart
            setCartItems([]);

            // Show the success modal
            setShowModal(true);

        } catch (error) {
            console.error('Error during checkout:', error);
            // Handle the error as needed
        }
    };

    const handleCloseModal = () => {
        // Hide the modal
        setShowModal(false);
        window.location = "/"
    };

    return (
        <section className="h-100 h-custom" style={{ backgroundColor: "#FFFFFF" }}>
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
                    At GlenSpares, we take immense pride in our rich heritage within the automotive industry.
                    For over four decades, we have been the trusted name for car enthusiasts and mechanics alike,
                    providing top-notch car parts that ensure vehicles run at their optimal performance.
                </p>
            </div>

            <MDBContainer className="addform h-100">
                <MDBRow className="justify-content-center align-items-center h-100">
                    <MDBCol>
                        <MDBCard>
                            <MDBCardBody className="p-4 fl">
                                <MDBCol lg="7">
                                    <MDBTypography tag="h5">
                                        <a href="/" className="text-body">
                                            <MDBIcon fas icon="long-arrow-alt-left me-2" /> Continue shopping
                                        </a>
                                    </MDBTypography>

                                    <hr />

                                    <div className="d-flex justify-content-between align-items-center mb-4">
                                        <div>
                                            <h1 className="mb-1">Shopping cart</h1>
                                            <p className="mb-0">You have {cartItems.length} items in your cart</p>
                                        </div>

                                    </div>

                                    {cartItems.map((item, index) => (
                                        <MDBCard className="mb-3" key={index}>
                                            <MDBCardBody>
                                                <div className="d-flex justify-content-between">
                                                    <div className="d-flex flex-row align-items-center">
                                                        <div>
                                                            <MDBCardImage
                                                                src={item.imgUrl}
                                                                fluid
                                                                className="rounded-3"
                                                                style={{ width: "65px" }}
                                                                alt="Shopping item"
                                                            />
                                                        </div>
                                                        <div className="ms-3">
                                                            <MDBTypography tag="h5">{item.Name}</MDBTypography>
                                                            <p className="small mb-0">
                                                                {item.CarMake}, {item.CarModel}, {item.Year}, Chasis Number: {item.ChasisNumber},  PartID: {item.PartID}
                                                            </p>
                                                        </div>
                                                    </div>

                                                    <div className="d-flex flex-row align-items-center">
                                                        <div style={{ width: "50px" }}>
                                                            <MDBTypography tag="h5" className="fw-normal mb-0">
                                                                1
                                                            </MDBTypography>
                                                        </div>
                                                        <div style={{ width: "80px" }}>
                                                            <MDBTypography tag="h5" className="mb-0">
                                                                $ {item.Price}
                                                            </MDBTypography>
                                                        </div>

                                                        <a
                                                            href="#!"
                                                            style={{ color: "red" }}
                                                            onClick={() => handleRemoveItem(index)}
                                                        >
                                                            <MDBIcon fas icon="trash-alt" />
                                                        </a>

                                                    </div>
                                                </div>
                                            </MDBCardBody>
                                        </MDBCard>
                                    ))}
                                </MDBCol>

                                <MDBCol lg="5" className='p-2'>
                                    <MDBCard className="">
                                        <MDBCardBody className='carddetails text-white rounded-3'>
                                            <div className="d-flex justify-content-between align-items-center mb-4">
                                                <MDBTypography tag="h5" className="mb-0">
                                                    Card details
                                                </MDBTypography>
                                                <MDBCardImage
                                                    src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-6.webp"
                                                    fluid
                                                    className="rounded-3"
                                                    style={{ width: "45px" }}
                                                    alt="Avatar"
                                                />
                                            </div>

                                            <p className="small">Card type</p>
                                            <a href="#!" type="submit" className="text-white">
                                                <MDBIcon fab icon="cc-mastercard fa-2x me-2" />
                                            </a>
                                            <a href="#!" type="submit" className="text-white">
                                                <MDBIcon fab icon="cc-visa fa-2x me-2" />
                                            </a>
                                            <a href="#!" type="submit" className="text-white">
                                                <MDBIcon fab icon="cc-amex fa-2x me-2" />
                                            </a>
                                            <a href="#!" type="submit" className="text-white">
                                                <MDBIcon fab icon="cc-paypal fa-2x me-2" />
                                            </a>

                                            <form className="mt-4">
                                                <div className="mb-4" label="Cardholder's Name" type="text" size="lg" placeholder="Cardholder's Name" contrast >Cardholder's Name</div>
                                                <MDBInput className="mb-4" type="text" size="lg" placeholder="Cardholder's Name" contrast />

                                                <div className="mb-4" label="Card Number" type="text" size="lg" minLength="19" maxLength="19" placeholder="1234 5678 9012 3457" contrast>Card Number</div>
                                                <MDBInput className="mb-4" type="text" size="lg" minLength="19" maxLength="19" placeholder="1234 5678 9012 3457" contrast />

                                                <MDBRow className="mb-4">
                                                    <MDBCol md="6">
                                                        <div className="mb-4" label="Expiration" type="text" size="lg" minLength="7" maxLength="7" placeholder="MM/YYYY" contrast>Expiration</div>
                                                        <MDBInput className="mb-4" type="text" size="lg" minLength="7" maxLength="7" placeholder="MM/YYYY" contrast />
                                                    </MDBCol>
                                                    <MDBCol md="6">
                                                        <div className="mb-4" label="Cvv" type="text" size="lg" minLength="3" maxLength="3" placeholder="&#9679;&#9679;&#9679;" contrast>Cvv</div>
                                                        <MDBInput className="mb-4" type="text" size="lg" minLength="3" maxLength="3" placeholder="&#9679;&#9679;&#9679;" contrast />
                                                    </MDBCol>
                                                </MDBRow>
                                            </form>

                                            <hr />

                                            <div className="d-flex justify-content-between">
                                                <p className="mb-2">Subtotal</p>
                                                <p className="mb-2">$ {subtotal.toFixed(2)}</p>
                                            </div>

                                            <div className="d-flex justify-content-between">
                                                <p className="mb-2">Shipping</p>
                                                <p className="mb-2">$ {shipping.toFixed(2)}</p>
                                            </div>

                                            <hr></hr>

                                            <div className="d-flex justify-content-between">
                                                <h4 className="mb-2">Total (Incl. taxes)</h4>
                                                <h4 className="mb-2">$ {total.toFixed(2)}</h4>
                                            </div>

                                            <MDBBtn color="E5FF00" block size="lg" onClick={handleCheckout}>
                                                <div className="d-flex justify-content-between">
                                                    <span className='checkoutText'>Checkout <i className="fas fa-long-arrow-alt-right ms-2"></i></span>
                                                </div>
                                            </MDBBtn>

                                            {/* Success Modal */}
                                            <Modal show={showModal} onHide={handleCloseModal}>
                                                <Modal.Header closeButton>
                                                    <Modal.Title>Checkout Successful</Modal.Title>
                                                </Modal.Header>
                                                <Modal.Body>
                                                    Your order has been placed successfully.
                                                </Modal.Body>
                                                <Modal.Footer>
                                                    <Button variant="success" onClick={handleCloseModal}>
                                                        Continue Shopping
                                                    </Button>
                                                </Modal.Footer>
                                            </Modal>

                                        </MDBCardBody>
                                    </MDBCard>
                                </MDBCol>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>

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

        </section>
    );
};

export default Cart;
