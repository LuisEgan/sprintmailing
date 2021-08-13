import React from "react";

import { CallToAction } from "./CallToAction/CallToAction";
import { Headline } from "./Headline/Headline";
import { MiddleImage } from "./MiddleImage/MiddleImage";
import { Services } from "./Services/Services";
import { Testimonials } from "./Testimonials/Testimonials";

export const LandingPage = () => (
  <>
    <Headline />
    <CallToAction />
    <Services />
    <MiddleImage />
    <Testimonials />
  </>
);
