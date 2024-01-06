import { Injectable } from "@angular/core"
import { ToastrService } from "ngx-toastr"

@Injectable({
  providedIn: 'root'
})

export class AlertMessageService {
  constructor(private _toastrService: ToastrService) { }
  Message(text: string, type: string, timeSpan: number) {
    if (type.toLowerCase() == "success") {
      this._toastrService.success(text, 'Success', {closeButton:true, timeOut: timeSpan })
    }
    else if (type.toLowerCase() == "error") {
      this._toastrService.error(text,  "Error !", {closeButton:true,  timeOut: timeSpan })
    }
    else if (type.toLowerCase() == "warning") {
      this._toastrService.warning(text, 'Warning', {  timeOut: timeSpan })
    }
    else if (type.toLowerCase() == "info") {
      this._toastrService.info(text, 'Info', {  timeOut: timeSpan })
    }
  }
}
