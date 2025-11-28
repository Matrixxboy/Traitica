import React from "react";

import Hero from "../components/Hero";

const Home = () => {
  return (
    <div
      className="home-container"
      style={{ position: "relative", overflow: "hidden" }}
    >
      <Hero />
    </div>
  );
};

export default Home;
