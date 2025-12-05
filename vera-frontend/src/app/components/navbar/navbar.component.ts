import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';   // ✅ IMPORTANT
import { LangService } from '../../services/lang.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],   // ✅ Nécessaire pour routerLink
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  
  menu = false;

  constructor(public lang: LangService) {}

  toggleMenu() {
    this.menu = !this.menu;
  }

  closeMenu() {
    this.menu = false;
  }

  menuOpen() {
    return this.menu;
  }
}
