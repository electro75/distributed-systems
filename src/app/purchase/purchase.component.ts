import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-purchase',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './purchase.component.html',
  styleUrl: './purchase.component.scss',
  providers: [DataService]
})
export class PurchaseComponent {
  public user: any = {};
  constructor(private router: Router, private data: DataService) {
    this.user = JSON.parse(this.data.getUser() || '{}');
    console.log(this.user);
  }
  public isCoinRedeem: boolean = false

  backToProfile() {
    this.router.navigate(['dashboard'])
  }

  onPayment() {
    let paymentObj = {
      loyalty_card_id: this.user.loyalty_card_id,
      coins: this.isCoinRedeem ? this.user.coins : 8 * 10,
      price: (8 - (this.isCoinRedeem ? (this.user.coins / 100) : 0)),
      timestamp: new Date().getTime(),
      type: this.isCoinRedeem ? "redeem" : "normal"
    }

    this.data.makePayment(paymentObj).subscribe((res: any) => {
      if (res.message = 'Transaction successful') {
        this.router.navigate(['dashboard'])
      }
    })
  }
}
