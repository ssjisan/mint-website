export interface PackageItem {
  id: string;
  title: string;
}

export interface Package {
  _id: string;
  packageName: string;
  price: number;
  speedMbps: number;
  type: "residential" | "corporate";
  items: PackageItem[];
  createdAt?: string;
}
