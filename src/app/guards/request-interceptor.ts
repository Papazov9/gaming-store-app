import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({providedIn: "root"})
export class RequestInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>,
     next: HttpHandler): Observable<HttpEvent<any>> {
      let token: string | null = localStorage.getItem('token');

      if (token) {
        req =req.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`
          }
        });
      }
      return next.handle(req);
  }

} 