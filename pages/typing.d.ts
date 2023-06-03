declare namespace API {
  export type IDoc = {
    title: string;
    base: string;
    name: string;
    path: string;
    type: string;
  }
  
  export interface IProductData {
    [productName: string]: {
      training: { name: string}[];
      docs: IDoc[]
    }
  }

  export interface DocItem {
    name: string;
    type: string;
    href: string;
    items?: DocItem[] | null;
    openItems?: string[];
    key: string;
  }

}