import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserAuthService } from '../services/user-auth.service';
import { UserService } from '../services/user.service';
import {ApiResponse} from "../model/ApiResponse";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    showError: boolean = false;
  constructor(private userService: UserService, private userAuthService: UserAuthService
    ,private router: Router) { }

  ngOnInit(): void {
  }
  
  login(loginForm){
    this.userService.login(loginForm.value).subscribe(
      (response: ApiResponse) => {
        this.userAuthService.setRoles(response.object.user.roles)
        this.userAuthService.setToken(response.object.jwtToken);
        console.log("successfully logged in");
        this.router.navigate(['/home']);

        /* TODO handle roles
        const role = response.object.user.roles[0].role;
        if(role === 'ADMIN'){
         this.router.navigate(['/admin'])
         }
         else {
          this.router.navigate(['/user'])
         }
        */
      },
      (error) => {
        this.showError = true;
        console.log(error)
      }
    )
  }
}
