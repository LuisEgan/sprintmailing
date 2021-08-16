import React from "react";
import { Button } from "rsuite";

import { HeadlineWrapper } from "./Headline.style";

export const Headline = () => (
  <HeadlineWrapper>
    <div className="flex flex-col items-center gap-4">
      <h1 className="text-4xl font-bold mt-64">
        Tristique leo mauris eget finibus nisl.
      </h1>
      <p className="text-base font-light ">
        Vestibulum sagittis mollis leo et vestibulum
      </p>
      <Button className="mb-6 border-8 border-pink-900 w-36">
        Call to action
      </Button>
    </div>
  </HeadlineWrapper>
);
