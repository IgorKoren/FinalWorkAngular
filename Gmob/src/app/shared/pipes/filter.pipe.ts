import { Pipe, PipeTransform } from '@angular/core';
import { ICategory } from '../interfases/category.interface';
import { IProduct } from '../interfases/product/product.interface';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(allProd: IProduct[], saerch: string = ''): IProduct[] {
    console.log(saerch);
    if (!saerch) {
      return allProd;
    }
    
    let prods: IProduct[] = [];
    let prodsID: IProduct[];
    let prodsTitle: IProduct[]

   
    // return allProd.filter( prod => {
    //   console.log(saerch);
    //   return prod.title.toLowerCase().includes(saerch.toLowerCase())
    // })

    prodsTitle = allProd.filter(prod => {
      return prod.title.toLowerCase().includes(saerch.toLowerCase())
    })
    console.log(prods);
    prodsID = allProd.filter(prod => {
      return prod.idProduct.toLowerCase().includes(saerch.toLowerCase())
    })
    console.log(prodsID);
    prods = [...new Set(prodsID.concat(prodsTitle))]
    // prods.concat(prodsID, prodsTitle)
    console.log(prods);
    return prods;
  }

}
