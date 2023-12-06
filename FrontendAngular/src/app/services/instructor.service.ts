import { JsonPipe } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InstructorService {

  baseUrl = "http://127.0.0.1:8088/instructor/"
  constructor(private http:HttpClient) { }


  getAllInstructor(){
    return this.http.get<any[]>(this.baseUrl+"fetch-all")
  }

  getInstructorByDepart(depart_id:number){
    return this.http.get<any[]>(this.baseUrl+"fetch-all-byDept/"+depart_id)
  }

  createInstructor(data:any,departId:number):Observable<any>{

    const headers = new HttpHeaders({
      "Content-Type":"Application/json"
    })
    return this.http.post(`${this.baseUrl}create/${departId}`,JSON.stringify(data),{headers})
  }


  updateInstructor(id:number,data:any){

    const headers = new HttpHeaders({
      "Content-Type":"Application/json"
    })
    return this.http.put(`${this.baseUrl}update/${id}`,JSON.stringify(data), {headers})
  }

  deleteInstructor(id:number){

    return this.http.delete(`${this.baseUrl}delete/${id}`)
  }
  
  getSingleInstrcutor(id:number){
    return this.http.get(`${this.baseUrl}fetch/${id}`)
  }


  instructorLogin(email: string, password: string): Observable<any> {
    const body = { email, password };
    return this.http.post(`${this.baseUrl}login`, body);
  }

  getDepartmentByIns(ins_id:number){
    return  this.http.get(`${this.baseUrl}get_dept/${ins_id}`)
  }
}
