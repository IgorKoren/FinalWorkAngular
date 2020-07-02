import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CategoryService } from 'src/app/shared/services/category.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {
  public categoryForm: FormGroup;  // Define FormGroup to student's form
  public isEdit = false;
  public productListInCategoryPlace = ['s']

  constructor(
    public сategoryService: CategoryService,  // CRUD API services
    public fb: FormBuilder       // Form Builder service for Reactive forms
    // public toastr: ToastrService  // Toastr service for alert message
  ) { }

  ngOnInit(): void {
    this.сategoryService.getCategoryList();  
    this.catForm();
  }
  // Reactive category form
  catForm() {
    this.categoryForm = this.fb.group({
      categoryId: ['11'],
      nameUA: ['111'],
      nameEN: ['444'],
      imageUrl: ['555'],
      description: ['fgnfgn'],
      productListInCategory: [this.productListInCategoryPlace]
      // [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]
      // , [Validators.required, Validators.pattern('^[0-9]+$')]
    })
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
  get productListInCategory() {
    return this.categoryForm.get('productListInCategory');
  }
  // Reset student form's values
  resetForm() {
    this.categoryForm.reset();
  }
  submitCategoryData() {
    this.isEdit = !this.isEdit;

    console.log(this.categoryForm.value);
    this.сategoryService.addCategory(this.categoryForm.value); 
    // this.toastr.success(this.studentForm.controls['firstName'].value + ' successfully added!');
    this.resetForm();  // Reset form when clicked on reset button
  };


  //




}
