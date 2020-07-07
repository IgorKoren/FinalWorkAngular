import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/storage';
import { CategoryService } from 'src/app/shared/services/category.service';
import { ProductService } from 'src/app/shared/services/product.service';
import { Observable } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/database';
import { IProduct } from 'src/app/shared/interfases/product/product.interface';
import { Product } from 'src/app/shared/models/product.model';
import { ICategory } from 'src/app/shared/interfases/category.interface';

@Component({
  selector: 'app-admin-products-list',
  templateUrl: './admin-products-list.component.html',
  styleUrls: ['./admin-products-list.component.scss']
})
export class AdminProductsListComponent implements OnInit {
// items: Observable<any[]>;
  // items;
  allProducts: IProduct[];
  allCategoryesList: ICategory[] = [];

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
      console.log(data)
      this.allProducts = []
      data.forEach(item => {
        let a = item.payload.toJSON()
        a['keyObjectFromDB'] = item.key
        this.allProducts.push(a as IProduct)
        console.log(this.allProducts);
      })
    })

    //Взяти список категорій з бази даних
    // this.dataState();
    const s = this.сategoryService.getCategoryList();
    s.snapshotChanges().subscribe(data => { // Using snapshotChanges() method to retrieve list of data along with metadata($key)
      this.allCategoryesList = [];
      console.log(data);
      data.forEach(item => {
        const a = item.payload.toJSON();
        console.log(a);
        // a['categoryId'] = item.key;
        a['catecategoryIDDB'] = item.key;
        // console.log(a['Id']);
        // console.log(a, 'aaaaaaaaaaaaaaaaaaaaaa');
        this.allCategoryesList.push(a as ICategory);
        // this.categoryIdlist.push(this.formBuilder.control(a as ICategory));
      });
    });

  }

  onCheckCategory(e, categoryId: string, ind: number) {
    // const categoryIdlist: FormArray = this.addproductForm.get('categoryIdlist') as FormArray;
    // if (e.target.checked) {
    //   categoryIdlist.push(new FormControl(e.target.value));
    // } else {
    //   let i = 0;
    //   categoryIdlist.controls.forEach((item: FormControl) => {
    //     if (item.value == e.target.value) {
    //       categoryIdlist.removeAt(i);
    //       return;
    //     }
    //     i++;
    //   });
    }
    
  editProduct(oneProduct: IProduct){
    console.log('Редагувати товар');
    console.log(oneProduct);
    this.productService.productForEdit = oneProduct;
    // console.log(this.productService.productForEdit);
    
  }
  trimimageUrlList(oneProduct: IProduct, i: number) {
    const rr = this.allProducts[i].imageUrlList;
    if( rr ){
      return this.allProducts[i].imageUrlList[0]
    }
  }

  deleteProduct(product) {
    console.log(product);
    // this.сategoryService.deleteProduct(category.id);
    if (window.confirm(`Видалити цей товар: ${product.title}`)) 
    { 
      this.productService.deleteProduct(product); 
      console.log('Товар видалений');
      // this.toastr.success(student.firstName + ' successfully deleted!');
    }
  }

  cloneProduct(oneProduct: IProduct, clene = true){
    console.log('Редагувати товар');
    console.log(oneProduct);
    
    this.productService.productForEditClone = oneProduct;
    this.productService.clone = true;
    // console.log(this.productService.productForEdit);
    
  }

}
