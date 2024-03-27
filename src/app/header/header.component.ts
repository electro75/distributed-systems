import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router) {
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
