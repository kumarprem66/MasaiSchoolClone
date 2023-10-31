import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  baseUrl = "http://127.0.0.1:8000/sparleom/tickets/"

  constructor(private http:HttpClient){

  }


  createTicket(data:any){

    const headers = new HttpHeaders({
      "Content-Type":"Application/json"
    })
    return this.http.post(this.baseUrl,JSON.stringify(data),{headers})
  }

  getTicketsOfInstructor(ins_id:number){

    return this.http.get(`http://127.0.0.1:8000/sparleom/instructor/${ins_id}/tickets/`)
  }

  getTicketsOfStudent(stu_id:number){

    return this.http.get(`http://127.0.0.1:8000/sparleom/student/${stu_id }/tickets/`)
  }
}
