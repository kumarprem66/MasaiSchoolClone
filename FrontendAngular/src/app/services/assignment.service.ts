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
  baseUrl = "http://127.0.0.1:8088/assignment/"

  createAssignment(userId:number,data:any,courseId:number,lectureId:number,token:string):Observable<any>{

    const headers = new HttpHeaders({
      "Content-Type":"Application/json",
      'Authorization': `Bearer ${token}`,
    })


   return  this.http.post(`${this.baseUrl}create/${userId}/${courseId}/${lectureId}`,JSON.stringify(data),{headers:headers})

  }

  getAllAssignment(userId:number,courseId:number,token:string){

    const headers = new HttpHeaders( {
      
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json', // Add other headers as needed
    });
    return this.http.get(`${this.baseUrl}fetch-all/${userId}/${courseId}`,{headers : headers})
  }

  getAllAssignmentCAL(userId:number,courseId:number,lectureId:number,token:string){

    const headers = new HttpHeaders( {
      
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json', // Add other headers as needed
    });
    return this.http.get(`${this.baseUrl}fetch-all/${userId}/${courseId}/${lectureId}`,{headers : headers})
  }

  getAssignment(userId:number,assignId:number,token:string){

    const headers = new HttpHeaders( {
      
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json', // Add other headers as needed
    });
    return this.http.get(`${this.baseUrl}fetch/${userId}/${assignId}`,{headers : headers})
  }
}
