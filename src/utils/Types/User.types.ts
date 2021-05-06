import { IVendor } from "./Vendor.types";

export interface IUser {
  id: string;
  updatedAt: Date;
  createdAt: Date;
  deletedAt: Date;
  name: string;
  lastname: string;
  email: string;
  phone: string;
  address: [IAddress];
  contact: [IContact];
  card: [ICard];
  recoveryPasswordToken: String;
  password: string;
  networkType: string;
  roles: [IUserRoleVendor];
  vendorList: [IUserVendorListType];
  selectedVendorId: String;
  selectedVendor: IVendor;
  random4digits: number;
  active: boolean;
  profileImage: string;
  root: boolean;
}

export interface IAddress {
  id?: string;
  name?: string;
  info: string;
  street: string;
  number: string;
}

export interface IContact {
  id: string;
  type: string;
  number: string;
}

export interface ICard {
  id: string;
  creditCardType: string;
  last4CardDigits: string;
  tbkUser: string;
  authCode: string;
}

export interface IUserRoleVendor {
  role: string;
  vendorId: string;
}

export interface IUserVendorListType {
  id: string;
  name: string;
}
