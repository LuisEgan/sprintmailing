import React from "react";

import { Headline } from "../Landing/Headline/Headline";
import { Services } from "../Landing/Services/Services";
import { Testimonials } from "../Landing/Testimonials/Testimonials";
import { Blogs } from "./Blogs/Blogs";

export const BlogPage = () => (
  <>
    <Headline />
    <Blogs />
    <Services />
    <Testimonials />
  </>
);
