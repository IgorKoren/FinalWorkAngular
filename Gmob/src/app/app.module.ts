import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AngularFireModule } from "@angular/fire";
import { AngularFireStorageModule } from "@angular/fire/storage";
import { AngularFireDatabaseModule } from "@angular/fire/database";
import { environment } from '../environments/environment'

import { NgxTrimDirectiveModule } from 'ngx-trim-directive';

import {NgbPaginationModule, NgbAlertModule} from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { ShopComponent } from './pages/shop/shop.component';
import { HowDoesItWorkComponent } from './pages/how-does-it-work/how-does-it-work.component';
import { PaymentAndDeliveryComponent } from './pages/payment-and-delivery/payment-and-delivery.component';
import { InstructionsComponent } from './pages/instructions/instructions.component';
import { ContactsComponent } from './pages/contacts/contacts.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { AdminCategoryComponent } from './admin-panel/admin-category/admin-category.component';
import { AdminProductsComponent } from './admin-panel/admin-products/admin-products.component';
import { AdminAddProductComponent } from './admin-panel/admin-products/admin-add-product/admin-add-product.component';
import { AdminEditProductComponent } from './admin-panel/admin-products/admin-edit-product/admin-edit-product.component';
import { SingInComponent } from './sing-in/sing-in.component';
import { FullKitsRepeatersComponent } from './pages/shop/full-kits-repeaters/full-kits-repeaters.component';
import { AntennasComponent } from './pages/shop/antennas/antennas.component';
import { ProductDetailsComponent } from './pages/shop/product-details/product-details.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { BasketComponent } from './pages/basket/basket.component';
import { AdminOrdersComponent } from './admin-panel/admin-orders/admin-orders.component';
import { AdminUsersComponent } from './admin-panel/admin-users/admin-users.component';
import { SingInHeaderButtonComponent } from './sing-in/sing-in-header-button/sing-in-header-button.component';
import { RegisterNewUserComponent } from './sing-in/register-new-user/register-new-user.component';
import { PasswordRecoveryComponent } from './sing-in/password-recovery/password-recovery.component';




@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    ShopComponent,
    HowDoesItWorkComponent,
    PaymentAndDeliveryComponent,
    InstructionsComponent,
    ContactsComponent,
    AdminPanelComponent,
    AdminCategoryComponent,
    AdminProductsComponent,
    AdminAddProductComponent,
    AdminEditProductComponent,
    SingInComponent,
    FullKitsRepeatersComponent,
    AntennasComponent,
    ProductDetailsComponent,
    HeaderComponent,
    FooterComponent,
    PageNotFoundComponent,
    BasketComponent,
    AdminOrdersComponent,
    AdminUsersComponent,
    SingInHeaderButtonComponent,
    RegisterNewUserComponent,
    PasswordRecoveryComponent

  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    NgbModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    NgbPaginationModule,
    NgbAlertModule,
    FontAwesomeModule,
    NgxTrimDirectiveModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
