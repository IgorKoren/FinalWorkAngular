import { IProduct } from '../interfases/product/product.interface';

export class Product implements IProduct {
    constructor(
        public idProduct: string = '',
        public title: string = '',
        public price: number = 0,
        public description: string = '',
        public imageUrlList: string[] = [],
        public status: boolean = true,
        public categoryIdlist: [] = [],
        public count: number = 0,
        public notLimited: boolean = true,
        public seo = {
            // titleSeo = '';
            // metaDescription = '';
            // keyWords = ''
        },
       
        public showTheProductOnTheStoreHomePage: boolean = false,
        public countInBascket: number = 0,
        public relatedProductsId: string[] = [],
        public dateCreation = {
            dateYear:  new Date().getFullYear(),
            dateMonth: new Date().getMonth(),
            dateDay: new Date().getUTCDate(),
            dateHours: new Date().getHours(),
            dateMinutes: new Date().getMinutes()
        },
        public keyObjectFromDB: string = ''
    ){}
}