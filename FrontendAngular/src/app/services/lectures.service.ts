import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LecturesService {

  baseUrl = "http://127.0.0.1:8088/lecture/"
  constructor(private http:HttpClient) { }

  createLecture(data:any,course_id:number,instructor_id:number,token:string):Observable<any>{

    const headers = new HttpHeaders( {
      
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json', // Add other headers as needed
    });

    return this.http.post(this.baseUrl+'create/'+course_id+"/"+instructor_id,JSON.stringify(data),{headers})
  }

  getAllLectures(token:string):Observable<any[]>{
    const headers = new HttpHeaders( {
      
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json', // Add other headers as needed
    });
    return this.http.get<any[]>(this.baseUrl+"fetch-all",{headers:headers})
  }

  getLectureOfCourse(courseId:number,token:string){

    const headers = new HttpHeaders( {
      
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json', // Add other headers as needed
    });
    return this.http.get(`${this.baseUrl}lecture-of-course/${courseId}`,{headers:headers})
    
  }

  updateLecture(lectureId:number,data:any,token:string){
    const headers = new HttpHeaders( {
      
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json', // Add other headers as needed
    });
    return this.http.put(`${this.baseUrl}update/${lectureId}`,JSON.stringify(data),{headers})
  }

  deleteLecture(lectureId:number,token:string){

    const headers = new HttpHeaders( {
      
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json', // Add other headers as needed
    });
    return this.http.delete(`${this.baseUrl}delete/${lectureId}`,{headers:headers})
  }

  getLectureById(id:number,token:string){
    const headers = new HttpHeaders( {
      
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json', // Add other headers as needed
    });
    const url = `${this.baseUrl}fetch/${id}`
    return this.http.get(url,{headers:headers})
  }

  getCourseByLecureId(lec_id:number,token:string){
    const headers = new HttpHeaders({

      "Content-Type" : "application/json",
      "Authorization" : `Bearer ${token}`
    })
    const url = `${this.baseUrl}course-of-lecture/${lec_id}`
    return this.http.get(url,{headers:headers})
  }
  getInstructorLectures(instrcutorId:number,courseId:number,token:string){

    const headers = new HttpHeaders({

      "Content-Type" : "application/json",
      "Authorization" : `Bearer ${token}`
    })
    return this.http.get(`${this.baseUrl}lecture-of-course-instructor/${instrcutorId}/${courseId}`,{headers : headers})
  }

  getInstructorLecturesOnly(instrcutorId:number,token:string){
    const headers = new HttpHeaders({

      "Content-Type" : "application/json",
      "Authorization" : `Bearer ${token}`
    })
    return this.http.get(`${this.baseUrl}lecture-of-course-instructor/${instrcutorId}`,{headers : headers})
  }

  getAssignmentLecture(lectureId:number,token:string){
    const headers = new HttpHeaders({

      "Content-Type" : "application/json",
      "Authorization" : `Bearer ${token}`
    })
    return this.http.get(`${this.baseUrl}assignment-of-lecture/${lectureId}`,{headers : headers})
  }



getInstructorByLecture(lectureId:number,token:string){
  // instructor-of-lecture

  const headers = new HttpHeaders({

    "Content-Type" : "application/json",
    "Authorization" : `Bearer ${token}`
  })
  return this.http.get(`${this.baseUrl}instructor-of-lecture/${lectureId}`,{headers : headers})

}
}
