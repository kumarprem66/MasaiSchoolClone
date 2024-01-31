import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LecturesService {

  baseUrl = "http://127.0.0.1:8088/lecture/"
  constructor(private http:HttpClient) { }

  createLecture(data:any,course_id:number,instructor_id:number):Observable<any>{

    const headers = new HttpHeaders({
      'Content-Type':"Application/json"
    })

    return this.http.post(this.baseUrl+'create/'+course_id+"/"+instructor_id,JSON.stringify(data),{headers})
  }

  getAllLectures():Observable<any[]>{
    return this.http.get<any[]>(this.baseUrl+"fetch-all")
  }

  getLectureOfCourse(courseId:number,token:string){

    const headers = new HttpHeaders( {
      
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json', // Add other headers as needed
    });
    return this.http.get(`${this.baseUrl}lecture-of-course/${courseId}`,{headers:headers,observe:'response'})
    
  }

  updateLecture(lectureId:number,data:any){
    const headers = new HttpHeaders({
      'Content-Type':"Application/json"
    })
    return this.http.put(`${this.baseUrl}update/${lectureId}`,JSON.stringify(data),{headers})
  }

  deleteLecture(lectureId:number){
    return this.http.delete(`${this.baseUrl}delete/${lectureId}`)
  }

  getLectureById(id:number){
    const url = `${this.baseUrl}fetch/${id}`
    return this.http.get(url)
  }

  getCourseByLecureId(lec_id:number){
    const url = `${this.baseUrl}course-of-lecture/${lec_id}`
    return this.http.get(url)
  }
  getInstructorLectures(instrcutorId:number,courseId:number){
    return this.http.get(`${this.baseUrl}lecture-of-course-instructor/${instrcutorId}/${courseId}`)
  }

  getInstructorLecturesOnly(instrcutorId:number){
    return this.http.get(`${this.baseUrl}lecture-of-course-instructor/${instrcutorId}`)
  }

}
