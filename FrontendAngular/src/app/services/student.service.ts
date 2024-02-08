import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private http:HttpClient) { }

  baseUrl = "http://127.0.0.1:8088/student/"
  
  createStudent(email:string,data:any):Observable<any>{

    const headers = new HttpHeaders({
      "Content-Type":"Application/json"
    })
    return this.http.post(`${this.baseUrl}create/${email}`,JSON.stringify(data),{headers})
  }

  loginStudent(mob:string){
    const headers = new HttpHeaders({
      "Content-Type":"Application/json"
    })
    return this.http.get(`${this.baseUrl}login/${mob}`,{headers})
  }


  updateStudent(sid:number,uid:number,data:any,token:string){

    const headers = new HttpHeaders({
      "Content-Type":"Application/json",
      "Authorization": `Bearer ${token}`
    })
    return this.http.put(`${this.baseUrl}update/${sid}/${uid}`,JSON.stringify(data), {headers:headers})
  }

  deleteStudent(id:number,token:string){

    const headers = new HttpHeaders( {
      
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json', // Add other headers as needed
    });
    return this.http.delete(`${this.baseUrl}${id}/delete`,{headers:headers})
  }

  getAllStudent(token:string,user_id:number){
    
    const headers = new HttpHeaders( {
      
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json', // Add other headers as needed
    });
    return this.http.get(this.baseUrl+"fetch-all/"+user_id,{headers : headers,observe: 'response'})
  }


  addCourseToStudent(studentId: number, courseId: number,token:string) {
    const headers = new HttpHeaders( {
      
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json', // Add other headers as needed
    });
    

    return this.http.get(`${this.baseUrl}enroll/${studentId}/${courseId}`,{headers:headers});
  }
  

  getSingleStudent(id:number,token:string){
    const headers = new HttpHeaders( {
      
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json', // Add other headers as needed
    });
    return this.http.get(`${this.baseUrl}fetch/${id}`,{headers : headers,observe: 'response'});
  }

  fetchStuentByUserId(id:number ,token:string){
    // fetch-by-user-id
    const headers = new HttpHeaders( {
      
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json', // Add other headers as needed
    });
    return this.http.get(this.baseUrl+"fetch-by-user-id/"+id,{headers : headers,observe: 'response'})
  }

  getCoursesOfStudent(id:number ,token:string){
    // fetch-by-user-id
    const headers = new HttpHeaders( {
      
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json', // Add other headers as needed
    });
    return this.http.get(this.baseUrl+"fetch-all-courses/"+id,{headers : headers,observe: 'response'})
  }
 
}

