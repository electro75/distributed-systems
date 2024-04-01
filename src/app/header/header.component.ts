import { ɵBrowserAnimationBuilder } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule, NavigationEnd } from '@angular/router';
import { BsDropdownModule } from "ngx-bootstrap/dropdown"
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, BsDropdownModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  providers: [DataService]
})
export class HeaderComponent implements OnInit {

  public regions = [
    'India',
    'US',
    'Ireland'
  ]

  public selectedRegion = ""

  constructor(private router: Router, private data: DataService) {
    this.router.events.subscribe((ev) => {
      if (ev instanceof NavigationEnd) {
        switch (ev.url) {
          case '/signup':
            this.activeRoute = 'signup'
            break;
          case '/login':
            this.activeRoute = 'login'
            break;
          default:
            return;
        }
      }
    })

    this.selectedRegion = data.getGlobalRegion();
  }

  updateRegion(region: string) {
    this.data.updateGlobalRegion(region)
    this.selectedRegion = region
  }

  public isAuth: boolean = false;
  public activeRoute: string = ''

  ngOnInit() {
    if (this.router.url === '/') {
      this.router.navigate(['login'])
      this.activeRoute = 'login'
    }
  }
}
