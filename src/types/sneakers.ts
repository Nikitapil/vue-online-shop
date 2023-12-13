export interface IProduct {
  id: number;
  title: string;
  price: number;
  imageUrl: string;
  isFavorite: boolean;
  isAdded: boolean;
}

export type TProductFromMainResponse = Omit<IProduct, 'isFavorite' | 'isAdded'>;
