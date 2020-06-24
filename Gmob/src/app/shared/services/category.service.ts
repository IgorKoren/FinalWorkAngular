import { Injectable } from '@angular/core';

import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { ICategory } from '../interfases/category.interface';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  categoriesRef: AngularFireList<any>;    // Reference to Student data list, its an Observable
  categoryRef: AngularFireObject<any>;   // Reference to Student object, its an Observable too
  
  private ulr: string;

  constructor(private db: AngularFireDatabase,
              private firestore: AngularFirestore) {}

  // Create Category
  addCategory(category: ICategory) {
   
    console.log(category);
    
    this.categoriesRef.push({
      Id: category.categoryId,
      nameUA: category.nameUA,
      nameEN: category.nameEN,
      description: category.description,
      imageUrl: category.imageUrl
    })
  }

   // Fetch Single Category Object
   getGategory(id: string) {
    this.categoryRef = this.db.object('category-list/' + id);
    console.log( this.categoryRef );
    return this.categoryRef;
  }
   // Fetch Category List
   getCategoryList() {
    this.categoriesRef = this.db.list('category-list');
    return this.categoriesRef;
  }
  // Update Category Object
  updateCategory(category: ICategory) {
    this.categoryRef.update({
      Id: category.categoryId,
      nameUA: category.nameUA,
      nameEN: category.nameEN,
      imageUrl: category.imageUrl,
      description: category.description
    })
  }
  // Delete Category Object
  deleteCategory(id: string) {
   console.log(id);
  this.categoryRef = this.db.object('category-list/' + id);
   this.categoryRef.remove();
  }

  deleteImageInDB(productImage: string){
    console.log(productImage);
    
    // this.categoryRef.doc('policies/' + productImage).delete();
    // this.firestore.doc(productImage).delete();
    this.firestore.doc('v0/b/gmob-d85b9.appspot.com/o/images%2F07b3f6cb-3a0b-4df4-a54a-9621f8167e94.jpeg?alt=media&token=9bb5646a-4f9e-4294-8ff4-c4de16d1fa2d').delete();
}

}
