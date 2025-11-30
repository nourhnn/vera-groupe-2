import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-login.html',
  styleUrl: './admin-login.css',
})
export class AdminLoginComponent {
  email: string = '';
  password: string = '';
  error: string | null = null;

  constructor(private http: HttpClient, private router: Router) {}

  login() {
    this.error = null;

    this.http
      .post('http://localhost:3000/api/admin/login', {
        email: this.email,
        password: this.password,
      })
      .subscribe({
        next: (res: any) => {
          localStorage.setItem('vera_admin_token', res.token);
          this.router.navigate(['/dashboard']);
        },
        error: (err) => {
          console.error(err);
          this.error = err.error?.message || 'Identifiants incorrects.';
        },
      });
  }
}
