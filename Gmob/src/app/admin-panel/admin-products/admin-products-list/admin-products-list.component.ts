import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/storage';
import { CategoryService } from 'src/app/shared/services/category.service';
import { ProductService } from 'src/app/shared/services/product.service';
import { Observable } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/database';
import { IProduct } from 'src/app/shared/interfases/product/product.interface';
import { Product } from 'src/app/shared/models/product.model';
import { ICategory } from 'src/app/shared/interfases/category.interface';
import { Category } from 'src/app/shared/models/category.model';

@Component({
  selector: 'app-admin-products-list',
  templateUrl: './admin-products-list.component.html',
  styleUrls: ['./admin-products-list.component.scss']
})
export class AdminProductsListComponent implements OnInit {
  // items: Observable<any[]>;
  // items;
  allProducts: IProduct[];
  allProdBeforeFilter: IProduct[] = []
  allCategoryesList: ICategory[] = [];
  // searchText: string;
  searchForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private afStorage: AngularFireStorage,
    public сategoryService: CategoryService,
    private productService: ProductService,
    private db: AngularFireDatabase

  ) { }

  ngOnInit(): void {
    this.searchForm = new FormGroup(
      {
        searchText: new FormControl('')
      }
    )

    let p = this.productService.getProductList();
    // console.log(this.productService.getProductList())
    p.snapshotChanges().subscribe(data => {
      console.log(data)
      this.allProducts = []
      data.forEach(item => {
        let a = item.payload.toJSON()
        a['keyObjectFromDB'] = item.key;
        this.allProducts.push(a as IProduct)
        console.log(this.allProducts);
        return true;
      })
    })

    //Взяти список категорій з бази даних
    // this.dataState();


    // const s = this.сategoryService.getCategoryList();
    // s.snapshotChanges().subscribe(data => { 
    //   this.allCategoryesList = [];
    //   console.log(data);
    //   data.forEach(item => {
    //     const a = item.payload.toJSON();
    //     console.log(a);
    //     // a['categoryId'] = item.key;
    //     a['catecategoryIDDB'] = item.key;
    //     // console.log(a['Id']);
    //     // console.log(a, 'aaaaaaaaaaaaaaaaaaaaaa');
    //     this.allCategoryesList.push(a as ICategory);
    //     return true;
    //     // this.categoryIdlist.push(this.formBuilder.control(a as ICategory));
    //   });
    // });






    const ref = this.db.database.ref('category-list');
    this.allCategoryesList = [];

    ref.once('value')
      .then(snapshot => {
        console.log(snapshot);
        console.log(snapshot.val());

        console.log(snapshot.val().toJSON);
        console.log(snapshot.ref);
        console.log(snapshot.key);

        const keysCategoriess = Object.keys(snapshot.val())
        console.log(keysCategoriess);

        const categor = Object.values(snapshot.val())
        console.log(categor);

        for (let i = 0; i < categor.length; i++) {
          console.log('Виконується цикл');
          console.log(categor[i]);
          categor[i]['catecategoryIDDB'] = keysCategoriess[i]
          this.allCategoryesList.push(categor[i] as ICategory);

        }

        // console.log(snapshot.key);

        // const categoryId = snapshot.child(categoryIdlist[i]).val().Id;
        // console.log(categoryId);
        // const nameUA = snapshot.child(categoryIdlist[i]).val().nameUA;
        // console.log(nameUA);
        // const nameEN = snapshot.child(categoryIdlist[i]).val().nameEN;
        // console.log(nameEN);
        // const imageUrl = snapshot.child(categoryIdlist[i]).val().imageUrl;
        // console.log(imageUrl);
        // const description = snapshot.child(categoryIdlist[i]).val().description;
        // console.log(description);
      })







    console.log(this.allCategoryesList);


  }

  // tslint:disable-next-line:member-ordering


  onCheckCategory(e, categoryID: string, ind: number) {
    if (this.allProdBeforeFilter.length === 0) {
      this.allProdBeforeFilter = JSON.parse(JSON.stringify(this.allProducts))
      console.log(this.allProdBeforeFilter);
    }

    const sss = new Set()
    sss.forEach(el => {
      console.log( el );
      
      if (el !== categoryID) {
        sss.add(categoryID)
      }

    })
    console.log(sss);


    // this.allProdBeforeFilter = [...this.allProducts];
    console.log(this.allProdBeforeFilter);

    let filteredProdList;

    if (e.target.checked) {

      console.log(categoryID);
      // tslint:disable-next-line:no-unused-expression
      filteredProdList = this.allProducts.filter(prod => {
        const lists = Object.values(prod.categoryIdlist);
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < lists.length; i++) {
          console.log(Object.values(prod.categoryIdlist));
          const list = Object.values(prod.categoryIdlist)
          console.log('виконується метод в циклі');
          console.log(prod.categoryIdlist[i]);
          return list.some(element => element === categoryID);
        }
      })

      // this.allCategoryesList.push(category.catecategoryIDDB)
      console.log(filteredProdList);

      this.allProducts = filteredProdList as Array<IProduct>;
      console.log(this.allProducts);
      console.log(this.allProdBeforeFilter);

    } else {

      this.allProducts = [...this.allProdBeforeFilter];
      console.log(this.allProducts);

      // this.allCategoryesList.splice(ind, 1)
    }

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

  editProduct(oneProduct: IProduct) {
    console.log('Редагувати товар');
    console.log(oneProduct);
    this.productService.productForEdit = oneProduct;
    // console.log(this.productService.productForEdit);

  }
  trimimageUrlList(oneProduct: IProduct, i: number) {
    const rr = this.allProducts[i].imageUrlList;
    if (rr) {
      return this.allProducts[i].imageUrlList[0]
    }
  }

  deleteProduct(product) {
    console.log(product);
    // this.сategoryService.deleteProduct(category.id);
    if (window.confirm(`Видалити цей товар: ${product.title}`)) {
      console.log(product.keyObjectFromDB);

      this.productService.deleteProduct(product, product.keyObjectFromDB);


      console.log('Товар видалений');
      // this.toastr.success(student.firstName + ' successfully deleted!');
    }
  }


  cloneProduct(oneProduct: IProduct, clene = true) {
    console.log('Редагувати товар');
    console.log(oneProduct);
    this.productService.productForEditClone = oneProduct;
    this.productService.clone = true;
    // console.log(this.productService.productForEdit);

  }

}
