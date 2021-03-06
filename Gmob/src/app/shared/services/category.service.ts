import { Injectable } from '@angular/core';

import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { ICategory } from '../interfases/category.interface';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { IProduct } from '../interfases/product/product.interface';
import { Category } from '../models/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  categoriesRef: AngularFireList<any>;    // Reference to Student data list, its an Observable
  categoryRef: AngularFireObject<any>;   // Reference to Student object, its an Observable too
  private ulr: string;
  public allCategoryesList: ICategory[] = [];
  itemsCategory: any;


  items: Observable<any[]>;

  constructor(
    private db: AngularFireDatabase,
    private firestore: AngularFireStorage
  ) { }

  // Create Category
  addCategory(category: ICategory) {
    console.log(category);
    console.log(category.productListInCategory);
    this.categoriesRef.push({
      Id: category.categoryId,
      nameUA: category.nameUA,
      nameEN: category.nameEN,
      description: category.description,
      imageUrl: category.imageUrl,
      productListInCategory: null
      // parentCategories: category.parentCategories,
      // categoryIDDB: category.categoryIDDB
    }).then( (data => {
      console.log(data);
      
      // const ref = this.db.database.ref('category-list');

      // ref.once('value')
      //   .then(snapshot => {
      //     console.log(snapshot);
      //     console.log(snapshot.val());
      //     console.log(snapshot.ref);
      //     console.log(snapshot.key);

      //     const keysCategoriess = Object.keys(snapshot.val())
      //     console.log(keysCategoriess);

      //     const categor = Object.values(snapshot.val())
      //     console.log(categor);

      //     for (let i = 0; i < categor.length; i++) {
      //       console.log('Виконується цикл');
      //       console.log(categor[i]);
      //       categor[i]['catecategoryIDDB'] = keysCategoriess[i]
      //     }
  
         
      //   })
    }))
  }

  deleteProductListInCategory(keyObjectFromDB: string, categoryIdlist: string[]) {
    const refAddProd = this.db.database.ref('products' + '/' + keyObjectFromDB);
    console.log(refAddProd);
    
    // refAddProd.remove()
    // .then(dat => {
    //   console.log('ТОВАР ВИДАЛЕНИЙ ПОВНІСТЮ ');
    //   keyObjectFromDB = null;
    // })
    // .catch(err => {
    //   console.log('Сталася помилка при видаленні ключа keyObjectFromDB');
    // })

    console.log(categoryIdlist);
    const categoryIdlistArray = Object.values(categoryIdlist)
    console.log(categoryIdlistArray);
    const ref = this.db.database.ref('category-list');
    console.log(ref);
    let productListInCategory;

    for (let i = 0; i < categoryIdlistArray.length; i++) {
      // this.getGategory(categoryIdlist[i]).snapshotChanges().subscribe(data => {
      // this.getGategory(categoryIdlist[i]).valueChanges().subscribe(data => {
      ref.once('value')
        .then(snapshot => {
          console.log(snapshot);
          console.log(snapshot.val());
          console.log(snapshot.val().toJSON);
          console.log(snapshot.ref);
          // console.log(snapshot.key);
          const categoryId = snapshot.child(categoryIdlist[i]).val().Id;
          console.log(categoryId);
          const nameUA = snapshot.child(categoryIdlist[i]).val().nameUA;
          console.log(nameUA);
          const nameEN = snapshot.child(categoryIdlist[i]).val().nameEN;
          console.log(nameEN);
          const imageUrl = snapshot.child(categoryIdlist[i]).val().imageUrl;
          console.log(imageUrl);
          const description = snapshot.child(categoryIdlist[i]).val().description;
          console.log(description);
          // const keyObjectFromDB1 = snapshot.child(categoryIdlist[i]).val().keyObjectFromDB;
          // console.log(keyObjectFromDB1);
          // const productListInCategory = snapshot.child(categoryIdlist[i]).val().productListInCategory;
          // console.log(productListInCategory);
          // console.log(snapshot.child(categoryIdlist[i]).val().productListInCategory);

          if (snapshot.child(categoryIdlist[i]).val().productListInCategory) {
            productListInCategory = snapshot.child(categoryIdlist[i]).val().productListInCategory as Array<string>
            productListInCategory = Object.values(productListInCategory)
            console.log(productListInCategory);
            // if (update) {
            //   console.log('ID товару ОБНОВЛЕНО');
            //   console.log(typeof productListInCategory);
            //   const ind = productListInCategory.indexOf(keyObjectFromDB);
            //   console.log(ind);
            //   productListInCategory.splice(ind, 1, keyObjectFromDB)
            //   console.log(productListInCategory);
            // }
            // if (!productListInCategory.includes(keyObjectFromDB)) {
            //   console.log('Дана категомія не містить такого товару. Він буде добавлений в список товарів до цієї категорії');
            //   console.log(keyObjectFromDB);
            //   productListInCategory.push(keyObjectFromDB);
            // }

           

            console.log('ID товару буде видалено');
            console.log(typeof productListInCategory);
            const ind = productListInCategory.indexOf(keyObjectFromDB);
            console.log(ind);
            productListInCategory.splice(ind, 1)
            // return productListInCategory;
            console.log(productListInCategory);
            const refOneCategory = this.db.database.ref('category-list' + '/' + categoryIdlist[i]);
            refOneCategory.update(
              { productListInCategory: productListInCategory }
            ).
              then(dat => {
                // console.log(dat);
              })


          }
        })

    }
  
  }

  addProductListInCategory(keyObjectFromDBBB: string, categoryIdlist: string[]) {
    console.log(('Цей РОЗДІЛ має виконуватись тільки тоді коли додається товар!!!!!!!!'));
    const refAddProd = this.db.database.ref('products' + '/' + keyObjectFromDBBB);
    const itemsRef = this.db.list('products');
    
    refAddProd.update(
      { keyObjectFromDB: keyObjectFromDBBB }
    )
      .then(dat => {
        console.log(dat);
       
      })
      .catch(err => {
        console.log(err);
      })
    
  
    // itemsRef.snapshotChanges()
    //   // this.itemsRef.snapshotChanges(['child_added'])
    //   .subscribe(actions => {
    //     actions.forEach(action => {
    //       console.log(action.type);
    //       console.log(action.key);

    //       // keyObjectFromDBTemp = action.key;
    //       // console.log(keyObjectFromDBTemp);

    //       console.log(action.payload.val());
    //       this.itemsCategory = action.payload.val();
    //       // console.log(this.itemsCategory.productListInCategory);

    //       // Додати ключ від бази даних в властивість продукту  keyObjectFromDB: keyObjectFromDB

    //       refAddProd.update(
    //         { keyObjectFromDB: keyObjectFromDBBB }
    //       )
    //         .then(dat => {
    //           console.log(dat);
             
    //         })
    //         .catch(err => {
    //           console.log(err);
    //         })
    //     });
    //   });

    console.log(categoryIdlist);
    const categoryIdlistArray = Object.values(categoryIdlist)
    console.log(categoryIdlistArray);
    const ref = this.db.database.ref('category-list');
    let productListInCategory;

    for (let i = 0; i < categoryIdlistArray.length; i++) {
      // this.getGategory(categoryIdlist[i]).snapshotChanges().subscribe(data => {
      // this.getGategory(categoryIdlist[i]).valueChanges().subscribe(data => {
      ref.once('value')
        .then(snapshot => {
          console.log(snapshot);
          console.log(snapshot.val());
          console.log(snapshot.val().toJSON);
          console.log(snapshot.ref);

          // console.log(snapshot.key);

          const categoryId = snapshot.child(categoryIdlist[i]).val().Id;
          console.log(categoryId);
          const nameUA = snapshot.child(categoryIdlist[i]).val().nameUA;
          console.log(nameUA);
          const nameEN = snapshot.child(categoryIdlist[i]).val().nameEN;
          console.log(nameEN);
          const imageUrl = snapshot.child(categoryIdlist[i]).val().imageUrl;
          console.log(imageUrl);
          const description = snapshot.child(categoryIdlist[i]).val().description;
          console.log(description);
          // const keyObjectFromDB1 = snapshot.child(categoryIdlist[i]).val().keyObjectFromDB;
          // console.log(keyObjectFromDB1);
          // const productListInCategory = snapshot.child(categoryIdlist[i]).val().productListInCategory;
          // console.log(productListInCategory);
          console.log(snapshot.child(categoryIdlist[i]).val().productListInCategory);

          if (snapshot.child(categoryIdlist[i]).val().productListInCategory) {
            productListInCategory = snapshot.child(categoryIdlist[i]).val().productListInCategory as Array<string>
            productListInCategory = Object.values(productListInCategory)
            console.log(productListInCategory);
            if (!productListInCategory.includes(keyObjectFromDBBB)) {
              console.log('Дана категомія не містить такого товару. Він буде добавлений в список товарів до цієї категорії');
              console.log(keyObjectFromDBBB);
              productListInCategory.push(keyObjectFromDBBB);
            }
          } else {
            // tslint:disable-next-line:label-position
            productListInCategory = [keyObjectFromDBBB]
            console.log(productListInCategory);
          }
          const refOneCategory = this.db.database.ref('category-list' + '/' + categoryIdlist[i]);
          refOneCategory.update(
            {
              productListInCategory: productListInCategory
            }
          ).then(dat => {
            console.log(dat);
            // keyObjectFromDBBB = null;
          })
        })
    }
  }

  updProductListInCategory(keyObjectFromDB: string, categoryIdlist: string[]) {
    const refAddProd = this.db.database.ref('products' + '/' + keyObjectFromDB);
    console.log(categoryIdlist);
    const categoryIdlistArray = Object.values(categoryIdlist)
    console.log(categoryIdlistArray);
    const ref = this.db.database.ref('category-list');
    // const cat: ICategory;
    // tslint:disable-next-line:prefer-for-of
    // const keyArr = []
    // tslint:disable-next-line:prefer-for-of
    let productListInCategory;
    for (let i = 0; i < categoryIdlistArray.length; i++) {
      // this.getGategory(categoryIdlist[i]).snapshotChanges().subscribe(data => {
      // this.getGategory(categoryIdlist[i]).valueChanges().subscribe(data => {
      ref.once('value')
        .then(snapshot => {
          console.log(snapshot);
          console.log(snapshot.val());
          console.log(snapshot.val().toJSON);
          console.log(snapshot.ref);

          // console.log(snapshot.key);

          const categoryId = snapshot.child(categoryIdlist[i]).val().Id;
          console.log(categoryId);
          const nameUA = snapshot.child(categoryIdlist[i]).val().nameUA;
          console.log(nameUA);
          const nameEN = snapshot.child(categoryIdlist[i]).val().nameEN;
          console.log(nameEN);
          const imageUrl = snapshot.child(categoryIdlist[i]).val().imageUrl;
          console.log(imageUrl);
          const description = snapshot.child(categoryIdlist[i]).val().description;
          console.log(description);
          // const keyObjectFromDB1 = snapshot.child(categoryIdlist[i]).val().keyObjectFromDB;
          // console.log(keyObjectFromDB1);
          // const productListInCategory = snapshot.child(categoryIdlist[i]).val().productListInCategory;
          // console.log(productListInCategory);
          console.log(snapshot.child(categoryIdlist[i]).val().productListInCategory);

          if (snapshot.child(categoryIdlist[i]).val().productListInCategory) {
            productListInCategory = snapshot.child(categoryIdlist[i]).val().productListInCategory as Array<string>
            productListInCategory = Object.values(productListInCategory)
            console.log(productListInCategory);

            console.log('ID товару ОБНОВЛЕНО');
            console.log(typeof productListInCategory);

            const ind = productListInCategory.indexOf(keyObjectFromDB);
            console.log(ind);
            productListInCategory.splice(ind, 1, keyObjectFromDB)
            console.log(productListInCategory);

            if (!productListInCategory.includes(keyObjectFromDB)) {
              console.log('Дана категомія не містить такого товару. Він буде добавлений в список товарів до цієї категорії');
              console.log(keyObjectFromDB);
              productListInCategory.push(keyObjectFromDB);
            }

            console.log(productListInCategory);
          } else {
            // tslint:disable-next-line:label-position
            productListInCategory = [keyObjectFromDB]
            console.log(productListInCategory);
          }
          const refOneCategory = this.db.database.ref('category-list' + '/' + categoryIdlist[i]);
          refOneCategory.update(
            {
              productListInCategory: productListInCategory
            }
          ).then(dat => {
            console.log(dat);
            keyObjectFromDB = null;
          })
        })
    }
  }




  //Старий метод універсальний
  // updateProductListInCategory(keyObjectFromDB: string, categoryIdlist: string[], deleteProd = false, update = false) {
  //   // let keyObjectFromDBTemp = '';
  //   const refAddProd = this.db.database.ref('products' + '/' + keyObjectFromDB);


  //   if ((deleteProd === false) && (update === false)) {
  //     console.log(('Цей РОЗДІЛ має виконуватись тільки тоді коли додається товар!!!!!!!!'));
  //     const itemsRef = this.db.list('products');
  //     itemsRef.snapshotChanges()
  //       // this.itemsRef.snapshotChanges(['child_added'])
  //       .subscribe(actions => {
  //         actions.forEach(action => {
  //           console.log(action.type);
  //           console.log(action.key);

  //           // keyObjectFromDBTemp = action.key;
  //           // console.log(keyObjectFromDBTemp);

  //           console.log(action.payload.val());
  //           this.itemsCategory = action.payload.val();
  //           // console.log(this.itemsCategory.productListInCategory);

  //           // Додати ключ від бази даних в властивість продукту  keyObjectFromDB: keyObjectFromDB

  //           refAddProd.update(
  //             { keyObjectFromDB: keyObjectFromDB })
  //             .then(dat => {
  //               console.log(dat);
  //             })
  //             .catch(err => {
  //               console.log(err);
  //             })
  //         });
  //       });
  //   }



  //   console.log(categoryIdlist);
  //   const categoryIdlistArray = Object.values(categoryIdlist)
  //   console.log(categoryIdlistArray);

  //   const ref = this.db.database.ref('category-list');
  //   // const cat: ICategory;
  //   // tslint:disable-next-line:prefer-for-of
  //   // const keyArr = []
  //   // tslint:disable-next-line:prefer-for-of
  //   let productListInCategory;

  //   for (let i = 0; i < categoryIdlistArray.length; i++) {
  //     // this.getGategory(categoryIdlist[i]).snapshotChanges().subscribe(data => {
  //     // this.getGategory(categoryIdlist[i]).valueChanges().subscribe(data => {


  //     console.log(deleteProd);
  //     ref.once('value')
  //       .then(snapshot => {
  //         console.log(snapshot);
  //         console.log(snapshot.val());
  //         console.log(snapshot.val().toJSON);
  //         console.log(snapshot.ref);

  //         // console.log(snapshot.key);

  //         const categoryId = snapshot.child(categoryIdlist[i]).val().Id;
  //         console.log(categoryId);
  //         const nameUA = snapshot.child(categoryIdlist[i]).val().nameUA;
  //         console.log(nameUA);
  //         const nameEN = snapshot.child(categoryIdlist[i]).val().nameEN;
  //         console.log(nameEN);
  //         const imageUrl = snapshot.child(categoryIdlist[i]).val().imageUrl;
  //         console.log(imageUrl);
  //         const description = snapshot.child(categoryIdlist[i]).val().description;
  //         console.log(description);

  //         // const keyObjectFromDB1 = snapshot.child(categoryIdlist[i]).val().keyObjectFromDB;
  //         // console.log(keyObjectFromDB1);

  //         // const productListInCategory = snapshot.child(categoryIdlist[i]).val().productListInCategory;
  //         // console.log(productListInCategory);
  //         console.log(snapshot.child(categoryIdlist[i]).val().productListInCategory);

  //         if (snapshot.child(categoryIdlist[i]).val().productListInCategory) {
  //           productListInCategory = snapshot.child(categoryIdlist[i]).val().productListInCategory as Array<string>
  //           productListInCategory = Object.values(productListInCategory)
  //           console.log(productListInCategory);
  //           if (update) {
  //             console.log('ID товару ОБНОВЛЕНО');
  //             console.log(typeof productListInCategory);

  //             const ind = productListInCategory.indexOf(keyObjectFromDB);
  //             console.log(ind);
  //             productListInCategory.splice(ind, 1, keyObjectFromDB)
  //             console.log(productListInCategory);

  //           }
  //           if (!productListInCategory.includes(keyObjectFromDB)) {

  //             console.log('Дана категомія не містить такого товару. Він буде добавлений в список товарів до цієї категорії');
  //             console.log(keyObjectFromDB);
  //             productListInCategory.push(keyObjectFromDB);


  //           }

  //           if (deleteProd) {
  //             console.log(deleteProd);


  //             refAddProd.remove()
  //               .then(dat => {
  //                 console.log('ТОВАР ВИДАЛЕНИЙ ПОВНІСТЮ ');
  //                 console.log(dat);
  //               }).catch(err => {
  //                 console.log('Сталася помилка при видаленні ключа keyObjectFromDB');
  //               })



  //             console.log('ID товару буде видалено');
  //             console.log(typeof productListInCategory);

  //             const ind = productListInCategory.indexOf(keyObjectFromDB);
  //             console.log(ind);
  //             productListInCategory.splice(ind, 1)
  //             // return productListInCategory;

  //           }



  //           console.log(productListInCategory);
  //         } else {
  //           // tslint:disable-next-line:label-position
  //           productListInCategory = [keyObjectFromDB]
  //           console.log(productListInCategory);
  //         }




  //         const refOneCategory = this.db.database.ref('category-list' + '/' + categoryIdlist[i]);
  //         refOneCategory.update(
  //           {
  //             productListInCategory: productListInCategory
  //           }
  //         ).then(dat => {
  //           console.log(dat);
  //         })


  //         // snapshot.forEach(childSnapshot => {
  //         //   const key = childSnapshot.key; // "ada"
  //         //   console.log(key);
  //         //   // Cancel enumeration
  //         //   return true;
  //         // });

  //       })




  //     // this.categoryRef = this.db.object('category-list/' + categoryIdlist[i])
  //     // this.categoryRef.valueChanges().pipe(
  //     //   map(
  //     //     changes => { return changes.map(a => {
  //     //       const data = a.payload.doc.data() as ICategory;

  //     //       console.log(a.payload.doc.id);
  //     //       // data.id = a.payload.doc.id;
  //     //       return data;
  //     //     })
  //     //     })
  //     // )




  //     // data => {

  //     // console.log(data);


  //     // data.forEach(item => {
  //     //   const a = item.payload.toJSON();
  //     //   console.log(a);
  //     //   const idArrProd: string[] = a['productListInCategory'] as Array<string>
  //     //   idArrProd.push(idProduct)



  //     //   // a['productListInCategory'] = item.key;
  //     //   // console.log(a['Id']);
  //     //   // console.log(a, 'aaaaaaaaaaaaaaaaaaaaaa');
  //     //   // this.category.push(a as ICategory);
  //     // }

  //     //   );
  //     // })


  //     // const productListArr = data.productListInCategory as Array<string>
  //     // console.log(productListArr);

  //     // productListArr.push(idProduct)
  //     // const newCat: ICategory = new Category(
  //     //   data.Id,
  //     //   data.nameUA,
  //     //   data.nameEN,
  //     //   data.description,
  //     //   data.imageUrl,
  //     //   productListArr
  //     // )

  //     // console.log(data.productListInCategory);

  //     // this.updateCategory(newCat)



  //     // [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]
  //     // , [Validators.required, Validators.pattern('^[0-9]+$')]
  //     // })
  //   }

  //   // this.productImage = this.categoryForm.get('imageUrl').value;
  //   // this.categoryForm.setValue(data) // Using SetValue() method, It's a ReactiveForm's API to store intial value of reactive form







  //   console.log(this.allCategoryesList);


  //   // categoryIdlist.forEach((oneCategoryId, i) => {
  //   // console.log('Виконується метод updateProductListInCategory');
  //   // const categoriListID = this.db.object('category-list/' + oneCategoryId)
  //   // console.log(categoriListID);

  //   // const categoriList = this.db.object('category-list/' + oneCategoryId).query.

  //   // const categoriList = this.db.object('category-list/' + oneCategoryId).snapshotChanges().subscribe(data => {
  //   //   console.log(data);
  //   //   const cat = data ;
  //   //   const cat = data as ICategory;
  //   //                                               // cat = data;
  //   //                                               // const d: [] = data.productListInCategory;
  //   //   console.log(cat);

  //   //   if (cat.productListInCategory) {
  //   //     console.log(cat.productListInCategory);
  //   //     cat.productListInCategory.push(idProduct)
  //   //                                               //categoriListID.update(productListInCategory: cat.productListInCategory);
  //   //                                               // categoriListID.update({
  //   //                                               //   productListInCategory: cat.productListInCategory
  //   //                                               // });
  //   //     return null;
  //   //     console.log('productListInCategory - ОБНОВИВСЯ')
  //   //   } else {
  //   //     console.log('Список ІД продуктів в цій категорії є пустий!');
  //   //     const categor = this.db.object('category-list/' + oneCategoryId);
  //   //     categoriListID.update({
  //   //                                               // Id: 'dl',
  //   //                                               // nameUA: 'category.nameUA',
  //   //                                               // nameEN: ' category.nameEN',
  //   //                                               // description: 'category.description',
  //   //                                               // imageUrl: ['category.imageUrl'],
  //   //       productListInCategory: cat.productListInCategory
  //   //     });
  //   //     return null;
  //   //   }
  //   // });
  //   // })
  // }


  //     // console.log(this.categoriList.toJson());

  //     // if (!this.getGategory(oneCategoryId)) {
  //     //   console.log("Нічого не виконується");


  //     // } else {
  //     //   console.log(oneCategoryId);

  //     //   const d: string[] = [];

  //     //   // categoriList = this.db.object('category-list/' + oneCategoryId);
  //     //   console.log(this.categoryRef);

  //     //   // this.getGategory(oneCategoryId).snapshotChanges().subscribe(data => {
  //     //   //   console.log(data);
  //     //   //   // d = data.productListInCategory;

  //     //   // })

  //     //   // const finalArr = ( d, idProduct);

  //     //   categoriList.update({
  //     //     // productLictInCategory: finalArr
  //     //   });

  //     //   // this.getGategory(oneCategoryId).snapshotChanges().subscribe(data => {
  //     //   //   console.log(data);
  //     //   //   // const d:[] = data.productListInCategory;
  //     //   //   // const finalArr = ( oneCategoryId, idProduct);
  //     //   //   // categoriList.update({
  //     //   //   //   productLictInCategory: finalArr
  //     //   //   // });

  //     //   //   console.log("productLictInCategory - ОБНОВИВСЯ");

  //     // })
  //     // }


  //   })

  //   // return this.categoryRef;
  // }

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
      description: category.description,
      productListInCategory: category.productListInCategory,
      // parentCategories: category.parentCategories,
      // categoryIDDB: category.categoryIDDB
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

