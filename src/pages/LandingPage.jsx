import { Link } from "react-router-dom";
import { Carousel } from "react-bootstrap";
import React from "react";

const LandingPage = () => {
  return (
    <>
      <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-100 img-fluid"
            src="https://morph-2-prd-bucket.s3.ap-southeast-1.amazonaws.com/Adobe_Stock_269605923_d728abb851.jpeg"
            alt="CommunityImage"
            style={{ maxHeight: "100vh", objectFit: "cover" }}
          />
          <Carousel.Caption className="d-flex ">
            <div >
              <h3>
                Be Part of the Community. <br /> Join the Conversation.
              </h3>
              <p>Bringing People Together, One Connection at a Time...</p>
              <Link to="/logIn" className="btn btn-primary">
                Join Our Community
              </Link>
            </div>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="d-block w-100 img-fluid"
            src="https://masterinvestor.co.uk/wp-content/uploads/2018/10/shutterstock_146680703.jpg"
            alt="CommunityImage"
            style={{ maxHeight: "100vh", objectFit: "cover" }}
          />
          <Carousel.Caption >
          <div >
            <h3>
              Be Part of the Community. <br /> Join the Conversation.
            </h3>
            <p>Bringing People Together, One Connection at a Time...</p>
            <Link to="/logIn" className="btn btn-primary">
              Join Our Community
            </Link>
            </div>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </>
  );
};
export default LandingPage;
