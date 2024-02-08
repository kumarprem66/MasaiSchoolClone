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


  // loginAdmin(username:string,password:string):Observable<any>{
  //   const authHeader = 'Basic ' + btoa(username + ':' + password);

  //   const headers = new HttpHeaders({
  //     'Authorization': authHeader,
  //     'Content-Type': 'application/json'
  //   });
  //   return this.http.get("http://127.0.0.1:8088/auth/signIn", { headers: headers, observe: 'response' });
  // }

  // getAdminByEmail(email:string,token:string){
  //   const headers = new HttpHeaders({
  //     'Authorization': `Bearer ${token}`,
  //     'Content-Type': 'application/json'
  //   });
  //   return this.http.get<any[]>(this.baseUrl+"getAdmin/"+email,{headers:headers});
  // }

  createAdmin(data:any):Observable<any>{

    const headers = new HttpHeaders({
      "Content-Type":"application/json"
    })
    return this.http.post(this.baseUrl+"create",JSON.stringify(data),{headers:headers})
  }
}
