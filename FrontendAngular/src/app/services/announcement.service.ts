import { HttpClient ,HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnnouncementService {

  private baseUrl = 'http://127.0.0.1:8088/announce/';
  constructor(private http:HttpClient) { }


  createAnnounce(data:any,departId:number,courseId:number):Observable<any>{

    const headers = new HttpHeaders({
      "Content-Type":"application/json"
    })
    return this.http.post(this.baseUrl+'create/'+departId+"/"+courseId,JSON.stringify(data),{headers})
  }

  getAnnounces(){
    return this.http.get<any[]>(this.baseUrl+"getAnnounce-list")
  }

  deleteAnnounce(id:number){
    return this.http.delete(`${this.baseUrl}delete-announce/${id}`)
  }

}
