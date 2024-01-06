import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { DataService } from './data.service';
import { Router, RouterModule, Routes } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { DomainUtills  } from 'src/app/utility/domain-utills';
import { CurrentUserService } from './current-user.service';
import { AlertMessageService } from './toast/alert-message.service';
import { Message } from './toast/toast-Message.enum';
@Injectable({
  providedIn: 'root'
})
export class HttpResponseHandlerService {

  env = environment;
  constructor(
    private domainUtils: DomainUtills,
    private router: Router,
    protected httpClient: HttpClient,
    private readonly _currentUserService: CurrentUserService,
    private _toaster: AlertMessageService) { }

  /**
    * Global http error handler.
    *
    * @param error
    * @param source
    * @returns {ErrorObservable}
    */
  public onCatch(response: any, source: Observable<any>): Observable<any> {

    switch (response.status) {
      case 400:
        this.handleBadRequest(response);

        break;

      case 401:
        this.handleUnauthorized(response);
        break;

      case 403:
        this.handleForbidden();
        break;

      case 404:
        this.handleNotFound(response);
        break;

      case 500:
        this.handleServerError();
        break;

      default:
        this._toaster.Message("Something went wrong.", Message.error, 2000);
        break;
    }

    return throwError(response);
  }
  /**
   * Shows notification errors when server response status is 401
   *
   * @param error
   */
  private handleBadRequest(responseBody: any): void {
    if (responseBody._body) {
      try {
        const bodyParsed = responseBody.json();
        this.handleErrorMessages(bodyParsed);
      } catch (error) {
        this.handleServerError();
      }
    } else {
      this.handleServerError();
    }
  }
  /**
   * Shows notification errors when server response status is 401 and redirects user to login page
   *
   * @param responseBody
   */
  private handleUnauthorized(responseBody: any): void {
    // Read configuration in order to see if we need to display 401 notification message
    //this.authService.loggedOut();
    this._currentUserService.clearLogin();
  }

  /**
 * Shows notification errors when server response status is 403
 */
  private handleForbidden(): void {
  }
  /**
     * Shows notification errors when server response status is 404
     *
     * @param responseBody
     */
  private handleNotFound(responseBody: any): void {
    // Read configuration in order to see if we need to display 401 notification message
  }
  /**
     * Shows notification errors when server response status is 500
     */
  private handleServerError(): void {

  }
  /**
  * Parses server response and shows notification errors with translated messages
  *
  * @param response
  */
  private handleErrorMessages(response: any): void {
    if (!response) {
      return;
    }
    this._toaster.Message("You are not authorized to view this content.",Message.error,2000);
  }
  /**
* Returns relative url from the absolute path
*
* @param responseBody
* @returns {string}
*/
  private getRelativeUrl(url: string): string {
    return url.toLowerCase().replace(/^(?:\/\/|[^\/]+)*\//, '');
  }

}