import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./Home.css";
import ExploreSection from "../ExploreSection/ExploreSection";
import SupportSection from "../SupportSection/SupportSection";
import Footer from "../Footer/Footer";

const Home = () => {
  return (
    <div className="home-container">
      {/* Full-Screen Welcome Section */}
      <section className="welcome-section">
        <Carousel
          autoPlay
          infiniteLoop
          showThumbs={false}
          showStatus={false}
          transitionTime={1000}
          interval={4000}
          showArrows={false}
          showIndicators={false}
          stopOnHover={false}
        >
          <div
            className="slider-item"
            style={{ backgroundImage: "url('/images/Slider3.jpg')" }}
          ></div>
          <div
            className="slider-item"
            style={{ backgroundImage: "url('/images/Slider4.jpg')" }}
          ></div>
          <div
            className="slider-item"
            style={{ backgroundImage: "url('/images/Slider1.jpg')" }}
          ></div>
          <div
            className="slider-item"
            style={{ backgroundImage: "url('/images/Slider2.jpg')" }}
          ></div>
        </Carousel>
      </section>

      {/* Other Page Sections */}
      <br />
      <h3>DISCOUNTS & OFFERS</h3>
      <Carousel
        autoPlay
        infiniteLoop
        showThumbs={false}
        showStatus={false}
        transitionTime={750}
        interval={3500}
      >
        <div>
          <img src="/images/B1.jpg" alt="Big Deals on Electronics" />
        </div>
        <div>
          <img src="/images/B2.jpg" alt="Flash Sale Banner" />
        </div>
        <div>
          <img src="/images/B3.jpg" alt="Upgrade Your Gadgets Banner" />
        </div>
        <div>
          <img src="/images/B4.jpg" alt="Best Accessories Banner" />
        </div>
      </Carousel>

      <Carousel
        autoPlay
        infiniteLoop
        showThumbs={false}
        showStatus={false}
        transitionTime={400}
        interval={3500}
      >
        <div>
          <img src="/images/B1.jpg" alt="Big Deals on Electronics" />
        </div>
        <div>
          <img src="/images/B2.jpg" alt="Flash Sale Banner" />
        </div>
        <div>
          <img src="/images/B3.jpg" alt="Upgrade Your Gadgets Banner" />
        </div>
        <div>
          <img src="/images/B4.jpg" alt="Best Accessories Banner" />
        </div>
      </Carousel>

      <br/>
      <br/>

      <ExploreSection />

      {/* <h2>PRODUCTS FEATURES</h2>

      <Carousel
        autoPlay
        infiniteLoop
        showThumbs={false}
        showStatus={false}
        transitionTime={800}
        interval={3500}
      >
        <div>
          <img src="/images/Banner/Banner 111.png" alt="Banner" />
        </div>
        <div>
          <img src="/images/Banner/Banner 222.png" alt="Banner" />
        </div>
        <div>
          <img src="/images/Banner/Banner 333.jpeg" alt="Banner" />
        </div>
        <div>
          <img src="/images/Banner/Banner 11.jpeg" alt="Banner" />
        </div>
      </Carousel> */}

      <SupportSection />

      <Footer />
    </div>
  );
};

export default Home;