import { Component, OnInit } from '@angular/core';
import { $ } from 'Jquery';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  navbarOpen = false;

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }

  public loggedIn : boolean;
  constructor(private auth: AuthService,
  private router: Router,
  private Token: TokenService) { }

  ngOnInit() {
    this.auth.authStatus.subscribe(value=> this.loggedIn = value);
  }

  logout(event: MouseEvent) {
    event.preventDefault();
    this.Token.remove();
    this.auth.changeAuthStatus(false);
    this.router.navigateByUrl('');
  }
}
