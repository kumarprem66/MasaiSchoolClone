import { HttpClient ,HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnnouncementService {

  private baseUrl = 'http://127.0.0.1:8000/sparleom/announces/';
  constructor(private http:HttpClient) { }


  createAnnounce(data:any):Observable<any>{

    const headers = new HttpHeaders({
      "Content-Type":"application/json"
    })
    return this.http.post(this.baseUrl+'create',JSON.stringify(data),{headers})
  }

  getAnnounces(){
    return this.http.get<any[]>(this.baseUrl)
  }

  deleteAnnounce(id:number){
    return this.http.delete(`${this.baseUrl}${id}/delete`)
  }

}
