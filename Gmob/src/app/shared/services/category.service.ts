import { Injectable } from '@angular/core';

import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { ICategory } from '../interfases/category.interface';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  categoriesRef: AngularFireList<any>;    // Reference to Student data list, its an Observable
  categoryRef: AngularFireObject<any>;   // Reference to Student object, its an Observable too

  private ulr: string;

  constructor(
    private db: AngularFireDatabase,
    private firestore: AngularFireStorage
  ) { }

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
    console.log(this.categoryRef);
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

  deleteImageInDB(categoryFile) {
    console.log(categoryFile);
    // this._storage.storage.refFromURL(post.coverPic).delete()
    return this.firestore.storage.refFromURL(categoryFile).delete()
      .then(() => {
        console.log('Катринка успішно видалена');
        return categoryFile;
      })
      .catch((error) => {
        console.log('ПРОБЛЕМА ' + error.code);
        console.log('ПРОБЛЕМА ' + error.message);
        return error;
      });



    // const storage = this.firestore.storage;
    // console.log(storage);
    // const storageRef = storage.ref();
    // console.log(storageRef);
    // // const desertRef = storageRef.child('images/desert.jpg');
    // const desertRef = storageRef.child(categoryFile);
    // console.log(desertRef);

    // // Delete the file
    // desertRef.delete()
    //           .then( () => {
    //             console.log('Катринка успішно видалена');
    //            })
    //            .catch((error) => {
    //                 console.log('ПРОБЛЕМА ' + error.code);
    //                 console.log('ПРОБЛЕМА ' + error.message);
    //               });







    // const storageRef = this.firestore.storage.ref();
    // console.log(storageRef);

    // // const mountainsRef = storageRef.child('mountains.jpg');
    // const desertRef = storageRef.child(categoryFile);
    // console.log(desertRef);

    // desertRef.delete().then(() => {
    //   console.log('Катринка успішно видалена');
    // })
    //   .catch((error) => {
    //     console.log('ПРОБЛЕМА ' + error.code);
    //     console.log('ПРОБЛЕМА ' + error.message);
    //   });




    // console.log(categoryFile.payload.doc.id);

    // this.firestore.doc('images/' + categoryPath).delete();
    // this.firestore.doc(productImage).delete();
    // this.firestore.doc(categoryPath).delete();

    // const storage = this.firestore.storage()



    // this.firestore.collection('images/').doc(categoryFile).delete()
    //   .then(() => {
    //     console.log('Document successfully deleted!');
    //   })
    //   .catch((error) => {
    //     console.error('Error removing document: ', error);
    //   });



    // return this.firestore
    //   .collection('images')
    //   .doc(categoryFile.payload.id)
    //   .delete()
    //   .then(succcess => {
    //     console.log("Document successfully deleted!");
    //   })
    //   .catch(error => {
    //     console.error("Error removing document: ", error);
    //   });

    // // Create a reference to the file to delete
    // var desertRef = storageRef.child('images/desert.jpg');

    // // Delete the file
    // desertRef.delete().then(function () {
    //   // File deleted successfully
    // }).catch(function (error) {
    //   // Uh-oh, an error occurred!
    // });

  }

}
