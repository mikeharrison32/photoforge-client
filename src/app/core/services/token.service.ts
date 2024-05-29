import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs';
import { environments } from 'environments';
@Injectable({
  providedIn: 'root',
})
export class TokenService {
  constructor(private http: HttpClient) {}
  private access_token = localStorage.getItem('access_token');

  public getAccessToken() {
    return this.access_token;
  }
  public refereshToken() {
    const refresh_token = localStorage.getItem('refresh_token');
    const body = {
      refresh_token,
    };
    this.http.post<any>(`${environments.apiUrl}/refresh`, body).pipe(
      tap((response: any) => {
        localStorage.setItem('access_token', response.access_token);
        localStorage.setItem('refresh_token', response.refresh_token);
      })
    );
    return this.access_token;
  }
}
