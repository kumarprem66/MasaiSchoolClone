import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

   baseUrl = "http://127.0.0.1:8088/user/"
  
  
  constructor(private http:HttpClient) { }

  userRegister(data:any):Observable<any>{

    const headers = new HttpHeaders({
      "Content-Type":"Application/json"
    })
    return this.http.post(this.baseUrl+"register",JSON.stringify(data),{headers})
  }

  allUsers():Observable<any[]>{
    return this.http.get<any[]>(this.baseUrl)
  }

  login(username:string,password:string):Observable<any>{


    const authHeader = 'Basic ' + btoa(username + ':' + password);

    const headers = new HttpHeaders({
      'Authorization': authHeader,
      'Content-Type': 'application/json'
    });
    return this.http.get("http://127.0.0.1:8088/auth/signin", { headers: headers, observe: 'response' });
  }

  getUserDetails(email:string,token:string){
 
    const headers =  new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
 
    return this.http.get(this.baseUrl+"get_user/"+email,{headers : headers})
  }

  
  getUserById(uid:number,token:string){
    const headers =  new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    return this.http.get(this.baseUrl+"get_user_id/"+uid,{headers : headers})
  }


}
