import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserAuthService } from '../services/user-auth.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private userAuthService: UserAuthService,
              public userService: UserService,
              private router: Router ) { }

  
  ngOnInit(): void {
  }

  public logout(){
    this.userAuthService.clear();
    this.router.navigate(['/login'])
  }


  public isLoggedIn(){
    return this.userAuthService.isLoggedIn();
  }
}
