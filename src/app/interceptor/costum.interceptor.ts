import { Injectable } from '@angular/core';
import { switchMap, take } from 'rxjs/operators';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectAccessToken } from '../NGRX/auth.selectors';

@Injectable()
export class CustomInterceptor implements HttpInterceptor {

  constructor(private store: Store) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return this.store.select(selectAccessToken).pipe(
      take(1),
      switchMap((accessToken) => {
        if (accessToken) {
          request = request.clone({
            setHeaders: {
              Authorization: `Bearer ${accessToken}`
            }
          });
        }
        return next.handle(request);
      })
    );
  }
}
