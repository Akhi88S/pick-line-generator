// App.js
import React, { useState, useEffect } from "react";
import { Button, Container, Row, Col, Spinner } from "react-bootstrap";
import { useSpring, animated, config } from "react-spring";
import "./App.css";

const App = () => {
  const [pickupLines, setPickupLines] = useState([]);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Use a counter to create a new instance of useSpring whenever pickupLines changes
  const [counter, setCounter] = useState(0);

  const generatePickupLine = async () => {
    try {
      setIsButtonDisabled(true);
      setIsLoading(true);
      const response = await (await fetch("API_URL")).json();
      const newLine = response.data.text;
      setPickupLines([...pickupLines, newLine]);
    } catch (error) {
      console.error("Error fetching pickup line:", error);
    } finally {
      console.log(counter);
      setIsLoading(false);
      setTimeout(() => setIsButtonDisabled(false), 300);
    }
  };

  useEffect(() => {
    setCounter((prevCounter) => prevCounter + 1);
  }, [pickupLines]);

  const fadeInProps = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    config: config.wobbly,
  });

  return (
    <Container className="app-container">
      <Row className="align-items-center">
        <Col md={8} className="mx-auto">
          <h1 className="app-header">Valentine's Pickup Lines</h1>
          <div className="instagram-layout">
            {pickupLines.map((line, index) => (
              <animated.div
                key={index}
                style={fadeInProps}
                className="pickup-card"
              >
                {line}
              </animated.div>
            ))}
            {isLoading && (
              <div className="pickup-card loading">
                <Spinner animation="border" role="status" />
              </div>
            )}
          </div>
          <div className="generate-btn-container">
            <Button
              variant="primary"
              onClick={generatePickupLine}
              className="generate-btn"
              disabled={isButtonDisabled}
            >
              {isLoading ? "Generating..." : "Generate Pickup Line"}
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};
export default App;
