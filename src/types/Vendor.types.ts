export interface IVendor {
  id: string;
  updatedAt: Date;
  createdAt: Date;
  deletedAt: Date;
  slug: string;
  name: string;
  logoUrl: string;
  logoDarkUrl: string;
  thumbnailUrl: string;
  bannerUrl: string;
  slogan: string;
  description: string;
  address: string;
  owners: [string];
  status: string;
  visible: boolean;
  bankId: number;
  rutAccount: string;
  accountType: number;
  accountNumber: string;
  beneficiaryName: string;
  beneficiaryEmail: string;
  coordinates: ICoordinates;
  phone: string;
  banners?: IVendorBanner[];
}

export interface ICoordinates {
  lat: number;
  lng: number;
}

export interface IVendorBanner {
  title?: string;
  description?: string;
  bannerUrl?: string;
  cta?: string;
  btnColor?: string;
  btnText?: string;
  align?: string;
  modal?: string;
}
