// WelcomeSlider.js
import React from "react";
import Slider from "react-slick";
import "./Home.css"; // Or your combined CSS file

const sliderData = [
  {
    image: "/images/banner1.jpg",
    heading: "Welcome to E-MobileShop",
    sub: "Explore the Latest | Shop Smart | Stay Connected | Power in Your Palm",
  },
  {
    image: "/images/banner2.jpg",
    heading: "Shop the Future Today",
    sub: "New Launches | Top Deals | Unmatched Quality",
  },
  {
    image: "/images/banner3.jpg",
    heading: "Connect in Style",
    sub: "Flagship Phones | Stunning Design | Affordable Prices",
  },
  {
    image: "/images/banner4.jpg",
    heading: "Stay Ahead Always",
    sub: "Fast Delivery | Smart Picks | 24/7 Support",
  },
];

const WelcomeSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 5000,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    arrows: false,
  };

  return (
    <section className="welcome-section">
      <Slider {...settings} className="welcome-slider">
        {sliderData.map((slide, index) => (
          <div
            className="slider-item"
            key={index}
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <div className="welcome-overlay">
              <h1 className="typewriter-text">{slide.heading}</h1>
              <p className="typewriter-sub">{slide.sub}</p>
            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
};

export default WelcomeSlider;