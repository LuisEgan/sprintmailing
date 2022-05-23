import { gql } from "@apollo/client";

const GET_USER_VENDOR = gql`
  query userVendor {
    userVendor {
      name
      banners {
        title
        description
        bannerUrl
        cta
        btnColor
        btnText
        align
        modal
      }
    }
  }
`;

export interface IGetVendorBannersInput {
  vendor: string;
}

const GET_VENDOR_BANNERS = gql`
  query vendorBanners($getVendorBannersInput: GetVendorBannersInput!) {
    vendorBanners(getVendorBannersInput: $getVendorBannersInput) {
      title
      description
      bannerUrl
      cta
      btnColor
      btnText
      align
      modal
    }
  }
`;

export default {
  GET_USER_VENDOR,
  GET_VENDOR_BANNERS,
};
