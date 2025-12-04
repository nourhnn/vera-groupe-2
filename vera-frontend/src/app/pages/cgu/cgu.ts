import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-cgu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cgu.html',
  styleUrls: ['../privacy-policy/privacy-policy.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CguComponent {}
