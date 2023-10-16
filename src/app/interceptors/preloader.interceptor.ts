import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, delay, finalize } from 'rxjs';
import { LoadingService } from '../services/loading.service';

@Injectable()
export class PreloaderInterceptor implements HttpInterceptor {
  constructor(private _LoadingService: LoadingService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    this._LoadingService.loading.next(true);
    return next.handle(request).pipe(
      delay(1000),
      finalize(() => {
        this._LoadingService.loading.next(false);
      })
    );
  }
}
