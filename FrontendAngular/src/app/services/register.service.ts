import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

   baseUrl = "http://127.0.0.1:8000/sparleom/student"
   registerUrl = "http://127.0.0.1:8000/sparleom/register/"
   loginUrl = "http://127.0.0.1:8000/sparleom/login/"
   getUserUrl = "http://127.0.0.1:8000/sparleom/user-details/"
  constructor(private http:HttpClient) { }

  userRegister(data:any):Observable<any>{

    const headers = new HttpHeaders({
      "Content-Type":"Application/json"
    })
    return this.http.post(this.registerUrl,JSON.stringify(data),{headers})
  }

  allUsers():Observable<any[]>{
    return this.http.get<any[]>(this.baseUrl)
  }

  login(username:string,password:string):Observable<any>{

    const body = {username:username,password:password}
    return this.http.post(this.loginUrl,body)
  }

  getUserDetails(yourTokenVariable:string){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Token ${yourTokenVariable}`
      })
    };
    return this.http.get(this.getUserUrl,httpOptions)
  }


}
