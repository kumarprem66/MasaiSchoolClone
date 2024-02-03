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


  getAllInstructor(token:string){
    const headers = new HttpHeaders({
      "Content-Type":"Application/json",
      "Authorization" : `Bearer ${token}`
    })
    return this.http.get<any[]>(this.baseUrl+"fetch-all",{headers : headers})
  }

  getInstructorByDepart(depart_id:number){
    return this.http.get<any[]>(this.baseUrl+"fetch-all-byDept/"+depart_id)
  }

  createInstructor(data:any,departId:number,email:string,token:string):Observable<any>{

    const headers = new HttpHeaders({
      "Content-Type":"Application/json",
      "Authorization" : `Bearer ${token}`
    })
    return this.http.post(`${this.baseUrl}create/${departId}/${email}`,JSON.stringify(data),{headers : headers})
  }


  updateInstructor(id:number,data:any,token:string){

    const headers = new HttpHeaders({
      "Content-Type":"Application/json",
      "Authorization" : `Bearer ${token}`
    })
    return this.http.put(`${this.baseUrl}update/${id}`,JSON.stringify(data), {headers :headers})
  }

  deleteInstructor(id:number,token:string){

    const headers = new HttpHeaders({
      "Content-Type":"Application/json",
      "Authorization" : `Bearer ${token}`
    })
    return this.http.delete(`${this.baseUrl}delete/${id}`,{headers:headers})
  }
  
  getSingleInstrcutor(id:number,token:string){
    const headers = new HttpHeaders({
      "Content-Type":"Application/json",
      "Authorization" : `Bearer ${token}`
    })
    return this.http.get(`${this.baseUrl}fetch/${id}`)
  }

  getInstructorByUserId(uid:number,token:string){
    const headers = new HttpHeaders({
      "Content-Type":"application/json",
      "Authorization":`Bearer ${token}`
    })
    return this.http.get(`${this.baseUrl}fetch-by-user/${uid}`,{headers : headers})
  }


  instructorLogin(email: string, password: string): Observable<any> {
    // const body = { email, password };
    return this.http.get(`${this.baseUrl}login/${email}/${password}`);
  }

  getDepartmentByIns(ins_id:number){
    return  this.http.get(`${this.baseUrl}get_dept/${ins_id}`)
  }
}
