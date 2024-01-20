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

  login(data:any):Observable<any>{

    const headers = new HttpHeaders({
      "Content-Type":"Application/json"
    })
    // const body = {email:email,password:password}
    return this.http.post(this.baseUrl+"login",JSON.stringify(data),{headers})
  }

  getUserDetails(email:string){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        // 'Authorization': `Token ${yourTokenVariable}`
      })
    };
    return this.http.get(this.baseUrl+"get_user/"+email,httpOptions)
  }


}
