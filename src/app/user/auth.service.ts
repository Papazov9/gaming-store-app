import { EventEmitter, Injectable } from '@angular/core';
import { JWTDto, User, UserDTO, UserDetailed } from './Types';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, EMPTY, Observable, of, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private URL = 'http://localhost:8080/api/v1/auth';
  private tokenParam: string | undefined;
  private TOKEN_KEY: string = 'token';
  private isAuthenticated$$ = new BehaviorSubject<boolean>(false);
  private currentUser$$ = new BehaviorSubject<User | null>(null);

  constructor(private http: HttpClient, private router: Router) {
    this.checkToken();
  }

  private checkToken() {
    const token = localStorage.getItem(this.TOKEN_KEY);
    if (token) {
      this.loadUser();
    }
  }

  register(userDTO: UserDTO): Observable<UserDTO> {
    return this.http.post<UserDTO>(`${this.URL}/register`, userDTO);
  }

  login(username: string, password: string): Observable<User> {
    return this.http
      .post<User>(`${this.URL}/login`, { username, password })
      .pipe(
        tap((response) => {
          localStorage.setItem(this.TOKEN_KEY, response.token);
          this.loadUser();
        })
      );
  }

  loadUser(): void {
    this.tokenParam = localStorage.getItem(this.TOKEN_KEY) || '';
    if (this.tokenParam !== '') {
      let jwt: JWTDto = JSON.parse(atob(this.tokenParam.split('.')[1]));
      const user: User = {
        username: jwt.sub,
        token: this.tokenParam,
        roles: jwt.roles.split(', '),
      };
      this.currentUser$$.next(user);
      this.isAuthenticated$$.next(true);
    }
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    this.isAuthenticated$$.next(false);
    this.currentUser$$.next(null);
    this.router.navigate(['']);
  }

  get isAuthenticated$(): Observable<boolean> {
    return this.isAuthenticated$$.asObservable();
  }

  get currentUser$(): Observable<User | null> {
    return this.currentUser$$.asObservable();
  }
}
