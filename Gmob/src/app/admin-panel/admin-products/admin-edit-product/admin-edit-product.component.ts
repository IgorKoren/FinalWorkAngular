import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { Observable } from 'rxjs';
import { ICategory } from 'src/app/shared/interfases/category.interface';
import { IProduct } from 'src/app/shared/interfases/product/product.interface';
import { AngularFireStorage } from '@angular/fire/storage';
import { CategoryService } from 'src/app/shared/services/category.service';
import { ProductService } from 'src/app/shared/services/product.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Location } from '@angular/common';
import { Product } from 'src/app/shared/models/product.model';


@Component({
  selector: 'app-admin-edit-product',
  templateUrl: './admin-edit-product.component.html',
  styleUrls: ['./admin-edit-product.component.scss']
})
export class AdminEditProductComponent implements OnInit {
  addproductForm: FormGroup;
  isSubmitted: boolean;
  jsonForm: string;
  imageUrlListTemp: string[] = [];
  uploadProgress: Observable<number>;
  replaceImage = false;
  itemNumber = false;
  unamePattern = '^[0-9]{1,6}$';
  // category: ICategory[];
  categoryIdlistTemp = [];
  allCategoryesList: ICategory[] = [];
  activeProduct: IProduct;
  populations = []

  constructor(
    private formBuilder: FormBuilder,
    private afStorage: AngularFireStorage,
    public сategoryService: CategoryService,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    if (!this.productService.clone) {
      console.log('Звичайний режим редагування товару');

      this.activeProduct = this.productService.productForEdit;
      if (this.activeProduct.imageUrlList) {
        this.imageUrlListTemp = Object.values(this.activeProduct.imageUrlList);
      } else {
        this.imageUrlListTemp = []
      }
      console.log(this.imageUrlListTemp);

      if (this.activeProduct.categoryIdlist) {
        this.categoryIdlistTemp = Object.values(this.activeProduct.categoryIdlist)
      } else {
        this.categoryIdlistTemp = []
      }

      console.log(this.categoryIdlistTemp);
      console.log(this.activeProduct.status);

      this.addproductForm = this.formBuilder.group({
        idProduct: [this.activeProduct.idProduct, [Validators.required, Validators.maxLength(100)]],
        title: [this.activeProduct.title, [Validators.required, Validators.maxLength(500)]],
        price: [this.activeProduct.price, [Validators.required, Validators.maxLength(10)]],
        description: [this.activeProduct.description, [Validators.required, Validators.maxLength(5000)]],
        imageUrlList: [this.imageUrlListTemp],
        status: [this.activeProduct.status, [Validators.required]],
        categoryIdlist: this.formBuilder.array(this.categoryIdlistTemp, Validators.required),
        // categoryIdlist: this.formBuilder.array(this.activeProduct.categoryIdlist, Validators.required),
        count: [this.activeProduct.count, [Validators.required]],
        notLimited: [this.activeProduct.notLimited, [Validators.required]],
        seo: this.formBuilder.group({
          titleSeo: [this.activeProduct.seo.titleSeo],
          metaDescription: [this.activeProduct.seo.metaDescription],
          keyWords: [this.activeProduct.seo.keyWords]
        }),
        showTheProductOnTheStoreHomePage: [this.activeProduct.showTheProductOnTheStoreHomePage],
        countInBascket: [this.activeProduct.countInBascket],
        relatedProductsId: [this.activeProduct.relatedProductsId],
        dateCreation: this.formBuilder.group({
          dateYear: [this.activeProduct.dateCreation.dateYear],
          dateMonth: [this.activeProduct.dateCreation.dateMonth],
          dateDay: [this.activeProduct.dateCreation.dateDay],
          dateHours: [this.activeProduct.dateCreation.dateHours],
          dateMinutes: [this.activeProduct.dateCreation.dateMinutes]
        }),
        keyObjectFromDB: [this.activeProduct.keyObjectFromDB]
      });

      this.productService.productForEdit = null;

    } else {
      console.log('Режим редагування склонованого товару');

      this.activeProduct = this.productService.productForEditClone;

      if (this.activeProduct.imageUrlList) {
        this.imageUrlListTemp = Object.values(this.activeProduct.imageUrlList);
      } else {
        this.imageUrlListTemp = []
      }
      console.log(this.imageUrlListTemp);

      if (this.activeProduct.categoryIdlist) {
        this.categoryIdlistTemp = Object.values(this.activeProduct.categoryIdlist)
      } else {
        this.categoryIdlistTemp = []
      }
      console.log(this.categoryIdlistTemp);
      console.log(this.activeProduct.status);

      this.addproductForm = this.formBuilder.group({
        idProduct: [this.activeProduct.idProduct, [Validators.required, Validators.maxLength(100)]],
        title: [this.activeProduct.title, [Validators.required, Validators.maxLength(500)]],
        price: [this.activeProduct.price, [Validators.required, Validators.maxLength(10)]],
        description: [this.activeProduct.description, [Validators.required, Validators.maxLength(5000)]],
        imageUrlList: [this.imageUrlListTemp],
        status: [this.activeProduct.status, [Validators.required]],
        categoryIdlist: this.formBuilder.array(this.categoryIdlistTemp, Validators.required),
        // categoryIdlist: this.formBuilder.array(this.activeProduct.categoryIdlist, Validators.required),
        count: [this.activeProduct.count, [Validators.required]],
        notLimited: [this.activeProduct.notLimited, [Validators.required]],
        seo: this.formBuilder.group({
          titleSeo: [this.activeProduct.seo.titleSeo],
          metaDescription: [this.activeProduct.seo.metaDescription],
          keyWords: [this.activeProduct.seo.keyWords]
        }),
        showTheProductOnTheStoreHomePage: [this.activeProduct.showTheProductOnTheStoreHomePage],
        countInBascket: [1],
        relatedProductsId: [this.activeProduct.relatedProductsId],
        dateCreation: this.formBuilder.group({
          dateYear: [new Date().getFullYear()],
          dateMonth: [new Date().getMonth()],
          dateDay: [new Date().getUTCDate()],
          dateHours: [new Date().getHours()],
          dateMinutes: [new Date().getMinutes()]
        }),
        keyObjectFromDB: ['1']
      });
      this.productService.productForEditClone = null;

    }

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

    if (!this.productService.clone) {
      this.productService.updateProduct(this.addproductForm.value);
    } else {
      this.productService.addProduct(this.addproductForm.value)
      this.productService.clone = false;
    }


    // this.productService.addProduct(newProduct).then(() => {
    //   console.log('треба очистити форму');
    // });

  }


  onCheckCategory(e, categoryId: string, ind: number) {
    const categoryIdlist: FormArray = this.addproductForm.get('categoryIdlist') as FormArray;
    const catStrArr = Object.values(this.categoryIdlistTemp) ;
    if (e.target.checked) {
      categoryIdlist.push(new FormControl(e.target.value));
      this.сategoryService.updateProductListInCategory(this.activeProduct.idProduct, [categoryId], false, true)
    } else {
      let i = 0;
      categoryIdlist.controls.forEach((item: FormControl) => {
        if (item.value == e.target.value) {
          categoryIdlist.removeAt(i);
          this.сategoryService.updateProductListInCategory(this.activeProduct.idProduct, [categoryId], true, false);
        return;
        }
        i++;
      });
    }
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

  resetForm() {
    console.log("Форма очищена");
    this.addproductForm.reset();
  }




}
