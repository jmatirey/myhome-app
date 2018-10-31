import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HouseListComponent } from './components/house/listing/house-list/house-list.component';
import { LoginComponent } from './components/misc/login/login.component';
import { RegisterComponent } from './components/misc/register/register.component';
import { IsAuthenticatedGuard } from './shared/guards/is-authenticated.guard';
import { NotGoIfLoggedInGuardGuard } from './shared/guards/not-go-if-logged-in-guard.guard';
import { CreateHouseWrapperComponent } from './components/house/create/create-house-wrapper/create-house-wrapper.component';
import { FindHomeWrapperComponent } from './components/house/find/find-home-wrapper/find-home-wrapper.component';
import { HouseDetailComponent } from './components/house/detail/house-detail.component';
import { MyHousesListComponent } from './components/house/my-houses-tab/my-houses-list/my-houses-list.component';
import { MyBookingsListComponent } from './components/booking/my-bookings-tab/my-bookings-list/my-bookings-list.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ChatListComponent } from './components/message/chat-list/chat-list.component';
import { PageNotFoundComponent } from './components/misc/page-not-found/page-not-found.component';

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', canActivate: [IsAuthenticatedGuard], component: HouseListComponent},
  {path: 'createHouse', canActivate: [IsAuthenticatedGuard], component:CreateHouseWrapperComponent},
  {path: 'login', canActivate: [NotGoIfLoggedInGuardGuard], component: LoginComponent},
  {path: 'register', canActivate: [NotGoIfLoggedInGuardGuard], component: RegisterComponent},
  {path: 'houses/:id', canActivate: [IsAuthenticatedGuard], component: HouseDetailComponent},
  {path: 'myHouses', canActivate: [IsAuthenticatedGuard], component: MyHousesListComponent},
  {path: 'myBookings', canActivate: [IsAuthenticatedGuard], component: MyBookingsListComponent},
  {path: 'chat/:userId/messages', canActivate: [IsAuthenticatedGuard], component: ChatListComponent},
  {path: 'profile', canActivate: [IsAuthenticatedGuard], component: ProfileComponent},
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
