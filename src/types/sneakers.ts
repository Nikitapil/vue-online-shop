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

export interface IBookmarksResponse {
  id: number;
  item: TProductFromMainResponse;
}

export interface IFavourite {
  id: number;
  item_id: number;
}
