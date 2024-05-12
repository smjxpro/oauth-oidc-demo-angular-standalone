

import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { LoginResponse, OidcSecurityService } from 'angular-auth-oidc-client';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {


  title = 'oidc-demo';

  isLoggedIn = false;

  username: string | null = null;

  clients: any[] = [];

  constructor(private authService: OidcSecurityService, private http: HttpClient) {
  }
  ngOnInit(): void {
    this.authService.checkAuth().subscribe((loginResponse: LoginResponse) => {
      console.log(loginResponse);
    })

    this.authService.isAuthenticated$.subscribe(authResult => {
      console.log("Is Authenticated", authResult);
      this.isLoggedIn = authResult.isAuthenticated;
    })

    this.authService.userData$.subscribe(userData => {
      console.log("User Data", userData);
      this.username = userData?.userData.preferred_username;
    })

    this.getClients();

  }

  login() {
    this.authService.authorize();
  }

  logout() {
    this.authService.logoff();
  }

  getClients() {
    this.http.get<any>('https://api.prohelika.com/api/client').subscribe(data => {
      console.log('data', data);
      this.clients = data;
    });
  }

  createClient() {
    var body = {
      "name": "string",
      "logo": "string",
      "url": "string"
    };

    this.http.post<any>('https://api.prohelika.com/api/client', body).subscribe(data => {
      console.log('data', data);
      this.getClients();
    });
  }

  deleteClient(id: string) {
    if (confirm('Are you sure you want to delete this client?')) {
      this.http.delete<any>('https://api.prohelika.com/api/client/' + id).subscribe(data => {
        console.log('data', data);
        this.getClients();
      });
    }
  }
}
