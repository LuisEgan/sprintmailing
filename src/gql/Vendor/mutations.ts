import { gql } from "@apollo/client";
import { IVendorBanner } from "types/Vendor.types";

export interface IUpdateVendorInput {
  name?: string;
  logo?: string;
  banners?: IVendorBanner[];
  description?: string;
  phone?: string;
}

const UPDATE_VENDOR = gql`
  mutation updateVendor($updateVendorInput: UpdateVendorInput!) {
    updateVendor(updateVendorInput: $updateVendorInput) {
      id
    }
  }
`;

export default { UPDATE_VENDOR };
