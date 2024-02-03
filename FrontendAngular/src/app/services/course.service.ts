import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  private baseUrl = 'http://localhost:8088/course/';
  constructor(private http: HttpClient) { }

  createCourse(departID: number, ins_id: number, categoryId: number,courseData:any,token:string):Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization' : `Bearer ${token}`
    });

    const url = `${this.baseUrl}create/${departID}/${ins_id}/${categoryId}`;
    return this.http.post(url,JSON.stringify(courseData),{headers:headers});
  }

 

  getcourses(){

    

    return this.http.get<any[]>(this.baseUrl+'fetch-all')
  }

  getCourses(department_id:number){
    return this.http.get<any[]>(this.baseUrl+"fetch-all/"+department_id)
  }

  getCourseById(id:number){

    return this.http.get(`${this.baseUrl}fetch/${id}`)
  }

  getCourseInstructor(course_id:number){
    return this.http.get(`${this.baseUrl}get-inst/${course_id}`)
  }

  getCourseDepartment(course_id:number){
    return this.http.get(`${this.baseUrl}get-dept/${course_id}`)
  }

  getCourseCategory(course_id:number){
    return this.http.get(`${this.baseUrl}get-cat/${course_id}`)
  }




  getInstructorCourses(ins_id:number){
    
    return this.http.get(`${this.baseUrl}instructor-course/${ins_id}`)
  }

  deleteCourse(id:number){
    return this.http.delete(`${this.baseUrl}delete/${id}`)
  }


  updateCourseById(id:number,data:any,token:string){

   
    const headers = new HttpHeaders({
      "Content-Type":"Application/json",
      'Authorization':`Bearer ${token}`
    })
    return this.http.put(`${this.baseUrl}update/${id}`,JSON.stringify(data),{headers:headers})
  }


  getCategoriesCourses(cat_id:number){

    return this.http.get<any[]>(`${this.baseUrl}course-by-category/${cat_id}`)
  }

  getCourseByCategoryAndInstructor(cat_id:number,ins_id:number){

    return this.http.get<any[]>(`${this.baseUrl}course-by-category-and-instructor`)
  }
}

