export interface IProduct {
  id: number;
  title: string;
  price: number;
  imageUrl: string;
  isFavorite: boolean;
  favouriteId: number | null;
  isAdded: boolean;
}

export type TProductFromMainResponse = Omit<IProduct, 'isFavorite' | 'isAdded' | 'favouriteId'>;

export interface IFavourite {
  id: number;
  parentId: number;
}
