export enum ERoutes {
  Catalogue = "/catalogue",
  Cart = "/cart",
}

export interface IAppProps {
  dealers: string[];
}

export interface IProduct {
  name: string;
  price: number;
  image: string;
}

export interface ICartItem extends IProduct {
  amount: number;
}
