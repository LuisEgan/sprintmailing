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
}

export interface ICoordinates {
  lat: number;
  lng: number;
}
