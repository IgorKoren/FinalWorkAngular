import { ICategory } from '../interfases/category.interface';

export class Category implements ICategory {
    constructor(
        public categoryId: string,
        public nameUA: string,
        public nameEN: string,
        public imageUrl: string,
        public description: string,
        public productListInCategory: string[]
        // public parentCategories?: string[],
        // public categoryIDDB?: string
    ){}
}


