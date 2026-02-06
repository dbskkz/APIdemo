import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpServiceService {

  constructor(private http:HttpClient) { }
  getApi(url:string){
      return this.http.get(url);
  }

  posApi(url:string,posData:any){
     return this.http.post(url,posData);
  }

  putApi(url:string,putData:any){
    return this.http.put(url,putData)
  }

  delApi(url:string){
    return this.http.delete(url);
  }


}
