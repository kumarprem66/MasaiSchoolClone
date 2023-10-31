import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  private baseUrl = 'http://localhost:8000/sparleom/courses/';
  constructor(private http: HttpClient) { }

  createCourse(courseData:any):Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type':'application/json'
    });

    return this.http.post(this.baseUrl+'create/',JSON.stringify(courseData),{headers});
  }

  getcourses(){

    

    return this.http.get<any[]>(this.baseUrl)
  }

  getCourseById(id:number){

    return this.http.get(`${this.baseUrl}${id}`)
  }

  getInstructorCourses(ins_id:number){
    return this.http.get(`${this.baseUrl}get_instructor_course/${ins_id}`)
  }

  deleteCourse(id:number){
    return this.http.delete(`${this.baseUrl}${id}/delete`)
  }


  updateCourseById(id:number,data:any){

   
    const headers = new HttpHeaders({
      "Content-Type":"Application/json"
    })
    return this.http.put(`${this.baseUrl}${id}/update`,JSON.stringify(data),{headers})
  }


  getCategoriesCourses(cat_id:number){

    return this.http.get<any[]>(`${this.baseUrl}get_category_course/${cat_id}`)
  }
}

