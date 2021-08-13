import React from "react";
import { BOTTLE_ICON, RECYCLING_ICON, TRASH_ICON } from "settings/icons";

import { ServiceCard } from "./Cards/ServiceCard";
import { ServicesWrapper } from "./Services.style";

export const Services = () => (
  <ServicesWrapper>
    <div className="flex flex-col items-center gap-2">
      <h2 className="text-3xl font-bold text-gray-500">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </h2>
      <p className="text-lg text-gray-400">
        ed eros ante, facilisis accumsan vehicula eu, laoreet sed lacus.
        Curabitur a molestie arcu.
      </p>
    </div>
    <div className="flex mt-10 justify-items-center">
      <ServiceCard
        icon={RECYCLING_ICON}
        title="Nullam lacinia justo"
        description="Vestibulum sagittis mollis leo et vestibulum. Curabitur auctor felis
          quis felis ullamcorper"
      />
      <ServiceCard
        icon={BOTTLE_ICON}
        title="Nullam lacinia justo"
        description="Vestibulum sagittis mollis leo et vestibulum. Curabitur auctor felis
          quis felis ullamcorper"
      />
      <ServiceCard
        icon={TRASH_ICON}
        title="Nullam lacinia justo"
        description="Vestibulum sagittis mollis leo et vestibulum. Curabitur auctor felis
          quis felis ullamcorper"
      />
    </div>
  </ServicesWrapper>
);
