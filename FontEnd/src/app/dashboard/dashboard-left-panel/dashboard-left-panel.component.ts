import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { HttpClient, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-dashboard-left-panel',
  templateUrl: './dashboard-left-panel.component.html',
  styleUrls: ['./dashboard-left-panel.component.css']
})
export class DashboardLeftPanelComponent implements OnInit {
  src : string = '';
  fName : string = '';
  lName : string = '';

  constructor(private userService : UserService, private router: Router, private http: HttpClient) {}

  logout() {
    // remove user from local storage to log user out
    console.log("logout");
    var loggedOut = this.http.post('https://localhost:7211/UserManagement/LogoutUser', this.userService.userValue.userID);
    localStorage.removeItem('user');
    this.userService.user.next(null);
    this.router.navigate(['/authentication']);
    return loggedOut;
  }
  ngOnInit(): void {
    this.userService.user.subscribe(user => {
      if (user) {
        this.src = user.profilePhoto;
        const words: string[] = user.name.split(" ");
        this.fName = words[0];
        this.lName = user.name.substring(this.fName.length).trim();
      }
    });
  }
}
