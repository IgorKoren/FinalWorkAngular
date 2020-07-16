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
      .then((data) => {
        console.log(data);
        console.log(data.key);

        console.log(newProduct.imageUrlList);
        console.log('Додавання товару виконано');

        console.log(newProduct.keyObjectFromDB);

        this.categoryService.addProductListInCategory(data.key, newProduct.categoryIdlist);
        this.clone = false;
        // this.categoryService.updateProductListInCategory(data.key, newProduct.categoryIdlist, false, false);

        this.router.navigate(['/admin-panel/products']);


        // return newProduct;

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
        this.clone = false;
        console.log('Обновлення товару виконано успішно');
        console.log(newProduct.keyObjectFromDB);

        this.categoryService.updProductListInCategory(newProduct.keyObjectFromDB, newProduct.categoryIdlist);



        this.clone = false;
        // this.router.navigate(['../products'], { relativeTo: this.route });
        this.router.navigate(['/admin-panel/products']);

      })
      .catch((error) => {
        console.log('При обновленні виникла помилка');
        console.log(error);
      });



  }

  // Delete Product Object
  deleteProduct(delProd: IProduct, keyProd: string) {
    console.log('Виконується видалення товару!!!!!!!');

    this.oneProductRef = this.db.object('products/' + keyProd);
    const refDelObj = this.db.object('products/' + delProd.keyObjectFromDB);

    console.log(delProd.keyObjectFromDB);

    // this.categoryService.updateProductListInCategory(keyProd, delProd.categoryIdlist, true, false);

    console.log(delProd.categoryIdlist);
    this.oneProductRef.remove()
      .then((data) => {
        console.log(refDelObj);
        
        refDelObj.remove()
        .then ( () => {
          console.log('ЗРОБЛЕНО ДРУГЕ ВИДАЛЕННЯ КЛЮЧА');
        })
        if (delProd.imageUrlList) {
          const delImUrl = Object.values(delProd.imageUrlList)
          // console.log(delImUrl);
          for (let i = 0; i < delImUrl.length; i++) {
            this.deleteImageInDB(delImUrl[i])
          }
          this.productForEdit = null;
          this.productForEditClone = null;
          this.clone = false;
        }
      });
    this.categoryService.deleteProductListInCategory(keyProd, delProd.categoryIdlist);
    keyProd = null;

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
