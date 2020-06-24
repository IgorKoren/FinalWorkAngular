import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/shared/services/category.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss']
})
export class EditCategoryComponent implements OnInit {
  
  editForm: FormGroup;  // Define FormGroup to student's edit form

  constructor(
    private сategoryService: CategoryService,       // Inject CRUD API in constructor
    private fb: FormBuilder,            // Inject Form Builder service for Reactive forms
    private location: Location,         // Location service to go back to previous component
    private actRoute: ActivatedRoute,   // Activated route to get the current component's inforamation
    private router: Router,             // Router service to navigate to specific component
    // private toastr: ToastrService       // Toastr service for alert message
  ) { }

  ngOnInit(): void {
    console.log('111111111111111');
    
    this.updateCategoryData();   // Call updateStudentData() as soon as the component is ready 
    const id = this.actRoute.snapshot.paramMap.get('id');  // Getting current component's id or information using ActivatedRoute service
    this.сategoryService.getGategory(id).valueChanges().subscribe(data => {
      console.log(data);
      this.editForm.setValue(data) // Using SetValue() method, It's a ReactiveForm's API to store intial value of reactive form 
    })
  }
  // Accessing form control using getters
  get categoryId() {
    return this.editForm.get('categoryId');
  }

  get nameUA() {
    return this.editForm.get('nameUA');
  }

  get nameEN() {
    return this.editForm.get('nameEN');
  }
  get imageUrl() {
    return this.editForm.get('imageUrl');
  }


  get description() {
    return this.editForm.get('description');
  }

  // Contains Reactive Form logic
  updateCategoryData() {
    this.editForm = this.fb.group({
      categoryId: [''],
      nameUA: [''],
      nameEN: [''],
      imageUrl: [''],
      description: ['']
    })
  }

  // Go back to previous component
  goBack() {
    this.location.back();
  }


  // Below methods fire when somebody click on submit button
  updateForm(){
    this.сategoryService.updateCategory(this.editForm.value);
    // this.toastr.success(this.editForm.controls['firstName'].value + ' updated successfully');
    this.router.navigate(['category-list']);
  }
  resetForm() {
    this.editForm.reset();
  }


}
