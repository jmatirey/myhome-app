//ANGULAR
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//COMPONENTS
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/misc/header/header.component';
import { LoginComponent } from './components/misc/login/login.component';
import { RegisterComponent } from './components/misc/register/register.component';
import { HouseListComponent } from './components/house/listing/house-list/house-list.component';
import { HouseItemComponent } from './components/house/listing/house-item/house-item.component';
import { CreateHouseFormComponent } from './components/house/create/create-house-form/create-house-form.component';
import { CreateHouseWrapperComponent } from './components/house/create/create-house-wrapper/create-house-wrapper.component';
import { HouseDetailComponent } from './components/house/detail/house-detail.component';
import { FindHomeFormComponent } from './components/house/find/find-home-form/find-home-form.component';
import { FindHomeWrapperComponent } from './components/house/find/find-home-wrapper/find-home-wrapper.component';
import { MyHousesItemComponent } from './components/house/my-houses-tab/my-houses-item/my-houses-item.component';
import { MyHousesListComponent } from './components/house/my-houses-tab/my-houses-list/my-houses-list.component';
import { MyBookingsListComponent } from './components/booking/my-bookings-tab/my-bookings-list/my-bookings-list.component';
import { MyBookingsItemComponent } from './components/booking/my-bookings-tab/my-bookings-item/my-bookings-item.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ChatListComponent } from './components/message/chat-list/chat-list.component';
import { ChatItemComponent } from './components/message/chat-item/chat-item.component';

//PIPES
import { FilterByPricePipe } from './shared/pipes/filter-by-price.pipe';
import { ShowMapPipe } from './shared/pipes/show-map.pipe';

//EXTERNAL RESOURCES
import {NgbModule} from '@ng-bootstrap/ng-bootstrap'; // bootstrap nav responsive
import {AgmCoreModule} from '@agm/core'; // google maps
import {CarouselModule} from 'ngx-bootstrap/carousel';// carousel for detail images


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatCheckboxModule } from '@angular/material';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs'
import { MatIconModule } from '@angular/material/icon'
import { MatCardModule } from '@angular/material/card'
import { MatInputModule } from '@angular/material/input'
import { MatDividerModule } from '@angular/material/divider'
import { MatListModule } from '@angular/material/list'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { PageNotFoundComponent } from './components/misc/page-not-found/page-not-found.component';
import { FooterComponent } from './components/misc/footer/footer.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    RegisterComponent,
    HouseListComponent,
    HouseItemComponent,
    CreateHouseFormComponent,
    CreateHouseWrapperComponent,
    HouseDetailComponent,
    FindHomeFormComponent,
    FindHomeWrapperComponent,
    MyHousesItemComponent,
    MyHousesListComponent,
    MyBookingsListComponent,
    MyBookingsItemComponent,
    FilterByPricePipe,
    ShowMapPipe,
    ProfileComponent,
    ChatListComponent,
    ChatItemComponent,
    PageNotFoundComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDeZy_fS4ry7LS6HwGT31iT0WaaJkH-Fgk',
      libraries: ['places']
    }),
    CarouselModule,

    BrowserAnimationsModule,
    MatCheckboxModule,
    MatButtonModule, 
    MatTabsModule,
    MatIconModule,
    MatCardModule,
    MatInputModule,
    MatDividerModule,
    MatListModule,
    MatProgressSpinnerModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
