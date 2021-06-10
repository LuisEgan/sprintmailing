import React, { useContext, useEffect } from "react";
import { AuthContext } from "context/auth";
import { useRouter } from "next/router";
import { APP_BASE_ROUTE } from "components/SideMenu/private-routes";
import { useProfile } from "context/profile/profile.context";
import SiteLoader from "components/SiteLoader/SiteLoader";

const Index = () => {
  const router = useRouter();

  const { isAuthenticated } = useContext(AuthContext);
  const { user } = useProfile();

  useEffect(() => {
    if (isAuthenticated() && user)
      setTimeout(() => router.push(APP_BASE_ROUTE.url), 2000);

    if (!isAuthenticated()) setTimeout(() => router.push("/login"), 2000);
  }, [isAuthenticated, user]);

  return <SiteLoader />;
};

export default Index;
