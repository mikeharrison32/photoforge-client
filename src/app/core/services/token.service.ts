import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class TokenService {
  constructor(private jwtHelper: JwtHelperService, private http: HttpClient) {}
  access_token = localStorage.getItem('access_token');
  public getAccessToken() {
    const refresh_token = localStorage.getItem('refresh_token');
    if (this.jwtHelper.isTokenExpired(this.access_token)) {
      const body = `client_id=photo-forge&grant_type=refresh_token&refresh_token=${refresh_token}`;
      this.http.post<any>('http://localhost:5072/connect/token', body).pipe(
        tap((response: any) => {
          console.log(response);
          localStorage.setItem('id_token', response.id_token);
          localStorage.setItem('access_token', response.access_token);
          localStorage.setItem('refresh_token', response.refresh_token);
        })
      );
    }
    return this.access_token;
  }
}
