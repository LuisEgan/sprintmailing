import React from "react";
import { Loader } from "rsuite";

const SiteLoader = () => (
  <div className="w-screen h-screen flex items-center justify-center bg-white dark:bg-gray-900">
    <Loader />
  </div>
);

export default SiteLoader;
