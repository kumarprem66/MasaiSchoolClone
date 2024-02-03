import { Component } from '@angular/core';
import { NavigationExtras, Route, Router } from '@angular/router';
import { CommonService } from '../common.service';

@Component({
  selector: 'app-assignment-header',
  templateUrl: './assignment-header.component.html',
  styleUrls: ['./assignment-header.component.css']
})
export class AssignmentHeaderComponent {

  all_assignment :any[] = []
  constructor(private router:Router,private common:CommonService){

  }
  ngOnInit(){

    const  token = localStorage.getItem("masaischoolclone")
    const userId = localStorage.getItem("current_user_id")
    if(token != null && userId != null){

     this.getAllAssignmentOfStudent(parseInt(userId),token)
      
  
    }

  }

  assignmentDetails(anId:number){

    const navigationExtras: NavigationExtras = {
      queryParams: {
        aid: anId,
        
      },
    };
  
    this.router.navigate(['/assignment-detail'],navigationExtras)
  }

  getAllAssignmentOfStudent(userId:number,token:string){

    this.common.getALLAssignmentOfStudent(userId,token).subscribe(response => {
       response.forEach(ele=>{
        this.all_assignment.push(ele)
      });
      console.log(this.all_assignment);
    })

   


  }
}
