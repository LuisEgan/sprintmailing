import React from "react";

import { TestimonialCard } from "./Cards/TestimonialCard";
import { TestimonialsWrapper } from "./Testimonials.style";

export const Testimonials = () => (
  <TestimonialsWrapper>
    <div className="flex flex-col items-center gap-2">
      <h2 className="text-3xl font-bold text-gray-500 text-opacity-75">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </h2>
      <p className="text-lg text-gray-400">
        ed eros ante, facilisis accumsan vehicula eu, laoreet sed lacus.
        Curabitur a molestie arcu.
      </p>
    </div>
    <div className="flex mt-10 justify-items-center">
      <TestimonialCard
        title="Lorem ipsum dolor sit amet"
        description="el nisl vitae placerat. Donec eget turpis aliquam, rutrum ligula nec,
          tristique"
      />
      <TestimonialCard
        title="Lorem ipsum dolor sit amet"
        description="el nisl vitae placerat. Donec eget turpis aliquam, rutrum ligula nec,
          tristique"
      />
      <TestimonialCard
        title="Lorem ipsum dolor sit amet"
        description="el nisl vitae placerat. Donec eget turpis aliquam, rutrum ligula nec,
          tristique"
      />
    </div>
  </TestimonialsWrapper>
);
