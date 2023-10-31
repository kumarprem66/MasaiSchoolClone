import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private baseUrl = 'http://localhost:8000/sparleom/category/';
  constructor(private http: HttpClient) { }

  createCategories(category:any):Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type':'application/json'
    });

    return this.http.post(this.baseUrl,JSON.stringify(category),{headers});
  }

  getCategories(){
    return this.http.get<any[]>(this.baseUrl)
  }

  getCategoriesById(id:number){

    return this.http.get(`${this.baseUrl}${id}/`)
  }

  // getInstructorCourses(ins_id:number){
  //   return this.http.get(`${this.baseUrl}get_instructor_course/${ins_id}`)
  // }



  deleteCategory(id:number){
    return this.http.delete(`${this.baseUrl}${id}/`)
  }


  updateCategoryById(id:number,data:any){

   
    const headers = new HttpHeaders({
      "Content-Type":"Application/json"
    })
    return this.http.put(`${this.baseUrl}${id}/`,JSON.stringify(data),{headers})
  }
}