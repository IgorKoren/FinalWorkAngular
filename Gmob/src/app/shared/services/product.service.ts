import { Injectable } from '@angular/core';
import { AngularFireList, AngularFireObject, AngularFireDatabase } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';
import { CategoryService } from './category.service';
import { Observable } from 'rxjs';
import { IProduct } from '../interfases/product/product.interface';
import { error } from 'protractor';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private ulr: string;
  productsRef: AngularFireList<any>;
  oneProductRef: AngularFireObject<any>;
  public productForEdit: IProduct = null;
  public productForEditClone: IProduct = null;
  prodRef: any;
  clone = false;

  constructor(
    private db: AngularFireDatabase,
    private firestore: AngularFireStorage,
    private categoryService: CategoryService,
    private location: Location,         // Location service to go back to previous component
    private actRoute: ActivatedRoute,   // Activated route to get the current component's inforamation
    private router: Router,
    private route: ActivatedRoute
  ) { }




  // Create Product
  addProduct(newProduct: IProduct) {
    this.getProductList().push({
      idProduct: newProduct.idProduct,
      title: newProduct.title,
      price: newProduct.price,
      description: newProduct.description,
      imageUrlList: newProduct.imageUrlList,
      status: newProduct.status,
      categoryIdlist: newProduct.categoryIdlist,
      count: newProduct.count,
      notLimited: newProduct.notLimited,
      seo: newProduct.seo,
      showTheProductOnTheStoreHomePage: newProduct.showTheProductOnTheStoreHomePage,
      countInBascket: newProduct.countInBascket,
      relatedProductsId: newProduct.relatedProductsId,
      dateCreation: newProduct.dateCreation,
      keyObjectFromDB: newProduct.keyObjectFromDB
    })
      .then(() => {
        console.log(newProduct.imageUrlList);
        console.log('Додавання товару виконано');

        this.categoryService.updateProductListInCategory(newProduct.idProduct, newProduct.categoryIdlist, false);

        this.router.navigate(['/admin-panel/products']);


        return newProduct;

      })
      .catch((error) => {
        console.log('Сталаcя помилка при записі даних в BD');
        return error;
      })

    // console.log(newProduct);
    // console.log(this.productsRef);

    //додати newProduct в список категорій
    // this.productsRef.push({


    // Id: category.categoryId,
    // nameUA: category.nameUA,
    // nameEN: category.nameEN,
    // description: category.description,
    // imageUrl: category.imageUrl
    // })
  }

  getProductList(): AngularFireList<any> {
    this.productsRef = this.db.list('products');
    return this.productsRef;
  }
  getProductListidProduct(idProduct: string): AngularFireObject<any> {
    this.prodRef = this.db.object('products' + '/' + idProduct);
    return this.prodRef;
  }
  // Update Product Object
  updateProduct(newProduct: IProduct) {
    console.log(newProduct.keyObjectFromDB);
    console.log(newProduct.notLimited);

    this.getProductListidProduct(newProduct.keyObjectFromDB).update({
      idProduct: newProduct.idProduct,
      title: newProduct.title,
      price: newProduct.price,
      description: newProduct.description,
      imageUrlList: newProduct.imageUrlList,
      status: newProduct.status,
      categoryIdlist: newProduct.categoryIdlist,
      count: newProduct.count,
      notLimited: newProduct.notLimited,
      seo: newProduct.seo,
      showTheProductOnTheStoreHomePage: newProduct.showTheProductOnTheStoreHomePage,
      countInBascket: newProduct.countInBascket,
      relatedProductsId: newProduct.relatedProductsId,
      dateCreation: newProduct.dateCreation,
      keyObjectFromDB: newProduct.keyObjectFromDB
    })
      .then(() => {
        this.productForEdit = null;
        console.log('Обновлення товару виконано успішно');
        this.categoryService.updateProductListInCategory(newProduct.idProduct, newProduct.categoryIdlist, false, true);




        // this.router.navigate(['../products'], { relativeTo: this.route });
        this.router.navigate(['/admin-panel/products']);

      })
      .catch((error) => {
        console.log('При обновленні виникла помилка');
        console.log(error);
      });



  }

  // Delete Product Object
  deleteProduct(delProd: IProduct) {
    this.oneProductRef = this.db.object('products/' + delProd.keyObjectFromDB);

    this.categoryService.updateProductListInCategory(delProd.idProduct, delProd.categoryIdlist, true);


    console.log(delProd.categoryIdlist);


    this.oneProductRef.remove()
      .then(() => {
        if (delProd.imageUrlList) {
          const delImUrl = Object.values(delProd.imageUrlList)
          // console.log(delImUrl);
          for (let i = 0; i < delImUrl.length; i++) {
            this.deleteImageInDB(delImUrl[i])
          }
        }







      });
  }

  //Методи для Завантаження, заміни, видалення картинок з AngularFireStorage 
  deleteImageInDB(itemForDelete) {
    console.log(itemForDelete);
    // this._storage.storage.refFromURL(post.coverPic).delete()
    return this.firestore.storage.refFromURL(itemForDelete).delete()
      .then(() => {
        console.log('Катринка успішно видалена');
        return itemForDelete;
      })
      .catch((error) => {
        console.log('ПРОБЛЕМА ' + error.code);
        console.log('ПРОБЛЕМА ' + error.message);
        return error;
      });
  }
}
