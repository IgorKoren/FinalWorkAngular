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
  categoriesRef: AngularFireList<any>
  categoryRef: AngularFireObject<any>

  constructor(
    private db: AngularFireDatabase,
    private firestore: AngularFireStorage,
    private categoryService: CategoryService
  ) { }


  // getProduct(): Observable<Array<IProduct>> {
  //   return this.http.get<Array<IProduct>>(this.url);
  // }

  // addProduct(product: IProduct): Observable<Array<IProduct>> {
  //   return this.http.post<Array<IProduct>>(this.url, product);
  // }

  // deleteProduct(product: IProduct): Observable<Array<IProduct>> {
  //   return this.http.delete<Array<IProduct>>(`${this.url}/${product.id}`);
  // }

  // updateProduct(product: IProduct): Observable<Array<IProduct>> {
  //   return this.http.put<Array<IProduct>>(`${this.url}/${product.id}`, product);
  // }

  // getOneProduct(id: number): Observable<IProduct> {
  //   return this.http.get<IProduct>(`${this.url}/${id}`);
  // }



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
