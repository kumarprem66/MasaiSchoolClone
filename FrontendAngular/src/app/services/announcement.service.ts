import { HttpClient ,HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnnouncementService {

  private baseUrl = 'http://127.0.0.1:8088/announce/';
  constructor(private http:HttpClient) { }


  createAnnounce(user_id:number,data:any,departId:number,courseId:number,token:string):Observable<any>{

    const headers = new HttpHeaders( {
      
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json', // Add other headers as needed
    });
    return this.http.post(`${this.baseUrl}create/${user_id}/${departId}/${courseId}`,JSON.stringify(data),{headers:headers})
  }

  getAnnounces(user_id:number,token:string){
    const headers = new HttpHeaders( {
      
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json', // Add other headers as needed
    });
    return this.http.get<any[]>(this.baseUrl+"getAnnounce-list/"+user_id,{headers : headers})
  }

  // getAnnounce-list-of-course

  getAnnouncesByCourse(user_id:number,courseId:number,token:string){
    const headers = new HttpHeaders( {
      
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json', // Add other headers as needed
    });
    return this.http.get<any[]>(this.baseUrl+"getAnnounce-list-of-course/"+user_id+"/"+courseId,{headers : headers})
  }
  deleteAnnounce(user_id:number,ann_id:number,token:string){
    const headers = new HttpHeaders( {
      
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json', // Add other headers as needed
    });
    return this.http.delete(`${this.baseUrl}delete-announce/${user_id}/${ann_id}`,{headers:headers})
  }

}
