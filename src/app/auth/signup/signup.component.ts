import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DataService } from '../../services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
  providers: [DataService]
})
export class SignupComponent {

  constructor(private __data: DataService, private router: Router) { }

  public userSignupObj = {
    first_name: '',
    last_name: '',
    email: '',
    password: ''
  }

  signupUser() {
    this.__data.signUserUp(this.userSignupObj).subscribe((res: any) => {
      this.__data.storeToken(res.access_token)

      this.router.navigate([' '])
    })
  }

}
