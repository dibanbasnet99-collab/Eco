export interface CartItem {
  cartKey: string;
  productId: string;
  name: string;
  nepaliName?: string;
  price: number;
  quantity: number;
  image: string;
  bottlesSaved: number;
  engravingNote?: string;
  engravingFont?: string;
  engravingMotif?: string;
  isRefill?: boolean;
  refillVolumeMl?: number;
}
