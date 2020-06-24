import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { ShopComponent } from './pages/shop/shop.component';
import { HowDoesItWorkComponent } from './pages/how-does-it-work/how-does-it-work.component';
import { BasketComponent } from './pages/basket/basket.component';
import { PaymentAndDeliveryComponent } from './pages/payment-and-delivery/payment-and-delivery.component';
import { InstructionsComponent } from './pages/instructions/instructions.component';
import { ContactsComponent } from './pages/contacts/contacts.component';
import { SingInComponent } from './sing-in/sing-in.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { AdminCategoryComponent } from './admin-panel/admin-category/admin-category.component';
import { AdminProductsComponent } from './admin-panel/admin-products/admin-products.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AdminOrdersComponent } from './admin-panel/admin-orders/admin-orders.component';
import { AdminUsersComponent } from './admin-panel/admin-users/admin-users.component';
import { RegisterNewUserComponent } from './sing-in/register-new-user/register-new-user.component';
import { PasswordRecoveryComponent } from './sing-in/password-recovery/password-recovery.component';
import { AdminEditProductComponent } from './admin-panel/admin-products/admin-edit-product/admin-edit-product.component';
import { AdminAddProductComponent } from './admin-panel/admin-products/admin-add-product/admin-add-product.component';
import { AddCategoryComponent } from './admin-panel/admin-category/add-category/add-category.component';
import { EditCategoryComponent } from './admin-panel/admin-category/edit-category/edit-category.component';




const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: MainPageComponent },
  { path: 'shop', component: ShopComponent },
  // { path: 'menu/:category', component: MenuComponent },
  // { path: 'pizza', component: PizzaComponent },
  // { path: 'salad', component: SaladComponent },
  // { path: 'drinks', component: DrinksComponent },
  // { path: 'menu/:category/:id', component: ProductDetailsComponent },
  { path: 'how-does-it-work', component: HowDoesItWorkComponent },
  { path: 'payment-and-delivery', component: PaymentAndDeliveryComponent },
  { path: 'instructions', component: InstructionsComponent },
  { path: 'contacts', component: ContactsComponent },
  { path: 'basket', component: BasketComponent },
  { path: 'login', component: SingInComponent },
  { path: 'registration', component: RegisterNewUserComponent },
  { path: 'password-recovery', component: PasswordRecoveryComponent },
  {
    path: 'admin-panel', component: AdminPanelComponent,
    //  canActivate: [AuthGuard],
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'products' },
      { path: 'category', component: AdminCategoryComponent, children:
      [
        { path: 'addCategory', component: AddCategoryComponent },
        { path: 'editCategory', component: EditCategoryComponent },
        { path: 'editCategory/:id', component: EditCategoryComponent }
      ] },
      { path: 'products', component: AdminProductsComponent, children: [
        { path: 'edit-product', component: AdminEditProductComponent },
        { path: 'add-produc', component: AdminAddProductComponent }
      ] },
      { path: 'orders', component: AdminOrdersComponent },
      { path: 'users', component: AdminUsersComponent }
    ]
  },
  {
    path: '**',
    // redirectTo: 'home'
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
