import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { DataService } from '../../services/data.service';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  providers: []
})
export class LoginComponent {

  public email: string = '';
  public password: string = '';

  constructor(private router: Router, private data: DataService) { }

  public logUserIn() {
    this.data.logUserIn({ email: this.email, password: this.password }).subscribe(((res: any) => {
      this.data.storeToken(res.access_token)
      this.router.navigate(['dashboard'])
    }))

  }
}
