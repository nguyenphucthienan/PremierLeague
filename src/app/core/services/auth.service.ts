import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthService {

  private readonly AUTH_URL = `${environment.apiUrl}/auth`;

  private jwtHelper = new JwtHelperService();
  private decodedToken: any;
  private decodedTokenSubject = new BehaviorSubject(this.decodedToken);
  decodedToken$ = this.decodedTokenSubject.asObservable();

  constructor(private http: HttpClient) { }

  readTokenFromStorage() {
    const token = localStorage.getItem('token');
    this.changeDecodedToken(token);
  }

  isLoggedIn() {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }

  register(model: any) {
    return this.http.post(`${this.AUTH_URL}/register`, model);
  }

  login(model: any) {
    return this.http.post(`${this.AUTH_URL}/login`, model)
      .pipe(
        map(({ token }: any) => {
          if (token) {
            localStorage.setItem('token', token);
            this.changeDecodedToken(token);
          }
        })
      );
  }

  logout() {
    this.changeDecodedToken(null);
    localStorage.removeItem('token');
  }

  private changeDecodedToken(token) {
    this.decodedToken = this.jwtHelper.decodeToken(token);
    this.decodedTokenSubject.next(this.decodedToken);
  }

}
