import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { VeraApiService } from '../../services/vera-api.service';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-login.html',
  styleUrl: './admin-login.css',
})
export class AdminLoginComponent {
  email = '';
  password = '';
  error: string | null = null;

  constructor(private veraApi: VeraApiService, private router: Router) {}

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
