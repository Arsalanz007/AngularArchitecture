import { Injectable } from '@angular/core';
import { CurrentUserService } from '../services/current-user.service';
import { HttpHandler, HttpRequest } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthHttpntercepterService {

  constructor(private readonly _currentUser:CurrentUserService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler) {

    // Get the auth token from the service.
    const authToken = this._currentUser.getAuthorizationToken();

    // Clone the request and replace the original headers with
    // cloned headers, updated with the authorization.
    const authReq = req.clone({
      headers: req.headers.set('Authorization', authToken ? authToken:'')
    });

    // send cloned request with header to the next handler.
    return next.handle(authReq);
  }

}
