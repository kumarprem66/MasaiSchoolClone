import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AssignmentService {

  constructor(private router:Router,private http:HttpClient) { }

  // http://127.0.0.1:8000/sparleom/assignment/create/
  baseUrl = "http://127.0.0.1:8000/sparleom/assignment/"

  createAssignment(data:any):Observable<any>{

    const headers = new HttpHeaders({
      "Content-Type":"Application/json"
    })


   return  this.http.post(`${this.baseUrl}create/`,JSON.stringify(data),{headers})

  }

  getAllAssignment(){
    return this.http.get(this.baseUrl)
  }
}
