import { AuthContext } from "context/auth";
import { useProfile } from "context/profile/profile.context";
import { useRouter } from "next/router";
import { useTheme } from "next-themes";
import React, { useCallback, useContext, useEffect, useState } from "react";
import Lottie from "react-lottie";
import { PUBLIC_ROUTES } from "routes/routes";
import { AFTER_LOGIN_REDIRECT } from "settings/constants";
import lottieSiteLoaderDark from "utils/lottie/site-loader-dark.json";
import lottieSiteLoaderLight from "utils/lottie/site-loader-light.json";

const loaderLightLottieOptions = {
  loop: true,
  autoplay: true,
  animationData: lottieSiteLoaderLight,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

const loaderDarkLottieOptions = {
  loop: true,
  autoplay: true,
  animationData: lottieSiteLoaderDark,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

const SiteLoader = ({ children }) => {
  const { theme } = useTheme();
  const [showLoader, setShowLoader] = useState<boolean>(true);
  const router = useRouter();
  const { isAuthenticated } = useContext(AuthContext);

  const { user } = useProfile();

  const isPublicRoute = useCallback(
    () =>
      Object.values(PUBLIC_ROUTES)
        .map((route) => route.path)
        .includes(router.pathname),
    [router.pathname],
  );

  useEffect(() => {
    if (isAuthenticated() && user)
      setTimeout(() => {
        if (router.pathname === "/") {
          router.push(AFTER_LOGIN_REDIRECT).then(() => setShowLoader(false));
        } else {
          setShowLoader(false);
        }
      }, 2000);

    if (!isAuthenticated())
      setTimeout(() => {
        if (!isPublicRoute()) {
          router.push(PUBLIC_ROUTES.home.path).then(() => setShowLoader(false));
        } else {
          setShowLoader(false);
        }
      }, 2000);
  }, [isAuthenticated(), user]);

  if (showLoader)
    return (
      <div className="w-screen h-screen flex items-center justify-center bg-white dark:bg-gray-900">
        <Lottie
          options={
            theme === "light"
              ? loaderDarkLottieOptions
              : loaderLightLottieOptions
          }
          height={80}
          width={80}
        />
      </div>
    );

  return <>{children}</>;
};

export default SiteLoader;
