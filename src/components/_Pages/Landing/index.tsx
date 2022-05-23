import ToggleTheme from "components/_Custom/Toggle/ToggleTheme/ToggleTheme";
import React from "react";

import VendorBanner from "./Banner/Banner";
import { CallToAction } from "./CallToAction/CallToAction";
import { Contact } from "./Contact/Contact";
import { MiddleImage } from "./MiddleImage/MiddleImage";
import { Services } from "./Services/Services";
import { Testimonials } from "./Testimonials/Testimonials";

export const LandingPage = () => (
  <div>
    {/* <Headline /> */}
    <VendorBanner />
    <div className="w-full text-center mt-6">
      <ToggleTheme />
    </div>
    <CallToAction />
    <Services />
    <MiddleImage />
    <Testimonials />
    <Contact />
  </div>
);
