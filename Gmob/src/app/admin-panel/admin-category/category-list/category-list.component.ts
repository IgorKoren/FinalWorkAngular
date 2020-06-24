import { Component, OnInit } from '@angular/core';
import { ICategory } from 'src/app/shared/interfases/category.interface';
import { CategoryService } from 'src/app/shared/services/category.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Location } from '@angular/common';

// import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
// import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/storage';
// import { Observable } from 'rxjs';
// import { map } from 'rxjs/operators';

import { AngularFireStorage } from '@angular/fire/storage';
import 'firebase/storage';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {
  
  // FireStorage
  isLoadingImage = false;
  uploadProgress: Observable<number>;
  productImage: string;

  public dataCategory: any;
  public categoryForm: FormGroup;  // Define FormGroup to student's form
  public isEdit = false;
  p = 1;                      // Settup up pagination variable
  category: ICategory[];                 // Save students data in Student's array.
  hideWhenNoStudent = false; // Hide students data table when no student.
  noData = false;            // Showing No Student Message, when no student in database.
  preLoader = true;          // Showing Preloader to show user data is coming for you from thre server(A tiny UX Shit)

  constructor(

    

    private afStorage: AngularFireStorage,
    public fb: FormBuilder,
    public сategoryService: CategoryService,
    private router: Router, // Inject student CRUD services in constructor.
    private location: Location,         // Location service to go back to previous component
    private actRoute: ActivatedRoute
    // public toastr: ToastrService // Toastr service for alert message
  ) { }

  ngOnInit() {
    this.dataState();
    const s = this.сategoryService.getCategoryList();
    s.snapshotChanges().subscribe(data => { // Using snapshotChanges() method to retrieve list of data along with metadata($key)
      this.category = [];
      console.log(data);

      data.forEach(item => {
        const a = item.payload.toJSON();
        console.log(a);

        a['id'] = item.key;
        // console.log(a['Id']);
        // console.log(a, 'aaaaaaaaaaaaaaaaaaaaaa');
        this.category.push(a as ICategory);
      });
    });

    // Для секції додавання категорії
    this.сategoryService.getCategoryList();
    this.catForm();

  }
  removeImage(productImage: string): void {
    console.log('Видалити картинку ' );
    this.сategoryService.deleteImageInDB(productImage);
  }


  uploadFile(event) {
    console.log('sjdnjsjkdddddddddddddddddddddddddddddddddddddddd');

    const file = event.target.files[0];
    console.log(file);
    const filePath = `images/${this.uuid()}.${file.type.split('/')[1]}`;
    console.log(filePath);
    const task = this.afStorage.upload(filePath, file);
    console.log(task);
    this.uploadProgress = task.percentageChanges();
    console.log(this.uploadProgress);
    task.then(e => {
      this.afStorage.ref(`images/${e.metadata.name}`).getDownloadURL().subscribe(url => {
        this.productImage = url;
        console.log( this.productImage);
        this.categoryForm.get('imageUrl').setValue(this.productImage);
        // this.uploadProgress = null;
        // window.alert(`Картинка  - ${this.productImage}  завантажена` )
      });
    });
  }
  uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      let r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

 

  editCategoryFun(oneCatehory: string): void {
    this.isEdit = true;
    // Для секції Редагування категорії
    this.updateCategoryData();
    this.сategoryService.getGategory(oneCatehory).valueChanges().subscribe(data => {
      console.log(data, '55555555555555');
      this.categoryForm = this.fb.group({
        categoryId: [data.Id],
        nameUA: [data.nameUA],
        nameEN: [data.nameEN],
        description: [data.description],
        imageUrl: [data.imageUrl]
        // [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]
        // , [Validators.required, Validators.pattern('^[0-9]+$')]
      });
      this.productImage = this.categoryForm.get('imageUrl').value;
      // this.categoryForm.setValue(data) // Using SetValue() method, It's a ReactiveForm's API to store intial value of reactive form


    });
  }


  // Reactive category form
  catForm() {
    this.categoryForm = this.fb.group({
      categoryId: [''],
      nameUA: [''],
      nameEN: [''],
      description: [''],
      imageUrl: ['']

      // [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]
      // , [Validators.required, Validators.pattern('^[0-9]+$')]
    });

  }



  // Accessing form control using getters
  get categoryId() {
    return this.categoryForm.get('categoryId');
  }
  get nameUA() {
    return this.categoryForm.get('nameUA');
  }
  get nameEN() {
    return this.categoryForm.get('nameEN');
  }
  get description() {
    return this.categoryForm.get('description');
  }
  get imageUrl() {
    return this.categoryForm.get('imageUrl');
  }

  // Contains Reactive Form logic
  updateCategoryData() {
    this.categoryForm = this.fb.group({
      categoryId: [''],
      nameUA: [''],
      nameEN: [''],
      imageUrl: [''],
      description: ['']
    });
  }

  // Go back to previous component
  goBack() {
    this.location.back();
  }

  // Below methods fire when somebody click on submit button
  updateForm() {
    this.сategoryService.updateCategory(this.categoryForm.value);

    // this.toastr.success(this.editForm.controls['firstName'].value + ' updated successfully');
    // this.router.navigate(['category-list']);
  }


 
  resetForm() {
    this.categoryForm.reset();
    this.productImage ='';
    this.isEdit = false;
    this.uploadProgress = null;
  }
  submitCategoryData() {
    if (!this.isEdit) {
     
      this.isEdit = false;
      console.log(this.categoryForm.value);
      this.сategoryService.addCategory(this.categoryForm.value);
      // this.toastr.success(this.studentForm.controls['firstName'].value + ' successfully added!');
      this.productImage ='';
    } else {
      console.log(this.categoryForm.value, '444444');
      this.updateForm();
      console.log('Має очиститися форма');
      this.resetForm();
    }

  }



  dataState() {
    this.сategoryService.getCategoryList().valueChanges().subscribe(data => {
      this.preLoader = false;
      if (data.length <= 0) {
        this.hideWhenNoStudent = false;
        this.noData = true;
      } else {
        this.hideWhenNoStudent = true;
        this.noData = false;
        this.resetForm();
        
      }
    });
  }

  // Method to delete student object
  deleteCategory(category) {
    console.log(category);
    // this.сategoryService.deleteCategory(category.id);
    if (window.confirm('Видалити цю категорію?')) { // Asking from user before Deleting student data.
      this.сategoryService.deleteCategory(category.id); // Using Delete student API to delete student.
      // this.toastr.success(student.firstName + ' successfully deleted!');
    }
  }

  navToEditPage(id: string) {
    this.router.navigate(['admin-panel/category/editCategory', id]);
  }



}
