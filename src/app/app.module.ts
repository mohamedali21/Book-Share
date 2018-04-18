import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {HttpModule} from '@angular/http';

import { AdsService } from './Service/ads.service';
import { AppComponent } from './app.component';


import {RouterModule, Routes} from '@angular/router';
import { HeaderComponent } from './Layout Components/header/header.component';
import { ContentComponent } from './Layout Components/content/content.component';
import { AdsComponent } from './Ads/ads/ads.component';
import {MyAdsComponent} from './my-ads/my-ads.component'
import { AdDetailsComponent } from './ad-details/ad-details.component'
import { RequestService } from './Service/request.service';
import { from } from 'rxjs/observable/from';
import { CreateAdComponent } from './create-ad/create-ad.component';
import { RequestsComponent } from './requests/requests.component';
import { LoginComponent } from './Account/login/login.component';
import { RegisterComponent } from './Account/register/register.component';
import { UserService } from './service/user.service';
import { AuthGuard } from './auth/auth.guard';
import { RoleGuardService as RoleGuard } from './auth/role-guard.service';
import { AuthHeaderComponent } from './Layout Components/auth-header/auth-header.component';
import { UnAuthHeaderComponent } from './Layout Components/un-auth-header/un-auth-header.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { LocationService } from './Service/location.service';
import { CategoryService } from './Service/category.service';
import { User2Service } from './Service/user2.service';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { MyRequestDetailsComponent } from './my-request-details/my-request-details.component';
import { MyRequestsComponent } from './my-requests/my-requests.component';
import { AddbookComponent } from './addbook/addbook.component';

import { ReactiveFormsModule } from '@angular/forms';

import { AgmCoreModule, MapsAPILoader } from '@agm/core';
import { BookaddService } from './Service/bookadd.service';
import { DeletebookComponent } from './deletebook/deletebook.component';
import { EditbookComponent } from './editbook/editbook.component';
import { BarRatingModule } from "ngx-bar-rating";
import { ReviewService } from './Service/review.service';
import { ChatService } from './Service/chat.service';
import { AddCategoryComponent } from './add-category/add-category.component';
import { AddSubCategoryComponent } from './add-sub-category/add-sub-category.component';
import { FooterComponent } from './Layout Components/footer/footer.component';



const websiteRoots:Routes=[
  {path:'ads',component:AdsComponent},
  {path:'MyAds',component:MyAdsComponent , canActivate:[AuthGuard]},
  {path:'Requests/:id',component:RequestsComponent , canActivate:[AuthGuard]},  
  {path:'details/:id', component:AdDetailsComponent , canActivate:[AuthGuard]},
  {path:'Login', component:LoginComponent},
  {path:'Register', component:RegisterComponent},
  {path:'Admin', component:AdminPanelComponent, canActivate:[RoleGuard]},
  {path:'Add-Book', component:AddbookComponent},
  {path:'Editbook/:id', component:EditbookComponent},
  {path:'Deletebook/:id', component:DeletebookComponent},
  {path:'MyRequests',component:MyRequestsComponent , canActivate:[AuthGuard]}, 
  {path:'MyRequests/:id',component:MyRequestDetailsComponent , canActivate:[AuthGuard]},
  {path:'AddCategory', component:AddCategoryComponent, canActivate:[RoleGuard]},
  {path:'addSubCat', component:AddSubCategoryComponent, canActivate:[RoleGuard]},


  {path:'', redirectTo:'/ads', pathMatch:'full'},
];
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ContentComponent,
    AdsComponent,
    AdDetailsComponent,
    MyAdsComponent,
    CreateAdComponent,
    RequestsComponent,
    LoginComponent,
    RegisterComponent,
    AuthHeaderComponent,
    UnAuthHeaderComponent,
    AdminPanelComponent,
    MyRequestDetailsComponent,
    MyRequestsComponent,
    AddbookComponent,
    EditbookComponent,
    DeletebookComponent,
    AddCategoryComponent,
    AddSubCategoryComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NgxPaginationModule,
    RouterModule.forRoot(websiteRoots),
    ReactiveFormsModule,
    BarRatingModule,
    AgmCoreModule.forRoot({apiKey: 'AIzaSyDSaIqdQJYxq7TEt-B0yVf9mbrEWIUXLwI'}),
  ],
  providers: [AdsService,
              RequestService,
              UserService,
              AuthGuard,
              RoleGuard,
              LocationService,
              CategoryService,
              User2Service,
              BookaddService,
              ReviewService,
              ChatService
              ],
  bootstrap: [AppComponent]
})
export class AppModule { }
