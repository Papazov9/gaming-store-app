export interface Product {
  name: string,
  description: string,
  price: number,
  isOnSale: boolean,
  imageUrl: string
}

export interface ProductView extends Product{
  id: string
}