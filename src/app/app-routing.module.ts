import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { CardComponent } from './components/card/card.component';
import { RegisterComponent } from './components/register/register.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { authuserGuard } from './guards/authuser.guard';
import { ProductDetalisComponent } from './components/product-detalis/product-detalis.component';
import { registerationGuard } from './guards/registeration.guard';
import { OrderAddressComponent } from './components/order-address/order-address.component';

// import { AllorderComponent } from './components/allorder/allorder.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', canActivate: [authuserGuard], component: HomeComponent },
  {
    path: 'products',
    canActivate: [authuserGuard],
    loadComponent: () =>
      import('./components/products/products.component').then(
        (comp) => comp.ProductsComponent
      ),
  },
  {
    path: 'categories',
    canActivate: [authuserGuard],
    loadComponent: () =>
      import('./components/categories/categories.component').then(
        (comp) => comp.CategoriesComponent
      ),
  },
  {
    path: 'details/:id',
    canActivate: [authuserGuard],
    component: ProductDetalisComponent,
  },
  {
    path: 'brands',
    canActivate: [authuserGuard],
    loadComponent: () =>
      import('./components/brands/brands.component').then(
        (comp) => comp.BrandsComponent
      ),
  },
  {
    path: 'allorders',
    canActivate: [authuserGuard],
    loadComponent: () =>
      import('./components/allorders/allorders.component').then(
        (comp) => comp.AllordersComponent
      ),
  },

  { path: 'card', canActivate: [authuserGuard], component: CardComponent },
  {
    path: 'UAddress/:cartId',
    canActivate: [authuserGuard],
    component: OrderAddressComponent,
  },

  {
    path: 'login',
    canActivate: [registerationGuard],
    component: LoginComponent,
  },
  {
    path: 'register',
    canActivate: [registerationGuard],
    component: RegisterComponent,
  },
  {
    path: 'settings',
    loadChildren: () =>
      import('./changepassword/changepassword.module').then(
        (m) => m.ChangepasswordModule
      ),
  },
  {
    path: 'wishlist',
    loadComponent: () =>
      import('./components/wishlist/wishlist.component').then((comp) => {
        return comp.WishlistComponent;
      }),
  },
  { path: '**', component: NotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
