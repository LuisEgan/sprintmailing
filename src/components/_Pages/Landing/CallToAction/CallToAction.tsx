import React from "react";
import { Button } from "rsuite";

import { CallToActionWrapper } from "./CallToAction.style";

export const CallToAction = () => (
  <CallToActionWrapper>
    <div className="flex flex-col items-center gap-2">
      <h2 className="text-3xl font-bold text-gray-400">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </h2>
      <p className="text-lg text-gray-400">
        ed eros ante, facilisis accumsan vehicula eu, laoreet sed lacus.
        Curabitur a molestie arcu.
      </p>
    </div>
    <div className="flex mt-10 justify-center">
      <div
        className="bg-gray-500 flex font-bold items-center justify-center text-4xl rounded-2xl"
        style={{ height: 400, width: 500 }}
      >
        500 x 400
      </div>
      <div className="flex flex-col ml-10 gap-4">
        <h2 className="text-2xl font-bold text-gray-400">
          Nullam lorem nibh, elementum
        </h2>
        <p className="text-base text-gray-400">
          estibulum sagittis mollis leo et vestibulum. Curabitur auctor felis
        </p>
        <Button
          appearance="primary"
          style={{ width: 150 }}
          className="rs-btn-big"
        >
          Call to action
        </Button>
      </div>
    </div>
  </CallToActionWrapper>
);
