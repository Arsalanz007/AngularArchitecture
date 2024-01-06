import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpResponseHandlerService } from './http-response-handler.service';
import { DomainUtills } from 'src/app/utility/domain-utills';
import { Observable } from 'rxjs';
@Injectable()
export class DataService {

  private myDomain: string;
 private domainUtills = new DomainUtills();
 private Headers : HttpHeaders;
 myDocDomain!: string;
 constructor(
   protected httpClient: HttpClient,
   protected responseHandler: HttpResponseHandlerService
 ) {
   this.myDomain = this.domainUtills.GetDomain();
   this.Headers = this.getHeaders();
 }
 getHeaders() {
   let headers = new HttpHeaders();
   headers = headers.append('Access-Control-Allow-Origin', '*');
   headers = headers.append("Access-Control-Allow-Credentials", "true");
   headers = headers.append('Access-Control-Allow-Headers', '*');
   headers = headers.append('Access-Control-Allow-Methods', '*');
   headers = headers.append('Content-Type', 'application/json');
   headers = headers.append('Accept', 'application/json');
   return headers;
 }

 public genericServiceCaller(callType: string, controlerActionName: string, data: any) {
   let apiUrl = this.myDomain + controlerActionName;
   if (callType == "post") {
     return this.httpClient
       .post(apiUrl, JSON.stringify(data, (_, v) => typeof v === 'bigint' ? `${v}n` : v)
         .replace(/"(-?\d+)n"/g, (_, a) => a), { headers: this.Headers })
       .pipe(catchError((err, source) => this.responseHandler.onCatch(err, source)));
   }
   else {
     return this.httpClient
       .get(apiUrl, { headers: this.Headers, params: { ...data } })
       .pipe(catchError((err, source) => this.responseHandler.onCatch(err, source)));
   }
 }
 // public genericServiceUpload(uploadFileModel: UploadFileModel, controlerActionName: string, form: FormData) {

 //   let apiUrl = this.myDocDomain + controlerActionName;
 //   const headers = {
 //     'Access-Control-Allow-Origin': '*',
 //     'folderclient': uploadFileModel.folderName,
 //     'subclientid': uploadFileModel.subClientId,
 //     'clientid': uploadFileModel.clientId,
 //     'servertoken': environment.docServerTokenKey
 //   };
 //   return this.httpClient
 //     .post(apiUrl, form, { headers, reportProgress: true, observe: 'events' })
 //     .pipe(catchError((err, source) => this.responseHandler.onCatch(err, source)));
 // }
 // public genericServiceUploadSingle(uploadFileModel: UploadFileModel, controlerActionName: string, form: FormData) {
 //   let apiUrl = this.myDocDomain + controlerActionName;
 //   const headers = {
 //     'Access-Control-Allow-Origin':'*',
 //     'folderclient': uploadFileModel.folderName,
 //     'subclientid': uploadFileModel.subClientId,
 //     'clientid': uploadFileModel.clientId,
 //     'servertoken': environment.docServerTokenKey
 //   };
 //   return this.httpClient
 //     .post(apiUrl, form, { headers })
 //     .pipe(catchError((err, source) => this.responseHandler.onCatch(err, source)));
 // }
 public genericServiceUploadAfterCheck( controlerActionName: string, form: FormData) {
   let apiUrl = this.myDomain + controlerActionName;
   const headers = {
     "Access-Control-Allow-Credentials": "true",
     'Access-Control-Allow-Headers': '*',
     'Access-Control-Allow-Methods': '*',
     'isfileexist' : "true"
   };
   return this.httpClient
     .post(apiUrl, form, { headers})
     .pipe(catchError((err, source) => this.responseHandler.onCatch(err, source)));
 }

 public genericServiceDownload(controlerActionName: string,data?:any) {
   let apiUrl = this.myDomain + controlerActionName;
   return this.httpClient
     .get(apiUrl, { responseType: 'blob',params:{...data} })
     .pipe(catchError((err, source) => this.responseHandler.onCatch(err, source)))
     .toPromise();
 }

 public genericServiceDownloadByPost(controlerActionName: string, data: any) {
   let apiUrl = this.myDomain + controlerActionName;

   return this.httpClient
     .post(apiUrl, JSON.stringify(data, (_, v) => typeof v === 'bigint' ? `${v}n` : v)
       .replace(/"(-?\d+)n"/g, (_, a) => a), { headers: this.Headers, responseType: 'blob' })
     .pipe(catchError((err, source) => this.responseHandler.onCatch(err, source)));
 }

}
