import { JsonPipe } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InstructorService {

  baseUrl = "http://127.0.0.1:8000/sparleom/instructors/"
  constructor(private http:HttpClient) { }


  getAllInstructor(){
    return this.http.get<any[]>(this.baseUrl)
  }

  createInstructor(data:any):Observable<any>{

    const headers = new HttpHeaders({
      "Content-Type":"Application/json"
    })
    return this.http.post(`${this.baseUrl}create`,JSON.stringify(data),{headers})
  }


  updateInstructor(id:number,data:any){

    const headers = new HttpHeaders({
      "Content-Type":"Application/json"
    })
    return this.http.put(`${this.baseUrl}${id}/update`,JSON.stringify(data), {headers})
  }

  deleteInstructor(id:number){

    return this.http.delete(`${this.baseUrl}${id}/delete`)
  }
  
  getSingleInstrcutor(id:number){
    return this.http.get(`${this.baseUrl}${id}/`)
  }


  instructorLogin(email: string, password: string): Observable<any> {
    const body = { email, password };
    return this.http.post(`${this.baseUrl}login/`, body);
  }
}
