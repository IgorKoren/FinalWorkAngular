import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FormArray } from '@angular/forms';
import { FormControl, FormGroup } from '@angular/forms';
import { ProductDetailsComponent } from 'src/app/pages/shop/product-details/product-details.component';
import { Observable } from 'rxjs';
import { CategoryService } from 'src/app/shared/services/category.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { ProductService } from 'src/app/shared/services/product.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ICategory } from 'src/app/shared/interfases/category.interface';
import { requireCheckboxesToBeCheckedValidator } from 'src/app/shared/validators/my.valigators';
import { Product } from 'src/app/shared/models/product.model';
import { IProduct } from 'src/app/shared/interfases/product/product.interface';
import { AngularFireDatabase } from '@angular/fire/database';


@Component({
  selector: 'app-admin-add-product',
  templateUrl: './admin-add-product.component.html',
  styleUrls: ['./admin-add-product.component.scss']
})

export class AdminAddProductComponent implements OnInit {
  addproductForm: FormGroup;
  isSubmitted: boolean;
  jsonForm: string;
  imageUrlListTemp = [];
  uploadProgress: Observable<number>;
  replaceImage = false;
  itemNumber = false;
  unamePattern = '^[0-9]{1,6}$';
  // category: ICategory[];
  categoryIdlistTemp = [];
  allCategoryesList: ICategory[] = [];

  //   {
  //   categoryId: '11111',
  //   nameUA: 'Категорія № 1',
  //   nameEN: 'string1111111111',
  //   imageUrl: 'string',
  //   description: 'string',
  //   parentCategories: 'parentCategoriesstring'
  // },
  // {
  //   categoryId: '22222',
  //   nameUA: 'Категорія № 2',
  //   nameEN: '33333333333',
  //   imageUrl: '3333333333',
  //   description: '3333333',
  //   parentCategories: '333333333'
  // }
  // listWithCategoriesID = ['5555555'];
  // product: IProduct = new Product();

  constructor(
    private formBuilder: FormBuilder,
    private afStorage: AngularFireStorage,
    public сategoryService: CategoryService,
    private productService: ProductService,
    private db: AngularFireDatabase

    // private router: Router, // Inject student CRUD services in constructor.
    // private location: Location,         // Location service to go back to previous component
    // private actRoute: ActivatedRoute
  ) { };

