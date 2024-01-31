import { Injectable } from '@angular/core';

import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class TokendataService {

  constructor(private jwtHelper: JwtHelperService) { }

  getUserDetailsFromToken(token: string): any {
    try {
      const decodedToken = this.jwtHelper.decodeToken(token);
      return decodedToken;
    } catch (error) {
      console.error('Error decoding JWT token:', error);
      return null;
    }
  }

  tokenIsValid(token:string):boolean{
    const currentTimeInSeconds = Math.floor(Date.now() / 1000); // Get current time in seconds

    const decoded = this.getUserDetailsFromToken(token);
    if (decoded != null  && currentTimeInSeconds < decoded.exp) {
      return true;
    } else {
     return false;
    }
  }
}







