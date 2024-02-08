import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubmissionService {

  private baseUrl = "http://127.0.0.1:8088/submission/"

  constructor(private http:HttpClient) { 

  }

  createSubmission(stu_id:number,
    assign_id:number,token:string,data:any):Observable<any>{

    const headers = new HttpHeaders({
      "Content-Type":"Application/json",
      "Authorization":`Bearer ${token}`
    })
    return this.http.post(`${this.baseUrl}create/${stu_id}/${assign_id}`,JSON.stringify(data),{headers})
  }



}
