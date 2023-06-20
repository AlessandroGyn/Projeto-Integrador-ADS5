import { Component, OnInit } from '@angular/core';
import { AuthService } from '@app/services/auth.service';

@Component({ selector: 'app-root', templateUrl: 'app.component.html' })
export class AppComponent implements OnInit {
    isAuthenticated = false;

    constructor(private authService: AuthService) { }

    ngOnInit(): void {
      this.authService.isAuthenticatedUser().subscribe((isAuthenticated) => {
        this.isAuthenticated = isAuthenticated;
      });
    }

    logout() {
        this.authService.logout();
        this.isAuthenticated = false;
    }
}
