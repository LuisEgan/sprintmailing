import { useQuery } from "@apollo/client";
import Header from "components/_Custom/Header/Header";
import VendorBanners from "components/_Custom/VendorBanners/VendorBanners";
import { gqlVendor } from "gql";
import { IVendor } from "types/Vendor.types";

const SiteConfig = () => {
  const { data } = useQuery<{ userVendor: IVendor }>(
    gqlVendor.queries.GET_USER_VENDOR,
  );

  return (
    <div className="h-full w-full">
      <Header title="Configuación del sitio" />
      {data && <VendorBanners currentBanners={data?.userVendor?.banners} />}
    </div>
  );
};

export default SiteConfig;
