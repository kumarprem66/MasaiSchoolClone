import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  baseUrl = "http://127.0.0.1:8088/admin/"
  constructor(private http:HttpClient) { 

  }


  loginAdmin(email:string,password:string){
    return this.http.get<any[]>(this.baseUrl+"login/"+email+"/"+password);
  }

  getAdminByEmail(email:string){
    return this.http.get<any[]>(this.baseUrl+"getAdmin/"+email);
  }

  createAdmin(data:any):Observable<any>{

    const headers = new HttpHeaders({
      "Content-Type":"application/json"
    })
    return this.http.post(this.baseUrl+"create",JSON.stringify(data),{headers})
  }
}
