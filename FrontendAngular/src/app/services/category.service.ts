import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private baseUrl = 'http://localhost:8088/category/';
  constructor(private http: HttpClient) { }

  createCategories(category:any):Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type':'application/json'
    });

    return this.http.post(this.baseUrl,JSON.stringify(category),{headers});
  }

  getCategories(){
    return this.http.get<any[]>(this.baseUrl+"getAll")
  }

  getCategoriesById(id:number){

    return this.http.get(`${this.baseUrl}get/${id}`)
  }

  // getInstructorCourses(ins_id:number){
  //   return this.http.get(`${this.baseUrl}get_instructor_course/${ins_id}`)
  // }



  deleteCategory(id:number){
    return this.http.delete(`${this.baseUrl}delete/${id}`)
  }


  updateCategoryById(id:number,data:any){

   
    const headers = new HttpHeaders({
      "Content-Type":"Application/json"
    })
    return this.http.put(`${this.baseUrl}update/${id}`,JSON.stringify(data),{headers})
  }
}