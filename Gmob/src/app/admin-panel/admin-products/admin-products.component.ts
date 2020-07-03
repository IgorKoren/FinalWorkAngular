import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/storage';
import { CategoryService } from 'src/app/shared/services/category.service';
import { ProductService } from 'src/app/shared/services/product.service';
import { Observable } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/database';
import { IProduct } from 'src/app/shared/interfases/product/product.interface';
import { Product } from 'src/app/shared/models/product.model';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss']
})

export class AdminProductsComponent implements OnInit {

  // items: Observable<any[]>;
  // items;
  allProducts: IProduct[]

  constructor(
    private formBuilder: FormBuilder,
    private afStorage: AngularFireStorage,
    public сategoryService: CategoryService,
    private productService: ProductService,
    private db: AngularFireDatabase

  ) { }

  ngOnInit(): void {
    let p = this.productService.getProductList();
    // console.log(this.productService.getProductList())
    p.snapshotChanges().subscribe(data => {
      this.allProducts = []
      data.forEach(item => {
        let a = item.payload.toJSON()
        a['keyObjectFromDB'] = item.key
        this.allProducts.push(a as IProduct)
        console.log(this.allProducts);
      })
    })

  }
  trimimageUrlList(oneProduct: IProduct, i: number) {

   
    // let trImag;
    // console.log(trImag);
    // if ( oneProduct.imageUrlList as Array<string> === undefined || null ) {
    //   console.log('Немає фото..');
    //   // trImag = 'Немає фото..'
    //   return null;
    // } else {
    //   trImag = oneProduct.imageUrlList as Array<string>;
    //   console.log(trImag);
      
    //   trImag = oneProduct.imageUrlList[0];
    //   console.log(trImag);
    //   return trImag;
    // }
    const rr = this.allProducts[i].imageUrlList;
    if( rr ){
      return this.allProducts[i].imageUrlList[0]
    }
    
  
  }

  deleteCategory(product) {
    console.log(product);
    // this.сategoryService.deleteCategory(category.id);
    if (window.confirm(`Видалити цей товар: ${product.title}`)) 
    { 
      this.productService.deleteProduct(product.keyObjectFromDB); 
      console.log('Товар видалений');
      
      // this.toastr.success(student.firstName + ' successfully deleted!');
    }
  }

}