  ngOnInit(): void {
    this.addproductForm = this.formBuilder.group({
      idProduct: ['2222222', [Validators.required, Validators.maxLength(100)]],
      title: ['111111', [Validators.required, Validators.maxLength(500)]],
      price: ['2000', [Validators.required, Validators.maxLength(10)]],
      description: ['dfsah hsa fj', [Validators.required, Validators.maxLength(5000)]],
      imageUrlList: [this.imageUrlListTemp],
      status: ['true', [Validators.required]],
      categoryIdlist: this.formBuilder.array([], Validators.required),
      count: [0, [Validators.required]],
      seo: this.formBuilder.group({
        titleSeo: [''],
        metaDescription: ['sddddddddddd'],
        keyWords: ['eeeeeeeeeeeee']
      })
    });

    // //Взяти список категорій з бази даних
    // // this.dataState();
    // const s = this.сategoryService.getCategoryList();
    // s.snapshotChanges().subscribe(data => { // Using snapshotChanges() method to retrieve list of data along with metadata($key)
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

       
      })






  }

  

  get title() {
    return this.addproductForm.get('title');
  }
  get idProduct() {
    return this.addproductForm.get('idProduct');
  }
  get price() {
    return this.addproductForm.get('price');
  }
  get description() {
    return this.addproductForm.get('description');
  }
  get imageUrlList() {
    return this.addproductForm.get('imageUrlList');
  }
  get status() {
    return this.addproductForm.get('status');
  }
  get count() {
    return this.addproductForm.get('count');
  }
  get categoryIdlist() {
    return this.addproductForm.get('categoryIdlist') as FormArray;
  }

  get seo() {
    return this.addproductForm.get('seo');
  }
  get titleSeo() {
    return this.addproductForm.get('titleSeo');
  }
  get metaDescription() {
    return this.addproductForm.get('metaDescription');
  }
  get keyWords() {
    return this.addproductForm.get('keyWords');
  }




  onSubmit() {
    this.isSubmitted = true;
    // if (!this.addproductForm.valid) {
    //   return false;
    // }
    const newProduct: IProduct = new Product(
      this.addproductForm.get('idProduct').value,
      this.addproductForm.get('title').value,
      this.addproductForm.get('price').value,
      this.addproductForm.get('description').value,
      this.addproductForm.get('imageUrlList').value,
      this.addproductForm.get('status').value,
      this.addproductForm.get('categoryIdlist').value,
      this.addproductForm.get('count').value,
      true,
      this.addproductForm.get('seo').value,
      false,
      0,
      [],
      {
        dateYear: new Date().getFullYear(),
        dateMonth: new Date().getMonth(),
        dateDay: new Date().getUTCDate(),
        dateHours: new Date().getHours(),
        dateMinutes: new Date().getMinutes()
      },
      'keyObjectFromDB'
    );

    this.productService.addProduct(newProduct);

    // this.productService.addProduct(newProduct).then(() => {
    //   console.log('треба очистити форму');
    // });

  }



  onCheckCategory(e, categoryId: string, ind: number) {
    // this.getSelectedCategory()
    const categoryIdlist: FormArray = this.addproductForm.get('categoryIdlist') as FormArray;
    if (e.target.checked) {
      categoryIdlist.push(new FormControl(e.target.value));

    } else {
      let i = 0;
      categoryIdlist.controls.forEach((item: FormControl) => {
        if (item.value == e.target.value) {
          categoryIdlist.removeAt(i);
          
          return;
        }
        i++;
      });
    }


    // console.log(event.target.checked);
    // console.log(this.addproductForm.get('categoryIdlist').value);
    // if(event.target.checked){
    //   this.categoryIdlistTemp.splice(ind, 1, categoryId)
    //   console.log(this.categoryIdlistTemp);
    //   this.addproductForm.get('categoryIdlist').patchValue(this.categoryIdlistTemp)
    //   console.log(this.addproductForm.get('categoryIdlist').value);
    // }else {
    //   this.categoryIdlistTemp.splice(ind, 1)
    //   console.log(this.categoryIdlistTemp);

    // }
    // this.addproductForm.get('categoryIdlist').setValue(this.imageUrlListTemp)

  }







  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.imageUrlListTemp, event.previousIndex, event.currentIndex);
  }

  uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      let r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  uploadFile(event, itemNumber: boolean = false, ind = 0) {
    console.log('НОМЕР ІЛЕМЕНТА - itemNumber ', itemNumber);

    this.itemNumber = false;
    console.log('Початок завантаження нової картинки');

    const file = event.target.files[0];

    console.log(file);
    console.log(file.name);

    let filePath = `${this.uuid()}.${file.type.split('/')[1]}`;
    // this.categoryFile = `images/` + filePath;

    // console.log(this.categoryFile);

    filePath = `product/images` + filePath;
    // this.categoryPath = file.name;

    console.log(filePath);

    const task = this.afStorage.upload(filePath, file)


    console.log(task);

    this.uploadProgress = task.percentageChanges();

    console.log(this.uploadProgress);

    task.then(e => {
      this.afStorage.ref(`product/${e.metadata.name}`).getDownloadURL().subscribe(url => {
        this.imageUrlListTemp.push(url);

        console.log(this.imageUrlListTemp);

        // this.categoryForm.get('imageUrl').setValue(this.productImage);
      })

    });








    // this.categoryForm.get('imageUrl').setValue(this.productImage);




    //  console.log('Завантаження нової картинки на ЗАМІНУ');

    //   console.log(this.imageUrlListTemp[ind]);

    //   this.removeImage(this.imageUrlListTemp[ind], ind)

    //   console.log('Початок завантаження нової картинки');

    //  const file = event.target.files[0];

    //   console.log(file);
    //   console.log(file.name);

    //   let filePath = `${this.uuid()}.${file.type.split('/')[1]}`;
    //   // this.categoryFile = `images/` + filePath;

    //   // console.log(this.categoryFile);

    //   filePath = `product/images` + filePath;
    //   // this.categoryPath = file.name;

    //   console.log(filePath);

    //   const task = this.afStorage.upload(filePath, file)


    //   console.log(task);

    //   this.uploadProgress = task.percentageChanges();

    //   console.log(this.uploadProgress);

    //   task.then(e => {
    //     this.afStorage.ref(`product/${e.metadata.name}`).getDownloadURL().subscribe(url => {



    //       this.imageUrlListTemp.splice(ind, 1, url);
    //       this.removeImage(url, ind - 1 );

    //       console.log(this.imageUrlListTemp);
    //       this.itemNumber = false;

    //       // this.categoryForm.get('imageUrl').setValue(this.productImage);
    //     })

    //   });




  }

  removeImage(item: string, i: number): any {
    console.log('Видалити картинку ');
    this.productService.deleteImageInDB(item)
      .then((itemFotDelete) => {
        console.log('Катринка успішно видалена -111111');
        console.log(itemFotDelete);
        this.imageUrlListTemp.splice(i, 1);
        // this.productImage = '';
        this.uploadProgress = null;

        // this.categoryForm.get('imageUrl').patchValue('');
      })
      .catch((error) => {
        console.log('ПРОБЛЕМА 1 ' + error.code);
        console.log('ПРОБЛЕМА 2 ' + error.message);
        console.log('ПРОБЛЕМА 2 ' + error.status);

      });

  }

  changeImage(event, item: string, i: number) {
    this.itemNumber = true;
    console.log('Заміна картинки картинку ');
    // this.uploadFile(event, true, i);

  }



  // Getter method to access form control 
  // get status(){
  //   return this.addproductForm.get('status');
  // }


  // addPhone(){
  //   // (<FormArray>this.myForm.controls["phones"]).push(new FormControl("+7", Validators.required));
  // }
  resetForm() {
    console.log("Форма очищена");
    this.addproductForm.reset();
  }







  // reset() {
  //   this.addproductForm.reset({
  //     // married: false
  //   });
  // }

  // setDefaultValues() {
  //   // this.addproductForm.patchValue({uname: 'Krishna', gender:'male', married:true});
  // }


  // "userPhone": new FormControl("", Validators.pattern("[0-9]{10}")) 





}
