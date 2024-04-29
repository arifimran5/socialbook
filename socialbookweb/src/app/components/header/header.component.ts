import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  isLoggedIn = new Observable<boolean>((subscriber) => {
    this.authService.isAuthenticated$.subscribe((res) => {
      subscriber.next(res);
    });
  });

  userData: any = null;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.userData$.subscribe((res) => {
      this.userData = res;
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
