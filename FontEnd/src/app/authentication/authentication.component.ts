import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {
  isLoginPage: boolean = true;
  isSignUpPage: boolean = false;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const route = this.activatedRoute.firstChild;
        this.isLoginPage = route?.snapshot?.routeConfig?.path === 'login';
        this.isSignUpPage = route?.snapshot?.routeConfig?.path === 'signup';
      }
    });
  }
}
