import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

 

  baseUrl = "http://127.0.0.1:8000/sparleom/departments/"
  constructor(private http:HttpClient) { }


  getAllDepartment(){
    return this.http.get<any[]>(this.baseUrl)
  }

  createDepartment(data:any):Observable<any>{

    const headers = new HttpHeaders({
      "Content-Type":"application/json"
    })
    return this.http.post(this.baseUrl+"create",JSON.stringify(data),{headers})
  }
}
