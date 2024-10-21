import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <>
      <div id="carouselExampleDark" className="carousel carousel-dark slide">
        <div className="carousel-indicators">
          <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
          <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="1" aria-label="Slide 2"></button>
          <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="2" aria-label="Slide 3"></button>
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active " data-bs-interval="2000" style={{maxHeight:"600px"}}>
            <img src="https://morph-2-prd-bucket.s3.ap-southeast-1.amazonaws.com/Adobe_Stock_269605923_d728abb851.jpeg" className="d-block w-100 h-50 " alt="..." />
            <div className="carousel-caption h-75 d-flex justify-content-start align-items-center text-white">
              <div>
                <h1>
                  Be Part of the Community. <br /> Join the Conversation.
                </h1>
                <p>Bringing People Together, One Connection at a Time.............</p>
                <Link to="/logIn" className="btn btn-primary">Join Our Community</Link>
              </div>
            </div>
          </div>
          {/* <div className="carousel-item " data-bs-interval="2000" style={{maxHeight:"600px"}}>
            <img src="https://masterinvestor.co.uk/wp-content/uploads/2018/10/shutterstock_146680703.jpg" className="d-block w-100 " alt="..." />
            <div className="carousel-caption h-25 d-flex justify-content-end align-items-center text-white">
              <div>
                <h1>
                Your Digital Home for Real Connections.
                </h1>
                <p>Connect Globally, Share Locally..............</p>
                <Link to="/logIn" className="btn btn-primary">Join Our Community</Link>
              </div>
            </div>
          </div> */}
          {/* <div className="carousel-item " data-bs-interval="2000" style={{maxHeight:"600px"}}>
            <img src="https://www.soupstock.in/system/files/images/67/6f/shutterstock_270920618.jpg" className="d-block w-100 " alt="..." />
            <div className="carousel-caption h-75  d-flex justify-content-end  align-items-center text-white">
              <div>
                <h3>
                Discover Your People. Share Your Story.
                </h3>
                <p>Stay Connected, Always..............</p>
                <Link to="/logIn" className="btn btn-primary">Join Our Community</Link>
              </div>
            </div>
          </div> */}
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

    </>
  );
};
export default LandingPage;
