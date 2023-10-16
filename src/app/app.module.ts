import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductsComponent } from './components/products/products.component';

import { BrandsComponent } from './components/brands/brands.component';
import { CardComponent } from './components/card/card.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { SingleproductComponent } from './components/singleproduct/singleproduct.component';
import { CuttitlePipe } from './pipes/cuttitle.pipe';
import { ProductDetalisComponent } from './components/product-detalis/product-detalis.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RoundPipe } from './pipes/round.pipe';
import { CreatearrayPipe } from './pipes/createarray.pipe';
import { IshalfPipe } from './pipes/ishalf.pipe';
import { RatingComponent } from './components/rating/rating.component';
import { MainsliderComponent } from './components/mainslider/mainslider.component';
import { CategoriesSlideComponent } from './components/categories-slide/categories-slide.component';
import { SearchNamePipe } from './pipes/search-name.pipe';
import { ToastrModule } from 'ngx-toastr';
import { OrderAddressComponent } from './components/order-address/order-address.component';
import { HeaderInterceptor } from './interceptors/header.interceptor';
import { PreloadingComponent } from './components/preloading/preloading.component';
import { PreloaderInterceptor } from './interceptors/preloader.interceptor';
import { HearticonComponent } from './components/hearticon/hearticon.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { MaxlengthPipe } from './pipes/maxlength.pipe';
import { AllordersComponent } from './components/allorders/allorders.component';
// import { NgHttpLoaderModule } from 'ng-http-loader';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    AboutComponent,
    RegisterComponent,
    LoginComponent,
    CardComponent,
    NotfoundComponent,
    ProductDetalisComponent,
    OrderAddressComponent,
    PreloadingComponent,
    MaxlengthPipe,
  ],
  imports: [
    NgxPaginationModule,
    CarouselModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    CuttitlePipe,
    RatingComponent,
    RoundPipe,
    CreatearrayPipe,
    IshalfPipe,
    SearchNamePipe,
    MainsliderComponent,
    SingleproductComponent,
    HearticonComponent,
    CategoriesSlideComponent,
    ProductsComponent,
    BrandsComponent,
    AllordersComponent,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HeaderInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: PreloaderInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
