export interface Kit {
  id: number;
  kitType: KitType;
  photoUrl: string;
}

export enum KitType {
  HomeKit,
  AwayKit,
  ThirdKit
}
