import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LecturesService {

  baseUrl = "http://127.0.0.1:8000/sparleom/lectures/"
  constructor(private http:HttpClient) { }

  createLecture(data:any):Observable<any>{

    const headers = new HttpHeaders({
      'Content-Type':"Application/json"
    })

    return this.http.post(this.baseUrl+'create',JSON.stringify(data),{headers})
  }

  getAllLectures():Observable<any[]>{
    return this.http.get<any[]>(this.baseUrl)
  }

  getLectureOfCourse(id:number){

    return this.http.get(`${this.baseUrl}get_lectures_for_course/${id}/`)
    
  }

  updateLecture(id:number,data:any){
    const headers = new HttpHeaders({
      'Content-Type':"Application/json"
    })
    return this.http.put(`${this.baseUrl}${id}/update`,JSON.stringify(data),{headers})
  }

  deleteLecture(id:number){
    return this.http.delete(`${this.baseUrl}${id}/delete`)
  }

  getLectureById(lectureId:number){
    const url = `${this.baseUrl}${lectureId}`
    return this.http.get(url)
  }

  getInstructorLectures(id:number){
    return this.http.get(`http://127.0.0.1:8000/sparleom/instructor/${id}/lectures/`)
  }
}
