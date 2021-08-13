import React from "react";

import { CallToAction } from "./CallToAction/CallToAction";
import { Headline } from "./Headline/Headline";
import { Services } from "./Services/Services";

export const LandingPage = () => (
  <>
    <Headline />
    <CallToAction />
    <Services />
  </>
);
