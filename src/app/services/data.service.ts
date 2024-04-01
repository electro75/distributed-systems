import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private globalRegion = 'India'

  getGlobalRegion() {
    return this.globalRegion;
  }

  updateGlobalRegion(region: string) {
    this.globalRegion = region
  }

  constructor() { }
}
