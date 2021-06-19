import { useRouter } from "next/router";
import React from "react";
import Lottie from "react-lottie";
import notFoundAnim from "utils/lottie/404.json";

import { ROUTES } from "../../routes";

const loaderLottieOptions = {
  loop: true,
  autoplay: true,
  animationData: notFoundAnim,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

const NotFound = () => {
  const router = useRouter();

  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <div className="flex flex-col">
        <div className="mb-10 flex justify-center items-center">
          <Lottie options={loaderLottieOptions} height={300} width={300} />
        </div>
        <div
          className="cursor-pointer underline text-3xl text-center"
          onClick={() => router.push(ROUTES.PRIVATE.home.path)}
          role="button"
          aria-hidden="true"
        >
          TAKE ME HOME
        </div>
      </div>
    </div>
  );
};

export default NotFound;
