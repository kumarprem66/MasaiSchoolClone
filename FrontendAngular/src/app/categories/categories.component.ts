import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoryService } from '../services/category.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit{

  categories:any[] = []

  ngOnInit(): void {
    
    this.getAllCategories()
  }

  
  constructor(private cat_service:CategoryService,private router:Router){

  }

  getAllCategories(){

    this.cat_service.getCategories().subscribe((response:any)=>{

      this.categories = response.results;
      console.log(this.categories)
    })

  }

  getCategoryCourses(id:number){
    
    const datatopass = {
      "cat_id":id
    }
    this.router.navigate(['courses-all'],{queryParams:datatopass})

  }
}

