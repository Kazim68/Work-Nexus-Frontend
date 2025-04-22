import React from "react";
import Home from "./Home/Home";
import Modules from "./Modules/Modules";
import Aim from "./Aim/Aim";
import Services from "./Services/Services";
import Contact from "./Contact/ContactUs";

const LandingRoutes = () => {
  return (
    <div className="w-full">
      <section id="home" className="min-h-screen">
        <Home />
      </section>

      <section id="modules" className="min-h-screen">
        <Modules />
      </section>

      <section id="services" className="min-h-screen">
        <Services />
      </section>

      <section id="aim" className="min-h-screen">
        <Aim />
      </section>

      <section id="contact" className="min-h-screen">
        <Contact />
      </section>
    </div>
  );
};

export default LandingRoutes;