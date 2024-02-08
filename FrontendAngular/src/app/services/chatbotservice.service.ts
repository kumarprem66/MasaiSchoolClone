import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatbotserviceService {

   baseUrl = "http://127.0.0.1:8088/bot/chat/"



  constructor(private http: HttpClient) {}

  sendMessage(message: string): Observable<any> {


    const headers = {
      "Content-Type":"application/json"
      // "Authorization":`Bearer ${}`
    }

    return this.http.get<any>(`${this.baseUrl}${message}`,{headers:headers});
  }
}
