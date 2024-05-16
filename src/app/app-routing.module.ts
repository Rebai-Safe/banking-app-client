import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { AuthGuard } from './auth/auth.guard';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import {CustomersComponent} from "./customers/customers.component";
import {AccountsComponent} from "./accounts/accounts.component";
import {AddCustomerComponent} from "./add-customer/add-customer.component";
import {CustomerAccountsComponent} from "./customer-accounts/customer-accounts.component";

const routes: Routes = [
  {path: 'home', component: HomeComponent, canActivate: [AuthGuard], data:{roles:null}},
  {path: 'admin', component: AdminComponent, canActivate: [AuthGuard], data:{roles:['ADMIN']}},
  {path: 'user', component:UserComponent,canActivate: [AuthGuard], data:{roles:['USER']}},
  {path: 'customers', component: CustomersComponent, canActivate: [AuthGuard], data:{roles:null}},
  {path: 'add-customer', component: AddCustomerComponent, canActivate: [AuthGuard], data:{roles:null}},
  {path: 'customer-accounts/:id', component: CustomerAccountsComponent, canActivate: [AuthGuard], data:{roles:null}},
  {path: 'accounts', component: AccountsComponent},
  {path: 'login', component:LoginComponent},
  {path: 'forbidden', component: ForbiddenComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
