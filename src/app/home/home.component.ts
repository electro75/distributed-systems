import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  providers: [DataService]
})
export class HomeComponent implements OnInit {

  constructor(private data: DataService, private router: Router) { }

  public user: any = {}

  public family_emails = ['', '', '', '']

  public isLoyaltyManage = false

  ngOnInit(): void {
    this.data.getUserDetails().subscribe((res: any) => {
      this.user['name'] = `${res.first_name} ${res.last_name}`
      this.user['email'] = `${res.email}`
      this.user['is_loyalty'] = res.loyalty_card_id ? true : false
      this.user['loyalty_card_id'] = res.loyalty_card_id

      this.data.getUserCoins({ loyalty_card_id: this.user.loyalty_card_id }).subscribe((response: any) => {
        this.user['coins'] = response.coins
      })
    });


  }

  addUsersToLoyalty() {
    this.data.addUsersToLoyaltyCard({
      loyalty_card_id: this.user["loyalty_card_id"],
      users_to_update: this.family_emails.filter(e => e.length).join(',')
    }).subscribe((res) => {
      console.log(res);
    })
  }

  getLoyaltyUsers() {
    // call api

    this.isLoyaltyManage = true
  }

  getLoyalty() {
    this.data.registerUserForLoyalty().subscribe((res: any) => {
      this.user['loyalty_card_id'] = res.loyalty_card_id
      this.user['is_loyalty'] = true
    })
  }

  redirectToPurchase() {
    this.data.storeUser(this.user);
    this.router.navigate(['purchase'])
  }
}
