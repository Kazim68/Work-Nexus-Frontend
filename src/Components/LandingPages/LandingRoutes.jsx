// src/Routes/LandingRoutes.jsx

import React from "react";
import Home from "./Home/Home";
import Modules from "./Modules/Modules";
import Aim from "./Aim/Aim";
import Services from "./Services/Services";
import Contact from "./Contact/ContactUs";

const LandingRoutes = () => {
  return (
    <div>
      <section id="home">
        <Home />
      </section>

      <section id="modules">
        <Modules />
      </section>

      <section id="services">
        <Services />
      </section>

      <section id="aim">
        <Aim />
      </section>

      <section id="contact">
        <Contact />
      </section>
    </div>
  );
};

export default LandingRoutes;
