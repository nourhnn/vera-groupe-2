import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { VeraApiService } from '../../services/vera-api.service';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './admin-login.html',
  styleUrl: './admin-login.css',
})
export class AdminLoginComponent {
  email = '';
  password = '';
  error: string | null = null;
  showPassword = false;

  constructor(private veraApi: VeraApiService, private router: Router) {}

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    this.error = null;
    console.log('[AdminLogin] submit avec :', this.email, this.password);

    this.veraApi.loginAdmin(this.email, this.password).subscribe({
      next: (res) => {
        console.log('[AdminLogin] succès API', res);
        localStorage.setItem('vera_admin_token', res.token);
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        console.error('[AdminLogin] erreur API', err);
        if (err.status === 400) {
          this.error = 'Merci de remplir les deux champs.';
        } else if (err.status === 401) {
          this.error = 'Identifiants incorrects.';
        } else {
          this.error = 'Erreur serveur, réessaie plus tard.';
        }
      },
    });
  }
}
