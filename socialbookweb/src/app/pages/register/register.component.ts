import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm = {
    username: '',
    email: '',
    password: '',
    profile: {
      bio: '',
      dob: '',
    },
  };

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  onSubmit() {
    let data = {
      username: this.registerForm.username,
      email: this.registerForm.email,
      password: this.registerForm.password,
      profile: {
        bio: this.registerForm.profile.bio ?? undefined,
        dob:
          this.registerForm.profile.dob == ''
            ? undefined
            : this.registerForm.profile.dob,
      },
    };

    this.authService.register(data).subscribe({
      next: () => {
        this.router.navigate(['/login']);
      },
      error: (error) => console.log(error),
    });
  }
}
