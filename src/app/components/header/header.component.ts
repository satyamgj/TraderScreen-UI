import { Component, OnInit } from '@angular/core';
import { DarkModeService } from 'angular-dark-mode';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  darkMode$ = this.darkModeService.darkMode$;

  constructor(private darkModeService: DarkModeService) {}

  ngOnInit(): void {
    // this.onToggle()
  }

  onToggle(): void {
    this.darkModeService.toggle();
  }
}
