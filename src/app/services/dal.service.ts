import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DalService {

  //i would like to use it in 2 places
  static tempLocFormValueDalKey = 'locationEditForm_tempLocationEditFormValue'

  constructor() { }

  //when i tried to do return type '[]' it calculated as tuple, and that was disturbing to get dal.get(x)[1]
  //error TS2733: Index '1' is out-of-bounds in tuple of length 0.
  get(key:string):Array<any>{
    return localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)) : [];
  }

  set(key:string, itemsArray:any[]):void{
    localStorage.setItem(key, JSON.stringify(itemsArray));
  }

  del(key:string):void{
    localStorage.removeItem(key)
  }
}
