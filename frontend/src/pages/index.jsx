import React,  { useState, useEffect } from "react";
import Splash from "../components/Splash"
import MyButton from "../components/Button";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Instances from "./instances.jsx";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Button } from 'react-bootstrap';

const Home = () => {
    const [loaded, setLoaded] = useState(Instances.loaded);
    useEffect(() => {
      const checkLoadedStatus = () => {
        setLoaded(Instances.loaded); // Update the state when Instances.loaded changes
      };
  
      const intervalId = setInterval(checkLoadedStatus, 500); // Check every 500ms
  
      return () => clearInterval(intervalId);
    }, [])
    if (!loaded) return <div><div class="spinner-border text-dark" role="status"></div></div>;


    const languageCounts = {};
    Instances.communities.forEach(service => {
        service.language.split(', ').forEach(lang => {
            const language = lang.trim();
            languageCounts[language] = (languageCounts[language] || 0) + 1;
        });
    });

    Instances.jobs.forEach(service => {
        service.language.split(', ').forEach(lang => {
            const language = lang.trim();
            languageCounts[language] = (languageCounts[language] || 0) + 1;
        });
      });

    Instances.translations.forEach(service => {
        service.language.split(', ').forEach(lang => {
            const language = lang.trim();
            languageCounts[language] = (languageCounts[language] || 0) + 1;
        });
    });

    const pieChartData = Object.keys(languageCounts).map(language => ({
      name: language.charAt(0).toUpperCase() + language.slice(1),
      value: languageCounts[language],
    }));

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A28DFF', '#FF6F91', '#FFA07A', '#87CEEB', '#32CD32', '#FF4500'];

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
                                There are many non-English speakers located in Texas. Our website gathers info for these languages so far:
                                </p>
                                <hr className="my-4" />
                            </Col>
                            <Col className="d-none d-md-block">
                              <div className="p-3 mb-5 bg-white rounded">
                                <h5 className="text-center">Language Distribution</h5>
                                <ResponsiveContainer width="100%" height={300}>
                                  <PieChart>
                                    <Pie
                                      data={pieChartData}
                                      dataKey="value"
                                      nameKey="name"
                                      cx="50%"
                                      cy="50%"
                                      outerRadius={100}
                                      fill="#8884d8"
                                    >
                                      {pieChartData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                      ))}
                                    </Pie>
                                    <Tooltip />
                                    <Legend 
                                      layout="horizontal"
                                      align="center"
                                      verticalAlign="bottom"
                                      iconSize={20}
                                      iconType="circle"
                                      wrapperStyle={{ paddingTop: 20 }}
                                    />
                                  </PieChart>
                                </ResponsiveContainer>
                              </div>
                            </Col>
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