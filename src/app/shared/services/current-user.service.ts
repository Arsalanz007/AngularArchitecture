import { Injectable } from '@angular/core';
import { AuthUserResponseDTO } from '../classes/auth-response-dto';

@Injectable({
  providedIn: 'root'
})
export class CurrentUserService {
  authUsersInfo: AuthUserResponseDTO;
  constructor() { 
    this.authUsersInfo = new AuthUserResponseDTO();
  }
  set setAuthUserInfo(value: AuthUserResponseDTO) {
    this.authUsersInfo = value;
  }
  get getAuthUserInfo(): AuthUserResponseDTO {
    return this.authUsersInfo;
  }
  setLogin(value: AuthUserResponseDTO) {
    this.setAuthUserInfo = value;
    localStorage.setItem('_token', value.token);
  }
  clearLogin() {
    localStorage.clear();
    window.location.href = '/login'
  }
  getAuthorizationToken(){
    return localStorage.getItem('_token') ? 'Bearer '+ localStorage.getItem('_token'):'';
  }
  isUserLogeIn(){
    return localStorage.getItem('_token') ? true :false;
  }
}
