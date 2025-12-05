import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { Footer } from '../../components/footer/footer';

@Component({
  selector: 'app-privacy',
  standalone: true,
  imports: [NavbarComponent, Footer],
  templateUrl: './privacy-policy.html',
  styleUrls: ['./privacy-policy.css']
})
export class PrivacyComponent {}
