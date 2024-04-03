import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private globalRegion = 'India'

  private isLoggedIn: boolean = false;

  private endpoints: any = {
    India: "https://in.coffee.pastav.com/api",
    US: "https://us.coffee.pastav.com/api",
    Ireland: "https://ie.coffee.pastav.com/api"
  }

  getGlobalRegion() {
    return this.globalRegion;
  }

  updateGlobalRegion(region: string) {
    this.globalRegion = region
  }

  constructor(private http: HttpClient) {

  }

  setLoginStatus(status: boolean) {
    this.isLoggedIn = status;
  }

  getLoginStatus() {
    return this.isLoggedIn
  }

  logUserIn(userObj: any) {
    return this.http.post(`${this.endpoints[this.globalRegion]}/auth/login`, userObj, {
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    })
  }

  getUserDetails() {
    return this.http.get(`${this.endpoints[this.globalRegion]}/user/profile`, {
      headers: {
        'Authorization': `Bearer ${this.getToken()}`,
        'Access-Control-Allow-Origin': '*'
      }
    })
  }

  signUserUp(userObj: any) {
    let body = {
      ...userObj,
      created_at: new Date().getTime()
    }
    return this.http.post(`${this.endpoints[this.globalRegion]}/auth/signup`, body, {
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    })
  }

  registerUserForLoyalty() {
    return this.http.get(`${this.endpoints[this.globalRegion]}/user/loyalty`, {
      headers: {
        'Authorization': `Bearer ${this.getToken()}`,
        'Access-Control-Allow-Origin': '*'
      }
    })
  }

  storeToken(tokenObj: any) {
    localStorage.setItem('access_token', JSON.stringify(tokenObj))
  }

  getToken() {
    return JSON.parse(localStorage.getItem('access_token') || '{}')
  }

  addUsersToLoyaltyCard(data: any) {
    return this.http.post(`${this.endpoints[this.globalRegion]}/user/addloyalty`, data, {
      headers: {
        'Authorization': `Bearer ${this.getToken()}`,
        'Access-Control-Allow-Origin': '*'
      }
    })
  }
}
