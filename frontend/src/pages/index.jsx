// Filename - pages/index.js

import React from "react";
import Splash from "../components/Splash"
import MyButton from "../components/Button";

import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Button } from 'react-bootstrap';


const Home = () => {
    return (
        <>
            <div className="splash-main">
            <div className="splash-bkg"></div>
                <Container className="splash p-5 mb-4">
                    <Splash/>
                    <div className="content-container">
                    <Container >
                        <Row className="content text-center">
                            <Col className="text-center">
                                <h1 className="display-4">Coverage</h1>
                                <p className="lead">
                                There are many non-english speakers located in texas. Our website gathers info for these languages so far:
                                </p>
                                <hr className="my-4" />
                            </Col>
                            <Col className="d-none d-md-block"><img src="https://cdn.discordapp.com/attachments/1339072367799959592/1341915455526404096/jpeg.jpg?ex=67b7bba8&is=67b66a28&hm=b44244f327ed09492bb3d49b86b102c9a791db577f420d45f285e1a3a090a66b&" alt="Community Picture" className="img-fluid w-100" style={{ objectFit: "cover", maxHeight: "300px" }} /></Col>
                        </Row>
                        <hr style={{ borderTop: "4px solid rgb(68, 83, 71, 1)" }}></hr>
                        <Row className="content text-center">
                            <Col className="d-none d-md-block"><img src="https://speakatx-images.s3.us-east-2.amazonaws.com/splash_page/translation.jpg" alt="Translation Picture" className="img-fluid w-100" style={{ objectFit: "cover", maxHeight: "300px" }}/></Col>
                            <Col>
                                <h1 className="display-4">Multilingual Services</h1>
                                <p className="lead">
                                    Find translators and other services
                                </p>
                                <hr className="my-4" />
                                <MyButton targetPage="/translations" buttonText="Learn More &gt;&gt;" />
                                </Col>
                        </Row>
                        <hr style={{ borderTop: "4px solid rgb(68, 83, 71, 1)" }}></hr>
                        <Row className="content text-center">
                            <Col className="text-center">
                                <h1 className="display-4">Communities</h1>
                                <p className="lead">
                                    Explore local communities relevant to you
                                </p>
                                <hr className="my-4" />
                                <MyButton targetPage="/communities" buttonText="Learn More &gt;&gt;" />
                            </Col>
                            <Col className="d-none d-md-block"><img src="https://speakatx-images.s3.us-east-2.amazonaws.com/splash_page/community.jpg" alt="Community Picture" className="img-fluid w-100" style={{ objectFit: "cover", maxHeight: "300px" }} /></Col>
                        </Row>
                        <hr style={{ borderTop: "4px solid rgb(68, 83, 71, 1)" }}></hr>
                        <Row className="content text-center">
                            <Col className="d-none d-md-block"><img src="https://speakatx-images.s3.us-east-2.amazonaws.com/splash_page/job.jpg" alt="Job Picture" className="img-fluid w-100" style={{ objectFit: "cover", maxHeight: "300px" }} /></Col>
                            <Col>
                                <h1 className="display-4">Jobs</h1>
                                <p className="lead">
                                    See jobs that hire non-English speakers
                                </p>
                                <hr className="my-4" />
                                <MyButton targetPage="/jobs" buttonText="Learn More &gt;&gt;" />
                            </Col>
                        </Row>

                    </Container>
                    
                    
                    </div>
                </Container>
           </div>
        </>
    );
};

export default Home;
