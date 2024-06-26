import React from 'react';
import AboutImage from '../HomeComponents/Images/hero-doctor.png'; // Import the image

const About = () => {
    return (
        <div> 
            <div className="container-fluid bg-success text-white py-5" style={{ background: 'linear-gradient(to right, #009688, #3F51B5)' }}> 
        <div className="row">
            {/* Contact Us Quotation */}
            <div className="col-md-6"><br/><br/><br/><br/>
                <div className="d-flex align-items-center justify-content-center h-100">
                    <div>
                        <p>ABOUT US?</p>
                        <h3>Effective, and Informed <br/>Better Opinions From Our <br/>Expert Doctors Worldwide..</h3>
                    </div>
                </div>
            </div>
        </div>
        </div>
            {/* Image Section */}
            <br/><br/><br/><br/><br/>
            {/* Why Us Section */}
            <div className="container my-5">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <h2 className="text-center">Why Us?</h2>
                        <p className="text-center">Welcome to QuickHealth, your one-stop destination for online healthcare services.</p>
                        <p className="text-center">At QuickHealth, we strive to provide convenient and accessible healthcare solutions to our users.</p>
                        <p className="text-center">Our platform connects patients with qualified healthcare professionals, offering online doctor consultations, medical advice, and prescription services.</p>
                        <p className="text-center">With QuickHealth, you can consult with experienced doctors from the comfort of your home, saving you time and hassle.</p>
                    </div>
                </div>
            </div>
            {/* Mission and Vision */}
            <div className="container my-5">
                <div className="row">
                    <div className="col-md-6 mb-5 mb-md-0">
                        <MissionCard />
                    </div>
                    <div className="col-md-6">
                        <VisionCard />
                    </div>
                </div>
            </div>
            {/* Who we are Section */}
            <div className="container my-5">
                <div className="row align-items-center">
                    <div className="col-md-6">
                        {/* Image */}
                        <img src={AboutImage} alt="Who We Are" className="img-fluid"  style={{ maxWidth: "100%" }} />
                    </div>
                    <div className="col-md-6">
                        <div className="text-center">
                            <h2>Who We Are</h2>
                            <p>QuickHealth is a leading provider of online healthcare services, dedicated to improving access to quality healthcare for everyone. Our platform connects patients with experienced healthcare professionals, offering convenient and accessible consultations, medical advice, and prescription services.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const MissionCard = () => {
    return (
        <div className=" p-3" style={{ background: '#E3F2F7', padding: '30px', borderRadius: '30px', boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)' }}>
            <h3 className="text-center"><strong>Mission</strong></h3>
            <p>Our mission at QuickHealth is to revolutionize the healthcare industry by leveraging technology to provide accessible and affordable healthcare services to everyone.</p>
            <p>We aim to bridge the gap between patients and healthcare professionals, making quality healthcare more convenient and efficient.</p>
        </div>
    );
};

const VisionCard = () => {
    return (
        <div className=" p-3" style={{ background: '#E3F2F7', padding: '30px', borderRadius: '30px', boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)' }}>
            <h3 className="text-center"><strong>Vision</strong></h3>
            <ul>
                <li>Convenient online doctor consultations</li>
                <li>Qualified and experienced healthcare professionals</li>
                <li>Secure and confidential platform</li>
                <li>Quick and easy prescription services</li>
                <li>Accessible healthcare from anywhere, anytime</li>
            </ul>
        </div>
    );
};

export default About;
