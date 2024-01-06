import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
@Injectable()
export class DomainUtills {
  baseUrl = new BaseUrl();
  GetDomain(): any {
    return this.baseUrl.ApiUrl + "api/";
  }
};
export class BaseUrl {
  private applicationUrl: string;
  private apiUrl: string;
  constructor() {
    this.applicationUrl = window.location.origin + "/";
    this.apiUrl = this.getApiUrl();
  }
  get ApplicationUrl() {
    return this.applicationUrl;
  }
  get ApiUrl() {
    return this.apiUrl;
  }
  getApiUrl() {
    let originalPath = window.location.origin;
    let domain: string = "";
    if (originalPath.includes("localhost")) {
      domain = environment.baseURL;
    } else {
      domain = environment.baseURL;
    }
    return domain;
  }



}
