import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  providers: [DataService]
})
export class HomeComponent implements OnInit {

  constructor(private data: DataService) { }

  public user: any = {}

  ngOnInit(): void {
    this.data.getUserDetails().subscribe((res: any) => {
      console.log(res);
      this.user['name'] = `${res.first_name} ${res.last_name}`
      this.user['email'] = `${res.email}`
      this.user['is_loyalty'] = res.loyalty_card_id ? true : false
      this.user['loyalty_card_id'] = res.loyalty_card_id
    })



  }

  getLoyalty() {
    this.data.registerUserForLoyalty().subscribe((res: any) => {
      this.user['loyalty_card_id'] = res.loyalty_card_id
      this.user['is_loyalty'] = true
    })
  }
}
