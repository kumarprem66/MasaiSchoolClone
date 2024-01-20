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


  updateStudent(id:number,data:any){

    const headers = new HttpHeaders({
      "Content-Type":"Application/json"
    })
    return this.http.put(`${this.baseUrl}${id}/update`,JSON.stringify(data), {headers})
  }

  deleteStudent(id:number){

    return this.http.delete(`${this.baseUrl}${id}/delete`)
  }

  getAllStudent(){
    return this.http.get(this.baseUrl)
  }


  addCourseToStudent(studentId: number, courseId: number): Observable<any> {
    const url = `${this.baseUrl}${studentId}/add-course/`;
    const body = { course_id: courseId };

    return this.http.post(url, body);
  }
  

  getSingleStudent(id:number){
    return this.http.get(`${this.baseUrl}${id}`);
  }
 
}

