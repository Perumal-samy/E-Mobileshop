import React from "react";
import "./ExploreSection.css";

const exploreItems = [
  {
    img: "/images/explore1.jpg",
    title: "Xiaomi HyperOS",
    subtitle: "One smart ecosystem",
  },
  {
    img: "/images/explore2.jpg",
    title: "Xiaomi Priority Club",
    subtitle: "Xiaomi 14 Series",
  },
  {
    img: "/images/explore3.jpg",
    title: "Xiaomi x Leica",
    subtitle: "Strategic Partnership",
  },
];

const ExploreSection = () => {
  return (
    <>
    <h2 className="title">EXPLORE XIAOMI</h2>
      <section className="explore-section">
        <div className="explore-cards">
          {exploreItems.map((item, index) => (
            <div className="explore-card" key={index}>
              <img src={item.img} alt={item.title} />
              <h3>{item.title}</h3>
              <p>{item.subtitle}</p>
              <button>Learn More</button>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default ExploreSection;