declare namespace API {
  export type IDoc = {
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

}