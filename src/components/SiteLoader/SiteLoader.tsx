import { AuthContext } from "context/auth";
import { useProfile } from "context/profile/profile.context";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import Lottie from "react-lottie";
import { PUBLIC_ROUTES } from "routes/routes";
import { AFTER_LOGIN_REDIRECT } from "settings/constants";
import lottieSiteLoader from "utils/lottie/site-loader.json";

const loaderLottieOptions = {
  loop: true,
  autoplay: true,
  animationData: lottieSiteLoader,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

const SiteLoader = ({ children }) => {
  const [showLoader, setShowLoader] = useState<boolean>(true);
  const router = useRouter();
  const { isAuthenticated } = useContext(AuthContext);

  const { user } = useProfile();

  useEffect(() => {
    if (isAuthenticated() && user)
      setTimeout(() => {
        if (router.pathname === "") {
          router.push(AFTER_LOGIN_REDIRECT).then(() => setShowLoader(false));
        }
      }, 2000);

    if (!isAuthenticated())
      setTimeout(() => {
        if (
          router.pathname !== PUBLIC_ROUTES.login.path &&
          router.pathname !== "/404"
        ) {
          router
            .push(PUBLIC_ROUTES.login.path)
            .then(() => setShowLoader(false));
        }
      }, 2000);
  }, [isAuthenticated(), user]);

  if (showLoader)
    return (
      <div className="w-screen h-screen flex items-center justify-center bg-white dark:bg-gray-900">
        <Lottie options={loaderLottieOptions} height={80} width={80} />
      </div>
    );

  return <>{children}</>;
};

export default SiteLoader;
