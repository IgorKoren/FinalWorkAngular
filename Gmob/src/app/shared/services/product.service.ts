import { Injectable } from '@angular/core';
import { AngularFireList, AngularFireObject, AngularFireDatabase } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';
import { CategoryService } from './category.service';
import { Observable } from 'rxjs';
import { IProduct } from '../interfases/product/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private ulr: string;
  productsRef: AngularFireList<any>
  oneProductRef: AngularFireObject<any>

  constructor(
    private db: AngularFireDatabase,
    private firestore: AngularFireStorage,
    private categoryService: CategoryService
  ) { }


 

  // Create Product
addProduct(newProduct: IProduct){
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
    return newProduct;
    // this.categoryService.updateProductListInCategory(newProduct.idProduct, newProduct.categoryIdlist)
  })
  .catch(error => {
    console.log('Сталаcя помилка при записі даних в BD');
    return error;
  })



  // this.getProductList().push({
  //   idProduct: newProduct.idProduct,
  //   title: newProduct.title,
  //   price: newProduct.price,
  //   description: newProduct.description,
  //   imageUrlList: newProduct.imageUrlList,
  //   status: newProduct.status,
  //   categoryIdlist: newProduct.categoryIdlist,
  //   count: newProduct.count,
  //   notLimited: newProduct.notLimited,
  //   seo: newProduct.seo,
  //   showTheProductOnTheStoreHomePage: newProduct.showTheProductOnTheStoreHomePage,
  //   countInBascket: newProduct.countInBascket,
  //   relatedProductsId: newProduct.relatedProductsId
  // })
  // .then(() => {
  //   console.log(newProduct.imageUrlList);
  //   console.log('Додавання товару виконано');
  //   return newProduct;
  //   // this.categoryService.updateProductListInCategory(newProduct.idProduct, newProduct.categoryIdlist)
  // })
  // .catch(error => {
  //   console.log('Сталачя помилка при записі даних в BD');
  //   return error;
  // })
  console.log(newProduct);
  console.log(this.productsRef);

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
getProductListidProduct(idProduct: string): AngularFireList<any> {
  this.productsRef = this.db.list('products' + '/' + idProduct);
  return this.productsRef;
}
 // Update Product Object
 updateProduct(student: IProduct) {
  this.oneProductRef.update({
    // firstName: student.firstName,
    // lastName: student.lastName,
    // email: student.email,
    // mobileNumber: student.mobileNumber
  })
}  

// Delete Product Object
deleteProduct(idProduct: string) {
  this.oneProductRef = this.db.object('products/' + idProduct);
  this.oneProductRef.remove();
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
