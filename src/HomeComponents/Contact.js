import React from 'react';
import Footer from './Footer';

const Contact = () => {
    return (
        <div>
            <div className="container-fluid bg-success text-white py-5" style={{ background: 'linear-gradient(to right, #009688, #3F51B5)' }}> 
                <div className="row">
                    {/* Contact Us Quotation */}
                    <div className="col-md-6"><br/><br/><br/><br/>
                        <div className="d-flex align-items-center justify-content-center h-100">
                            <div>
                                <p>CONTACT US?</p>
                                <h3>Effective, and Informed <br/>Better Opinions From Our <br/>Expert Doctors Worldwide..</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Why Us Section */}
            <div className="container my-5">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <h2 className="text-center">Why Us?</h2>
                        <p className="text-center">We are dedicated to providing top-notch healthcare services to our users. Our platform connects you with qualified healthcare professionals for online consultations, ensuring convenience and accessibility. Trust QuickHealth for all your healthcare needs.</p>
                    </div>
                </div>
            </div>

            {/* Message and Email Section */}
            <div className="container">
                <div className="row justify-content-center">
                    {/* Leave us a Message Card */}
                    <div className="col-md-6">
                        <div className="card mb-5">
                            <div className="card-body">
                                <h5 className="card-title text-center"><strong>Leave us a Message</strong></h5>
                                <form>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label htmlFor="name" className="form-label"><b>Name:</b></label>
                                                <input type="text" className="form-control" id="name" name="name" />
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="email" className="form-label"><b>Email:</b></label>
                                                <input type="email" className="form-control" id="email" name="email" />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label htmlFor="phone" className="form-label"><b>Phone:</b></label>
                                                <input type="tel" className="form-control" id="phone" name="phone" />
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="subject" className="form-label"><b>Subject:</b></label>
                                                <input type="text" className="form-control" id="subject" name="subject" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="message" className="form-label"><b>Message:</b></label>
                                        <textarea className="form-control" id="message" name="message" rows="4"></textarea>
                                    </div>
                                    <div className="text-center">
                                        <button type="submit" className="btn btn-warning">Submit</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>

                    {/* Email Us Card */}
                    <div className="col-md-3">
                        <div className="card mb-5 bg-light">
                            <div className="card-body">
                                <h5 className="card-title text-center"><strong>Email Us</strong></h5>
                                <p className="text-center">For any inquiries, you can also reach us via email at <a href="mailto:quickhealth@gmail.com">quickhealth@gmail.com</a>.</p>
                            </div>
                            <div className="card-body">
                                <p className="text-center">For customer support, media relations and general feedback, please email us at one of the addresses below.<br/><b><strong>Customer support:</strong></b>
                                <a href="mailto:quickhealth@gmail.com">quickhealth@gmail.com</a>.</p>
                            </div>
                            <div className="card-body">
                                <p className="text-center"><b>Call Support</b> <br/>Call our customer support team, they’ll be happy to help.<br/><br/><b>Contact:</b> 04448133183 <br/><br/>If it is a health emergency, please visit a nearby hospital.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            
        </div>
    );
}

export default Contact;
