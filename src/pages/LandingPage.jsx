import { Link } from "react-router-dom";
import React from "react";
import { Carousel } from "react-bootstrap";

const LandingPage = () => {
  return (
    <>
     <div className="d-flex">
        <div className="col-md-6">
          <Link to="/login">
            <img src="https://wi-images.condecdn.net/image/mPdm8G6E9RJ/crop/1620/landscape" className="img-fluid" alt="img" />
          </Link>
        </div>
        <div className="col-md-6">
          <Link to="/login">
            <img src="https://u.9111s.ru/uploads/202210/25/7c414261983b40c7554dab0d14d9d886.jpg" className="img-fluid" alt="img" />
          </Link>
        </div>
      </div>
      
      <Carousel interval={2000} fade>
        <Carousel.Item>
          <img className="img-fluid w-100" src="https://morph-2-prd-bucket.s3.ap-southeast-1.amazonaws.com/Adobe_Stock_269605923_d728abb851.jpeg" alt="CommunityImage"  style={{ maxHeight: "100vh", objectFit: "cover" }}/>
          <Carousel.Caption>
            <div>
              <p>Bringing People Together, One Connection at a Time...</p>
              <Link to="/logIn" className="btn btn-primary btn-sm btn-md-lg">
                Join Our Community
              </Link>
            </div>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img className="d-block w-100 img-fluid " src="https://masterinvestor.co.uk/wp-content/uploads/2018/10/shutterstock_146680703.jpg" alt="CommunityImage"  style={{ maxHeight: "100vh", objectFit: "cover" }}/>
          <Carousel.Caption>
            <div>
              <p>Bringing People Together, One Connection at a Time...</p>
              <Link to="/logIn" className="btn btn-primary btn-sm btn-md-lg">
                Join Our Community
              </Link>
            </div>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100 img-fluid " src="https://multi-admin.ru/mediabank_blog/11/79615/1fab7fed6b4abd6fa253a0ee3f6bebf3.jpg" alt="CommunityImage"  style={{ maxHeight: "100vh", objectFit: "cover" }}/>
          <Carousel.Caption>
            <div>
              <p>Bringing People Together, One Connection at a Time...</p>
              <Link to="/logIn" className="btn btn-primary btn-sm btn-md-lg">
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
