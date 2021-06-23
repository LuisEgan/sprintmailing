import { useRouter } from "next/router";
import { useTheme } from "next-themes";
import React from "react";
import Lottie from "react-lottie";
import { ROUTES } from "routes";
import { Button } from "rsuite";
import notFoundLight from "utils/lottie/404-dark.json";
import notFoundDark from "utils/lottie/404-light.json";
import probetAnim from "utils/lottie/probet.json";

const LightLottieOptions = {
  loop: true,
  autoplay: true,
  animationData: notFoundLight,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

const DarkLottieOptions = {
  loop: true,
  autoplay: true,
  animationData: notFoundDark,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

const loader2LottieOptions = {
  loop: true,
  autoplay: true,
  animationData: probetAnim,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

const NotFound = () => {
  const { theme } = useTheme();
  const router = useRouter();

  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <div className="flex flex-col">
        <div className="mb-10 flex flex-col justify-center items-center">
          <Lottie options={loader2LottieOptions} height={200} width={200} />
          <Lottie
            options={theme === "light" ? LightLottieOptions : DarkLottieOptions}
            height={130}
            width={200}
          />
          <h3 className="text-2xl font-bold">Oops! Esta página no existe </h3>
        </div>

        <div className="text-center">
          <Button
            appearance="primary"
            onClick={() => router.push(ROUTES.PRIVATE.home.path)}
          >
            Volver al inicio
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
