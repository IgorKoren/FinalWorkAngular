import { ICategory } from '../category.interface';

export interface IProduct {
    idProduct: string;
    title: string;
    price: number;
    description: string;
    imageUrlList: string[];
    status: boolean;
    categoryIdlist?: [];
    count?: number;
    notLimited?: boolean;
    seo?: {
        titleSeo?: string;
        metaDescription?: string;
        keyWords?: string;
    };
   
    showTheProductOnTheStoreHomePage?: boolean;
    countInBascket?: number;
    relatedProductsId?: string[];
    dateCreation?: {
        dateYear?: number;
        dateMonth?: number;
        dateDay?: number;
        dateHours?: number;
        dateMinutes?: number;
    };
    keyObjectFromDB?: string;
    

  

}

